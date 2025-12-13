import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20),
  address: z.string().trim().min(10, 'Please enter your full address').max(500),
});

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Checkout = () => {
  const navigate = useNavigate();
  const { state, getCartTotal, clearCart } = useCart();
  const { items } = state;

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="page-enter min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items before checking out.
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

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = checkoutSchema.parse(formData);
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Thank you, ${validatedData.fullName}! Your order has been confirmed. We'll send a confirmation to ${validatedData.email}.`,
      });
      
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-enter">
      <div className="container mx-auto py-8 md:py-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <h2 className="font-heading text-xl font-bold mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  placeholder="John Doe"
                  className={errors.fullName ? 'border-destructive' : ''}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="john@example.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  placeholder="123 Main St, City, State, ZIP"
                  rows={3}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-heading font-semibold mb-4">Payment Method</h3>
                <div className="flex items-center gap-3 p-4 border border-foreground bg-secondary">
                  <div className="w-4 h-4 border-2 border-foreground rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-foreground rounded-full" />
                  </div>
                  <span className="font-medium">Cash on Delivery</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Pay when your order arrives at your doorstep.
                </p>
              </div>

              <Button
                type="submit"
                size="xl"
                className="w-full mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Place Order — $${total}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-secondary p-8 sticky top-24">
              <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    <div className="w-16 h-16 bg-background flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 mt-6 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between pt-6 mt-6 border-t border-border text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
