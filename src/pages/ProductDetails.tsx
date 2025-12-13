import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SizeSelector from '@/components/product/SizeSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import { getProductById } from '@/data/products';
import { ProductSize } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = getProductById(id || '');
  
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, selectedSize, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <div className="page-enter">
      <div className="container mx-auto py-8 md:py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="aspect-square bg-secondary overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-2">
              {product.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-medium mb-6">
              ${product.price}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-6 mb-8">
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
              />

              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(q => Math.min(q + 1, 10))}
                onDecrease={() => setQuantity(q => Math.max(q - 1, 1))}
              />
            </div>

            <Button
              onClick={handleAddToCart}
              size="xl"
              className="w-full"
            >
              Add to Cart — ${product.price * quantity}
            </Button>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-border space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Free shipping</span>
                <span>On orders over $100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Returns</span>
                <span>30-day free returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
