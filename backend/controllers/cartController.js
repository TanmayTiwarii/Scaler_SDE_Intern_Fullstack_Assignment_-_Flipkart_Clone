const supabase = require('../config/supabase');

exports.getCart = async (req, res) => {
  try {
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (
          id, title, price, original_price, 
          product_images (image_url)
        )
      `)
      .eq('user_id', req.user.id);

    if (error) throw error;

    const formattedCart = cartItems.map(item => ({
      id: item.product_id,
      title: item.products.title,
      price: item.products.price,
      originalPrice: item.products.original_price,
      image: item.products.product_images[0]?.image_url,
      quantity: item.quantity
    }));

    res.json({ cart: formattedCart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  try {
    // Check if item already exists in cart
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('product_id', productId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return res.json(data);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ user_id: req.user.id, product_id: productId, quantity }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', req.user.id)
      .eq('product_id', productId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user.id)
      .eq('product_id', productId);

    if (error) throw error;
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
