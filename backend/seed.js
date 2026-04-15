require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { products } = require('./data');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding data to Supabase...');

  // 1. Seed Categories
  const categoriesSet = new Set(products.map(p => p.category));
  const categoriesList = Array.from(categoriesSet).map(c => ({ name: c }));
  
  const { data: insertedCategories, error: catError } = await supabase
    .from('categories')
    .upsert(categoriesList, { onConflict: 'name' }) 
    .select();

  if (catError) {
    console.error('Error inserting categories:', catError);
    return;
  }
  console.log('Categories seeded successfully.');

  const categoryMap = {};
  insertedCategories.forEach(cat => {
    categoryMap[cat.name] = cat.id;
  });

  // 2. Seed Products
  for (const product of products) {
    const categoryId = categoryMap[product.category];

    // Check if product exists already (by title)
    const { data: existingProd } = await supabase
      .from('products')
      .select('id')
      .eq('title', product.title)
      .maybeSingle();

    let productId = null;

    if (existingProd) {
      productId = existingProd.id;
      console.log(`Product already exists: ${product.title}`);
    } else {
      const { data: newProd, error: prodErr } = await supabase
        .from('products')
        .insert([{
            title: product.title,
            description: product.description,
            price: product.price,
            original_price: product.originalPrice,
            rating: product.rating,
            category_id: categoryId,
            in_stock: product.inStock
        }])
        .select()
        .single();
      
      if (prodErr) {
        console.error('Error inserting product:', prodErr);
        continue;
      }
      productId = newProd.id;
      console.log(`Inserted product: ${product.title}`);
      
      // 3. Seed Product Images
      let imgUrls = product.images || [];
      if (imgUrls.length === 0 && product.image) {
          imgUrls.push(product.image); // fallback
      }
      
      if (imgUrls.length > 0) {
        const imagesToInsert = imgUrls.map((imgUrl, idx) => ({
          product_id: productId,
          image_url: imgUrl,
          is_primary: idx === 0
        }));
        
        const { error: imgErr } = await supabase
          .from('product_images')
          .insert(imagesToInsert);

        if (imgErr) {
          console.error('Error inserting images for product', product.title, imgErr);
        }
      }
    }
  }

  console.log('Seeding completed!');
}

seed().catch(console.error);
