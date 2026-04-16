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
  const { items, shippingAddress, total, email } = req.body;

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

    try {
      if (email && process.env.RESEND_API_KEY) {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const itemsHtml = items.map(item => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.title || 'Product'}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
          </tr>
        `).join('');

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #2874f0; margin: 0;">Order Confirmation</h2>
              <p style="color: #666; font-size: 14px;">Thank you for shopping with us!</p>
            </div>
            
            <p>We have successfully received your order. Your Order ID is <strong>${order.id}</strong>.</p>
            
            <h3 style="border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; color: #333; margin-top: 30px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr>
                  <th style="text-align: left; padding: 10px; background-color: #f5faff; border-bottom: 1px solid #ddd; color: #555;">Item</th>
                  <th style="text-align: center; padding: 10px; background-color: #f5faff; border-bottom: 1px solid #ddd; color: #555;">Qty</th>
                  <th style="text-align: right; padding: 10px; background-color: #f5faff; border-bottom: 1px solid #ddd; color: #555;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="text-align: right; padding: 15px 10px; font-weight: bold; color: #333; border-top: 2px solid #ddd;">Total Amount:</td>
                  <td style="text-align: right; padding: 15px 10px; font-weight: bold; color: #388e3c; border-top: 2px solid #ddd; font-size: 16px;">₹${total.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>
            
            <p style="color: #666; font-size: 14px; text-align: center; margin-top: 40px;">
              We will notify you once your order is shipped.
            </p>
          </div>
        `;

        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: email,
          subject: `Order Confirmation - ${order.id}`,
          html: emailHtml
        });
        
        if (error) {
          console.error("Resend delivery error:", error);
        } else {
          console.log("Email sent successfully! ID:", data?.id);
        }
      }
    } catch (emailErr) {
      console.error('Error sending confirmation email:', emailErr);
    }

    res.status(201).json({ order });
  } catch (err) {
    console.error(err.message);
    if (err.code === '23503') { // Foreign key violation
        return res.status(400).json({ message: 'Invalid product in order' });
    }
    res.status(500).send('Server Error');
  }
};
