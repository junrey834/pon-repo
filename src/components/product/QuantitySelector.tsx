import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10,
}: QuantitySelectorProps) => {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium uppercase tracking-wider">Quantity</span>
      <div className="flex items-center border border-border w-fit">
        <button
          onClick={onDecrease}
          disabled={quantity <= min}
          className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 h-12 flex items-center justify-center font-medium border-x border-border">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          disabled={quantity >= max}
          className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
