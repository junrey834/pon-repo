import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByCategory, products } from '@/data/products';
import { cn } from '@/lib/utils';

type FilterCategory = 'all' | 'hoodie' | 'jacket';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as FilterCategory) || 'all';
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(initialCategory);

  const filteredProducts = useMemo(() => {
    return getProductsByCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: FilterCategory) => {
    setActiveCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const categories: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'hoodie', label: 'Hoodies' },
    { value: 'jacket', label: 'Jackets' },
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
            Shop
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            {products.length} products
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={cn(
                  "px-6 py-2 text-sm font-medium tracking-wide transition-all border",
                  activeCategory === category.value
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
