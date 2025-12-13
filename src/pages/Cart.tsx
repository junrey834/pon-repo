import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuantitySelector from '@/components/product/QuantitySelector';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { state, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { items } = state;

  if (items.length === 0) {
    return (
      <div className="page-enter min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild size="lg">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="page-enter">
      <div className="container mx-auto py-8 md:py-16">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-6 p-6 border border-border"
              >
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-24 h-24 md:w-32 md:h-32 bg-secondary flex-shrink-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-heading font-semibold text-lg hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Size: {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 h-10 flex items-center justify-center border-x border-border">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium">
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-8 sticky top-24">
              <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $100
                  </p>
                )}
              </div>

              <div className="flex justify-between py-6 text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <Button asChild size="xl" className="w-full">
                <Link to="/checkout">
                  Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Link
                to="/shop"
                className="block text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
