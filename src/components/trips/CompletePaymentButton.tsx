
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, CreditCard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface CompletePaymentButtonProps {
  bookingId: string;
  amount: number;
  tripOrigin: string;
  tripDestination: string;
  onSuccess?: () => void;
}

const CompletePaymentButton: React.FC<CompletePaymentButtonProps> = ({
  bookingId,
  amount,
  tripOrigin,
  tripDestination,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsOpen(false);
      
      toast({
        title: "Payment Successful!",
        description: `Your payment of $${amount.toFixed(2)} has been processed.`,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Complete Trip & Pay
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Trip & Pay</DialogTitle>
          <DialogDescription>
            Complete payment for your trip from {tripOrigin} to {tripDestination}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <span>Trip Fee</span>
              <span>${(amount - 3).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service Fee</span>
              <span>$3.00</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>${amount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md text-sm">
            <p className="font-medium">Your payment information is securely stored</p>
            <p className="text-muted-foreground">You will be charged once you confirm.</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirm Payment (${amount.toFixed(2)})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletePaymentButton;
