const products = [
  // --- Mobiles ---
  {
    id: 1,
    title: "Apple iPhone 15 (Blue, 128 GB)",
    description: "Features a durable color-infused glass and aluminum design, Dynamic Island, and a 48MP Main camera.",
    price: 69999,
    originalPrice: 79900,
    rating: 4.6,
    category: "Mobiles",
    image: "https://placehold.co/400x400/f5f5f5/212121/png?text=iPhone+15&font=roboto",
    images: ["https://placehold.co/600x600/f5f5f5/212121/png?text=iPhone+15+Main", "https://placehold.co/600x600/f5f5f5/212121/png?text=iPhone+15+Side"],
    inStock: true
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra (Titanium Gray, 256 GB)",
    description: "Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 17.25cm flat display.",
    price: 129990,
    originalPrice: 134999,
    rating: 4.8,
    category: "Mobiles",
    image: "https://placehold.co/400x400/f5f5f5/212121/png?text=S24+Ultra&font=roboto",
    images: ["https://placehold.co/600x600/f5f5f5/212121/png?text=S24+Ultra+Main"],
    inStock: true
  },
  {
    id: 3,
    title: "Google Pixel 8 (Rose, 128 GB)",
    description: "Pixel 8 is the helpful phone engineered by Google; with a sophisticated design and advanced camera features.",
    price: 75999,
    originalPrice: 79999,
    rating: 4.5,
    category: "Mobiles",
    image: "https://placehold.co/400x400/f5f5f5/212121/png?text=Pixel+8&font=roboto",
    images: ["https://placehold.co/600x600/f5f5f5/212121/png?text=Pixel+8+Main"],
    inStock: true
  },

  // --- Fashion ---
  {
    id: 4,
    title: "Puma Men's RS-X Reinvention Sneaker",
    description: "The RS-X is back. This future-retro silhouette made waves when it dropped in 2018.",
    price: 4999,
    originalPrice: 8999,
    rating: 4.4,
    category: "Fashion",
    image: "https://placehold.co/400x400/f3f3f3/333333/png?text=Puma+RS-X",
    images: ["https://placehold.co/600x600/f3f3f3/333333/png?text=Puma+RS-X+View+1"],
    inStock: true
  },
  {
    id: 5,
    title: "Levi's Men's 511 Slim Fit Jeans",
    description: "A modern slim with room to move, the 511 Slim Fit Jeans are a classic since right now.",
    price: 2499,
    originalPrice: 4599,
    rating: 4.3,
    category: "Fashion",
    image: "https://placehold.co/400x400/f3f3f3/333333/png?text=Levis+511",
    images: ["https://placehold.co/600x600/f3f3f3/333333/png?text=Levis+511+Main"],
    inStock: true
  },

  // --- Electronics ---
  {
    id: 6,
    title: "Sony WH-1000XM5 Noise Canceling Headphones",
    description: "Industry-leading noise cancellation optimized to you; 8 microphones for crystal clear calls.",
    price: 26990,
    originalPrice: 34990,
    rating: 4.7,
    category: "Electronics",
    image: "https://placehold.co/400x400/eeeeee/111111/png?text=Sony+XM5",
    images: ["https://placehold.co/600x600/eeeeee/111111/png?text=Sony+XM5+Main"],
    inStock: true
  },
  {
    id: 7,
    title: "ASUS ROG Zephyrus G14 (2024)",
    description: "AMD Ryzen 9, NVIDIA GeForce RTX 4060, 16GB RAM, 1TB SSD, 14-inch OLED Display.",
    price: 149990,
    originalPrice: 174990,
    rating: 4.9,
    category: "Electronics",
    image: "https://placehold.co/400x400/eeeeee/111111/png?text=ROG+G14",
    images: ["https://placehold.co/600x600/eeeeee/111111/png?text=ROG+G14+Main"],
    inStock: true
  },

  // --- Home ---
  {
    id: 8,
    title: "Sleepyhead Body IQ Orthopedic Memory Foam Mattress",
    description: "Responsive Orthopedic memory foam mattress with triple-layered comfort.",
    price: 12499,
    originalPrice: 18999,
    rating: 4.5,
    category: "Home",
    image: "https://placehold.co/400x400/fdfdfd/222222/png?text=Mattress",
    images: ["https://placehold.co/600x600/fdfdfd/222222/png?text=Mattress+Main"],
    inStock: true
  },
  {
    id: 9,
    title: "Philips Air Fryer XL (6.2L)",
    description: "Great tasting fries with up to 90% less fat! 7 presets and touch screen.",
    price: 8999,
    originalPrice: 12999,
    rating: 4.6,
    category: "Home",
    image: "https://placehold.co/400x400/fdfdfd/222222/png?text=Air+Fryer",
    images: ["https://placehold.co/600x600/fdfdfd/222222/png?text=Air+Fryer+Main"],
    inStock: true
  },

  // --- Appliances ---
  {
    id: 10,
    title: "LG 1.5 Ton 5 Star Split Dual Inverter AC",
    description: "AI Convertible 6-in-1, Anti-Virus Protection, HD Filter with Anti-Virus Protection.",
    price: 45990,
    originalPrice: 75990,
    rating: 4.4,
    category: "Appliances",
    image: "https://placehold.co/400x400/efffef/0a330a/png?text=LG+AC",
    images: ["https://placehold.co/600x600/efffef/0a330a/png?text=LG+AC+Main"],
    inStock: true
  },

  // --- Beauty ---
  {
    id: 11,
    title: "COSRX Advanced Snail 96 Mucin Power Essence",
    description: "Lightweight essence that absorbs into the skin fast, giving skin a natural glow from within.",
    price: 1150,
    originalPrice: 1450,
    rating: 4.8,
    category: "Beauty",
    image: "https://placehold.co/400x400/fff0f5/db7093/png?text=Cosrx+Essence",
    images: ["https://placehold.co/600x600/fff0f5/db7093/png?text=Cosrx+Main"],
    inStock: true
  },

  // --- Toys ---
  {
    id: 12,
    title: "LEGO Technic McLaren Formula 1 Race Car",
    description: "Scale model replica of McLaren's 2022 F1 car including V6 cylinder engine with moving pistons.",
    price: 15499,
    originalPrice: 19999,
    rating: 4.9,
    category: "Toys",
    image: "https://placehold.co/400x400/ffecb3/795548/png?text=LEGO+F1",
    images: ["https://placehold.co/600x600/ffecb3/795548/png?text=LEGO+F1+Main"],
    inStock: true
  },

  // --- Food & Health ---
  {
    id: 13,
    title: "MuscleBlaze Biozyme Performance Whey (2kg)",
    description: "Formulated for Indian bodies to maximize protein absorption and muscle growth.",
    price: 4899,
    originalPrice: 6299,
    rating: 4.5,
    category: "Food & Health",
    image: "https://placehold.co/400x400/e8f5e9/2e7d32/png?text=Whey+Protein",
    images: ["https://placehold.co/600x600/e8f5e9/2e7d32/png?text=Protein+Main"],
    inStock: true
  },

  // --- Auto Accessories ---
  {
    id: 14,
    title: "70mai Dash Cam Pro Plus+ A500S",
    description: "Dual channel front and rear recording, 1944P resolution, ADAS, and GPS built-in.",
    price: 8499,
    originalPrice: 10999,
    rating: 4.7,
    category: "Auto Accessories",
    image: "https://placehold.co/400x400/f5f5f5/212121/png?text=Dash+Cam",
    images: ["https://placehold.co/600x600/f5f5f5/212121/png?text=Dash+Cam+Main"],
    inStock: true
  },

  // --- 2 Wheelers ---
  {
    id: 15,
    title: "Vida V1 Plus Electric Scooter",
    description: "Quick charging, high performance, and advanced safety features for city commute.",
    price: 115000,
    originalPrice: 145000,
    rating: 4.2,
    category: "2 Wheelers",
    image: "https://placehold.co/400x400/f0f8ff/004080/png?text=Electric+Scooter",
    images: ["https://placehold.co/600x600/f0f8ff/004080/png?text=Vida+V1+Main"],
    inStock: true
  },

  // --- Sports ---
  {
    id: 16,
    title: "Yonex Astrox 88D Pro Badminton Racket",
    description: "Lead the attack with increased power and control. Designed for front-court players.",
    price: 14500,
    originalPrice: 18000,
    rating: 4.8,
    category: "Sports",
    image: "https://placehold.co/400x400/fff3e0/e65100/png?text=Yonex+Racket",
    images: ["https://placehold.co/600x600/fff3e0/e65100/png?text=Astrox+88D"],
    inStock: true
  },

  // --- Books ---
  {
    id: 17,
    title: "The Psychology of Money by Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. A must-read for financial wisdom.",
    price: 299,
    originalPrice: 499,
    rating: 4.9,
    category: "Books",
    image: "https://placehold.co/400x400/fafafa/333333/png?text=Psychology+of+Money",
    images: ["https://placehold.co/600x600/fafafa/333333/png?text=Book+Cover"],
    inStock: true
  },

  // --- Furniture ---
  {
    id: 18,
    title: "Green Soul Monster Ultimate Series T High Back Gaming Chair",
    description: "Ergonomic gaming chair with breathable fabric and adjustable neck/lumbar support.",
    price: 16999,
    originalPrice: 24999,
    rating: 4.6,
    category: "Furniture",
    image: "https://placehold.co/400x400/fce4ec/c2185b/png?text=Gaming+Chair",
    images: ["https://placehold.co/600x600/fce4ec/c2185b/png?text=Monster+Chair"],
    inStock: true
  },
  {
    id: 19,
    title: "Wipro Furniture Ergonomic Office Chair",
    description: "Mesh back with synchro tilt and adjustable height for long working hours.",
    price: 8499,
    originalPrice: 12500,
    rating: 4.4,
    category: "Furniture",
    image: "https://placehold.co/400x400/fce4ec/c2185b/png?text=Office+Chair",
    images: ["https://placehold.co/600x600/fce4ec/c2185b/png?text=Office+Chair+Main"],
    inStock: true
  },
  {
    id: 20,
    title: "Boat Storm Call 3 Smartwatch",
    description: "Bluetooth calling, 1.83\" HD display, 700+ active modes.",
    price: 1299,
    originalPrice: 4999,
    rating: 4.1,
    category: "Electronics",
    image: "https://placehold.co/400x400/eeeeee/111111/png?text=Boat+Storm",
    images: ["https://placehold.co/600x600/eeeeee/111111/png?text=Smartwatch+Main"],
    inStock: true
  }
];

module.exports = { products };
