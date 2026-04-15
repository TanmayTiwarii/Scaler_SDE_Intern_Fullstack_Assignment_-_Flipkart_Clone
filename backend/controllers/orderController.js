const supabase = require('../config/supabase');

exports.getOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (title, product_images (image_url))
        )
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Format orders to flatten product details
    const formattedOrders = orders.map(order => ({
      ...order,
      items: order.order_items.map(item => ({
        id: item.product_id,
        title: item.products.title,
        image: item.products.product_images[0]?.image_url,
        quantity: item.quantity,
        price: item.price_at_purchase
      }))
    }));

    res.json({ orders: formattedOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createOrder = async (req, res) => {
  const { items, shippingAddress, total } = req.body;

  try {
    // 1. Create order header
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: req.user.id,
        total_amount: total,
        shipping_address: shippingAddress,
        status: 'Confirmed'
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    res.status(201).json({ order });
  } catch (err) {
    console.error(err.message);
    if (err.code === '23503') { // Foreign key violation
        return res.status(400).json({ message: 'Invalid product in order' });
    }
    res.status(500).send('Server Error');
  }
};
