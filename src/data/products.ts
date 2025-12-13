import { Product } from '@/types/product';

import blackHoodie from '@/assets/products/black-hoodie.jpg';
import creamHoodie from '@/assets/products/cream-hoodie.jpg';
import whiteHoodie from '@/assets/products/white-hoodie.jpg';
import grayJacket from '@/assets/products/gray-jacket.jpg';
import blackJacket from '@/assets/products/black-jacket.jpg';
import navyPuffer from '@/assets/products/navy-puffer.jpg';

export const products: Product[] = [
  {
    id: 'essential-black-hoodie',
    name: 'Essential Black Hoodie',
    price: 129,
    description: 'Our signature oversized hoodie crafted from premium heavyweight cotton. Features a relaxed fit, kangaroo pocket, and subtle PON branding. The perfect foundation for any streetwear look.',
    image: blackHoodie,
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'cream-cloud-hoodie',
    name: 'Cream Cloud Hoodie',
    price: 139,
    description: 'Soft cream colorway in our bestselling silhouette. Made with brushed fleece interior for ultimate comfort. Pairs effortlessly with any wardrobe.',
    image: creamHoodie,
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'pure-white-hoodie',
    name: 'Pure White Hoodie',
    price: 129,
    description: 'Clean and minimal. Our white hoodie is perfect for those who appreciate understated style. Premium construction with reinforced seams.',
    image: whiteHoodie,
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'urban-bomber-jacket',
    name: 'Urban Bomber Jacket',
    price: 189,
    description: 'Classic bomber silhouette with modern detailing. Water-resistant shell with quilted lining. Features ribbed cuffs and hem for a secure fit.',
    image: grayJacket,
    category: 'jacket',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'noir-leather-jacket',
    name: 'Noir Leather Jacket',
    price: 349,
    description: 'Premium faux leather biker jacket. Asymmetric zip closure with metal hardware. A statement piece for those who dare to stand out.',
    image: blackJacket,
    category: 'jacket',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'navy-puffer-jacket',
    name: 'Navy Puffer Jacket',
    price: 229,
    description: 'Stay warm in style. Our puffer jacket features sustainable insulation and a contemporary oversized fit. Hooded design with adjustable drawcord.',
    image: navyPuffer,
    category: 'jacket',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: 'hoodie' | 'jacket' | 'all'): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};
