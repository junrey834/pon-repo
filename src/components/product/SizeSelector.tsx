import { ProductSize } from '@/types/product';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize | null;
  onSelect: (size: ProductSize) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSelect }: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium uppercase tracking-wider">Size</span>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              "w-12 h-12 border font-medium text-sm transition-all",
              selectedSize === size
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:border-foreground"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
