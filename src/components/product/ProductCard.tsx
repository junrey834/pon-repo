import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group product-card block"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-heading font-semibold text-lg group-hover:underline underline-offset-4">
          {product.name}
        </h3>
        <p className="text-muted-foreground">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
