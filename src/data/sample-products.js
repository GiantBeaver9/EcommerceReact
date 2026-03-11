// Sample product data for each store type
// In production, replace with API calls to your backend

const restaurantProducts = [
  {
    id: 'rest-1',
    name: 'Classic Burger',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
    ],
    colors: [],
    company: 'Burger Barn',
    description:
      'Juicy beef patty with fresh lettuce, tomato, pickles, and our signature sauce on a toasted brioche bun.',
    category: 'burgers',
    featured: true,
    stock: 50,
    stars: 4.5,
    reviews: 127,
    dietary: ['none'],
  },
  {
    id: 'rest-2',
    name: 'Margherita Pizza',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
    images: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    ],
    colors: [],
    company: 'Pizza Palace',
    description:
      'Traditional Italian pizza with San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.',
    category: 'pizza',
    featured: true,
    stock: 30,
    stars: 4.8,
    reviews: 203,
    dietary: ['vegetarian'],
  },
  {
    id: 'rest-3',
    name: 'Caesar Salad',
    price: 999,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
    images: [
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
    ],
    colors: [],
    company: 'Green Garden',
    description:
      'Crisp romaine lettuce, parmesan cheese, croutons, and creamy Caesar dressing. Add grilled chicken for extra protein.',
    category: 'salads',
    featured: false,
    stock: 40,
    stars: 4.2,
    reviews: 89,
    dietary: ['vegetarian'],
  },
  {
    id: 'rest-4',
    name: 'Pad Thai',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
    images: [
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
    ],
    colors: [],
    company: 'Thai Orchid',
    description:
      'Stir-fried rice noodles with shrimp, tofu, bean sprouts, peanuts, and tamarind sauce.',
    category: 'asian',
    featured: true,
    stock: 25,
    stars: 4.6,
    reviews: 156,
    dietary: ['gluten-free'],
  },
  {
    id: 'rest-5',
    name: 'Fish Tacos',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
    images: [
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
    ],
    colors: [],
    company: 'Taco Fiesta',
    description:
      'Beer-battered fish with cabbage slaw, chipotle crema, and pico de gallo on corn tortillas.',
    category: 'mexican',
    featured: false,
    stock: 35,
    stars: 4.4,
    reviews: 112,
    dietary: ['none'],
  },
  {
    id: 'rest-6',
    name: 'Chicken Wings',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500',
    images: [
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500',
    ],
    colors: [],
    company: 'Burger Barn',
    description:
      'Crispy fried chicken wings tossed in your choice of buffalo, BBQ, or garlic parmesan sauce.',
    category: 'appetizers',
    featured: false,
    stock: 60,
    stars: 4.3,
    reviews: 95,
    dietary: ['gluten-free'],
  },
  {
    id: 'rest-7',
    name: 'Sushi Platter',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    images: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500',
    ],
    colors: [],
    company: 'Tokyo Roll',
    description:
      'Assorted sushi platter with 18 pieces including salmon, tuna, shrimp, and California rolls.',
    category: 'asian',
    featured: true,
    stock: 15,
    stars: 4.9,
    reviews: 234,
    dietary: ['gluten-free'],
  },
  {
    id: 'rest-8',
    name: 'Chocolate Lava Cake',
    price: 899,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
    images: [
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
    ],
    colors: [],
    company: 'Sweet Treats',
    description:
      'Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.',
    category: 'desserts',
    featured: false,
    stock: 20,
    stars: 4.7,
    reviews: 178,
    dietary: ['vegetarian'],
  },
]

const embroideryProducts = [
  {
    id: 'emb-1',
    name: 'Personalized Name Hoop',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=500',
    images: [
      'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=500',
    ],
    colors: ['#e8d5b7', '#f5e6cc', '#c9b896'],
    company: 'Stitch & Style',
    description:
      'Beautiful hand-embroidered name hoop, perfect for nurseries, gifts, or home decor. Custom colors and fonts available.',
    category: 'personalized',
    featured: true,
    stock: 10,
    stars: 4.9,
    reviews: 67,
    shipping: true,
  },
  {
    id: 'emb-2',
    name: 'Floral Tote Bag',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
    ],
    colors: ['#ffffff', '#f5e6cc', '#2d5a27'],
    company: 'Stitch & Style',
    description:
      'Canvas tote bag with hand-embroidered wildflower design. Durable and eco-friendly, perfect for everyday use.',
    category: 'accessories',
    featured: true,
    stock: 15,
    stars: 4.7,
    reviews: 43,
    shipping: true,
  },
  {
    id: 'emb-3',
    name: 'Wedding Date Sampler',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=500',
    images: [
      'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=500',
    ],
    colors: ['#e8d5b7', '#d4a574', '#8b6914'],
    company: 'Forever Stitched',
    description:
      'Commemorative wedding sampler with couple names, date, and decorative border. A timeless keepsake.',
    category: 'personalized',
    featured: true,
    stock: 5,
    stars: 5.0,
    reviews: 28,
    shipping: true,
  },
  {
    id: 'emb-4',
    name: 'Embroidered Patch Set',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500',
    images: [
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500',
    ],
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'],
    company: 'Patch Perfect',
    description:
      'Set of 4 hand-embroidered iron-on patches. Fun designs perfect for jackets, bags, and jeans.',
    category: 'patches',
    featured: false,
    stock: 30,
    stars: 4.5,
    reviews: 89,
    shipping: true,
  },
  {
    id: 'emb-5',
    name: 'Botanical Wall Art',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500',
    ],
    colors: ['#2d5a27', '#4a7c3f', '#6b9b37'],
    company: 'Stitch & Style',
    description:
      'Hand-embroidered botanical illustration in a 10-inch wooden hoop. Features detailed leaf and flower work.',
    category: 'home-decor',
    featured: true,
    stock: 8,
    stars: 4.8,
    reviews: 52,
    shipping: true,
  },
  {
    id: 'emb-6',
    name: 'Baby Bib Set',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500',
    ],
    colors: ['#ffb6c1', '#87ceeb', '#98fb98'],
    company: 'Little Stitches',
    description:
      'Set of 3 embroidered baby bibs with cute animal designs. Soft cotton, machine washable.',
    category: 'baby',
    featured: false,
    stock: 20,
    stars: 4.6,
    reviews: 34,
    shipping: true,
  },
  {
    id: 'emb-7',
    name: 'Monogram Handkerchief',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500',
    ],
    colors: ['#ffffff', '#f5f5dc', '#e6e6fa'],
    company: 'Forever Stitched',
    description:
      'Elegant linen handkerchief with hand-embroidered monogram. Perfect gift for weddings and special occasions.',
    category: 'personalized',
    featured: false,
    stock: 25,
    stars: 4.4,
    reviews: 41,
    shipping: true,
  },
  {
    id: 'emb-8',
    name: 'Embroidery Kit - Beginner',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500',
    images: [
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500',
    ],
    colors: ['#ff6b6b', '#4ecdc4', '#f9ca24', '#9b59b6'],
    company: 'Stitch & Style',
    description:
      'Complete beginner embroidery kit with hoop, fabric, threads, needles, and step-by-step instructions for 3 designs.',
    category: 'kits',
    featured: false,
    stock: 40,
    stars: 4.3,
    reviews: 76,
    shipping: true,
  },
]

const productsByStore = {
  restaurant: restaurantProducts,
  embroidery: embroideryProducts,
  general: [...restaurantProducts, ...embroideryProducts],
}

export const getProducts = (storeId) => {
  return productsByStore[storeId] || productsByStore.general
}

export const getProduct = (storeId, productId) => {
  const products = getProducts(storeId)
  return products.find((p) => p.id === productId)
}
