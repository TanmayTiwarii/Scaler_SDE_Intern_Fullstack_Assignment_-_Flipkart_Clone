const supabase = require('../config/supabase');

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
      query = query.eq('categories.name', category);
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Format data to flatten image_url and category name
    const products = data.map(p => ({
      ...p,
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
