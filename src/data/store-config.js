// Store configuration for multi-vendor support
// Change the activeStore to switch between business types

export const storeConfigs = {
  restaurant: {
    id: 'restaurant',
    name: 'Fresh Bites',
    tagline: 'Delicious meals delivered to your door',
    type: 'restaurant',
    description:
      'We partner with the best local restaurants to bring fresh, delicious food straight to your table. From appetizers to desserts, explore our curated menu.',
    heroTitle: 'Fresh Food, Fast Delivery',
    heroText:
      'Explore our curated selection of dishes from top local restaurants. Fresh ingredients, amazing flavors, delivered right to your door.',
    productLabel: 'Menu Item',
    productsLabel: 'Menu',
    categoryLabel: 'Cuisine',
    filterFields: ['category', 'company', 'price', 'dietary'],
    currency: 'USD',
  },
  embroidery: {
    id: 'embroidery',
    name: 'Stitch & Style',
    tagline: 'Handcrafted embroidery for every occasion',
    type: 'craft',
    description:
      'Beautiful handcrafted embroidery pieces made with love. From personalized gifts to home decor, each piece is crafted with attention to detail.',
    heroTitle: 'Handcrafted With Love',
    heroText:
      'Discover unique, handmade embroidery pieces perfect for gifts, home decor, and personal accessories. Each piece tells a story.',
    productLabel: 'Item',
    productsLabel: 'Products',
    categoryLabel: 'Category',
    filterFields: ['category', 'company', 'color', 'price', 'shipping'],
    currency: 'USD',
  },
  general: {
    id: 'general',
    name: 'Market Place',
    tagline: 'Everything you need, all in one place',
    type: 'retail',
    description:
      'Your one-stop shop for quality products from trusted vendors. Browse our wide selection and find exactly what you need.',
    heroTitle: 'Shop With Confidence',
    heroText:
      'Browse thousands of products from trusted sellers. Quality guaranteed, fast shipping, and excellent customer service.',
    productLabel: 'Product',
    productsLabel: 'Products',
    categoryLabel: 'Category',
    filterFields: ['category', 'company', 'color', 'price', 'shipping'],
    currency: 'USD',
  },
}

// Change this to switch stores: 'restaurant', 'embroidery', or 'general'
export const activeStoreId = 'restaurant'

export const getStoreConfig = (storeId = activeStoreId) => {
  return storeConfigs[storeId] || storeConfigs.general
}
