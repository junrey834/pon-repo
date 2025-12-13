import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="hero-text font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            PON
          </h1>
          <p className="hero-text hero-text-delay font-heading text-xl md:text-2xl lg:text-3xl font-medium mb-8 tracking-wide">
            Wear Your Identity
          </p>
          <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
            <Button asChild variant="hero" size="xl">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/shop">View Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-2 block">
                New Arrivals
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                Featured Collection
              </h2>
            </div>
            <Link 
              to="/shop" 
              className="mt-4 md:mt-0 text-sm font-medium tracking-wide link-underline"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Crafted for those who refuse to blend in
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            Every piece is designed with intention, using premium materials that stand the test of time. 
            PON is more than clothing—it's a statement.
          </p>
          <Button asChild className="mt-10" size="lg">
            <Link to="/about">Our Story</Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/shop?category=hoodie" 
              className="group relative aspect-[4/3] overflow-hidden bg-secondary"
            >
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="font-heading text-3xl md:text-4xl font-bold text-background">
                  Hoodies
                </span>
              </div>
            </Link>
            <Link 
              to="/shop?category=jacket" 
              className="group relative aspect-[4/3] overflow-hidden bg-secondary"
            >
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="font-heading text-3xl md:text-4xl font-bold text-background">
                  Jackets
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
