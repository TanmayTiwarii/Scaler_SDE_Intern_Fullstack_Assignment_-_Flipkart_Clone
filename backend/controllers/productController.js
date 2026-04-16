const supabase = require('../config/supabase');

// Map URL slugs to actual database category names
const slugToCategoryName = {
  'fashion': 'Fashion',
  'mobiles': 'Mobiles',
  'beauty': 'Beauty',
  'electronics': 'Electronics',
  'home-kitchen': 'Home',
  'appliances': 'Appliances',
  'toys': 'Toys',
  'food-health': 'Food & Health',
  'auto-accessories': 'Auto Accessories',
  '2-wheelers': '2 Wheelers',
  'sports': 'Sports',
  'books': 'Books',
  'furniture': 'Furniture',
  'laptops': 'Laptops'
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images (image_url, is_primary),
        categories (name)
      `);

    if (category) {
      // Convert slug to actual category name
      const categoryName = slugToCategoryName[category.toLowerCase()] || category;

      // Find the category ID by its real name
      const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .ilike('name', categoryName)
        .single();
      
      if (catData) {
        query = query.eq('category_id', catData.id);
      } else {
        return res.json({ products: [] });
      }
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Format data to flatten image_url and category name
    const products = data.map(p => ({
      ...p,
      originalPrice: p.original_price,
      inStock: p.in_stock,
      image: p.product_images.find(img => img.is_primary)?.image_url || p.product_images[0]?.image_url,
      category: p.categories?.name
    }));

    res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (image_url, is_primary),
        categories (name)
      `)
      .eq('id', req.params.id)
      .single();

    if (!product || error) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const formattedProduct = {
      ...product,
      originalPrice: product.original_price,
      inStock: product.in_stock,
      images: product.product_images.map(img => img.image_url),
      image: product.product_images.find(img => img.is_primary)?.image_url || product.product_images[0]?.image_url,
      category: product.categories?.name
    };

    res.json({ product: formattedProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
