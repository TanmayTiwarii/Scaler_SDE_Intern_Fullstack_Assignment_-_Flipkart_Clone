require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Middleware to inject supabase client into req
app.use((req, res, next) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized. Check your environment variables.' });
  }
  req.supabase = supabase;
  next();
});

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const { search, category } = req.query;

    let categoryId = null;
    if (category) {
      const { data: catData } = await req.supabase
        .from('categories')
        .select('id')
        .ilike('name', category)
        .single();
      
      if (catData) categoryId = catData.id;
      else return res.json({ products: [] });
    }

    let query = req.supabase
      .from('products')
      .select('*, categories(name), product_images(image_url, is_primary)');

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    const formattedProducts = data.map(p => {
      // Find primary image or fallback to first
      const primaryImg = p.product_images.find(img => img.is_primary);
      const mainImage = primaryImg ? primaryImg.image_url : (p.product_images[0]?.image_url || '');

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        price: parseFloat(p.price),
        originalPrice: parseFloat(p.original_price),
        rating: parseFloat(p.rating),
        category: p.categories?.name,
        image: mainImage,
        images: p.product_images.map(img => img.image_url),
        inStock: p.in_stock
      };
    });

    res.json({ products: formattedProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await req.supabase
      .from('products')
      .select('*, categories(name), product_images(image_url, is_primary)')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ message: 'Product not found' });

    const primaryImg = data.product_images.find(img => img.is_primary);
    const mainImage = primaryImg ? primaryImg.image_url : (data.product_images[0]?.image_url || '');

    const formattedProduct = {
      id: data.id,
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      originalPrice: parseFloat(data.original_price),
      rating: parseFloat(data.rating),
      category: data.categories?.name,
      image: mainImage,
      images: data.product_images.map(img => img.image_url),
      inStock: data.in_stock
    };

    res.json({ product: formattedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
    const { items, shippingAddress, total, userId } = req.body;

    // 1. Create order
    const { data: orderData, error: orderError } = await req.supabase
      .from('orders')
      .insert([{
        user_id: userId || null, 
        total_amount: total,
        shipping_address: shippingAddress,
        status: 'Confirmed'
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Create order items
    const orderItems = items.map(item => ({
      order_id: orderData.id,
      product_id: item.id || item.product_id,
      quantity: item.quantity || 1,
      price_at_purchase: item.price
    }));

    const { error: itemsError } = await req.supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    res.status(201).json({ order: orderData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders
app.get('/api/orders', async (req, res) => {
  try {
    const { userId } = req.query; 
    
    let query = req.supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id, quantity, price_at_purchase,
          products ( title, product_images(image_url, is_primary) )
        )
      `)
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    res.json({ orders: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Note: Do not store raw passwords in production. 
    // This is simplified custom auth for demonstration. Use bcrypt or Supabase Auth.
    const { data, error } = await req.supabase
      .from('users')
      .insert([{ name, email, password_hash: password }])
      .select()
      .single();
      
    if (error) {
      if (error.code === '23505') {
         return res.status(400).json({ message: 'User already exists' });
      }
      throw error;
    }
    
    res.json({ token: 'mock-jwt-token-' + data.id, user: { id: data.id, name: data.name, email: data.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await req.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
    if (error || !data || data.password_hash !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ token: 'mock-jwt-token-' + data.id, user: { id: data.id, name: data.name, email: data.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
