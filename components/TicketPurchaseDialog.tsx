import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Ticket, Star, Clock, MapPin, CreditCard, Users, Calendar, Check } from 'lucide-react';

interface TicketPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: {
    title: string;
    poster: string;
    rating: number;
    duration: string;
    language: string;
    state: string;
  };
}

const ticketTypes = [
  {
    id: 'single',
    name: 'Basic Tier',
    price: 299,
    description: 'Perfect for casual viewing',
    viewingLimit: '3 times',
    features: ['Watch up to 3 times', 'HD quality streaming', '48-hour access window', 'Mobile & desktop viewing']
  },
  {
    id: 'premium',
    name: 'Premium Tier',
    price: 499,
    description: 'Enhanced viewing experience',
    viewingLimit: '6 times',
    features: ['Watch up to 6 times', 'Full HD quality', '7-day access window', 'Behind-the-scenes content', 'Download option', 'Multi-device support']
  },
  {
    id: 'bundle',
    name: 'Unlimited Tier',
    price: 899,
    description: 'Complete unlimited access',
    viewingLimit: 'Unlimited',
    features: ['Unlimited viewing', 'Lifetime access', '4K quality available', 'All bonus content', 'Download for offline', 'Priority support', 'Share with family (2 devices)']
  }
];

const TicketPurchaseDialog = ({ open, onOpenChange, movie }: TicketPurchaseDialogProps) => {
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState('single');
  const [step, setStep] = useState(1); // 1: Select ticket, 2: Payment details, 3: Confirmation
  
  const selectedTicketType = ticketTypes.find(t => t.id === selectedTicket);

  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handleCompletePurchase = () => {
    // Simulate purchase
    toast({
      title: "Ticket Purchased Successfully!",
      description: `Your ${selectedTicketType?.name} for "${movie.title}" has been added to your library.`,
    });
    
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedTicket('single');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-golden" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                {step === 3 ? 'Purchase Complete!' : 'Buy Premiere Ticket'}
              </DialogTitle>
              <Badge className="bg-golden/20 text-golden text-xs mt-1">
                🎭 {movie.title}
              </Badge>
            </div>
          </div>
          {step !== 3 && (
            <DialogDescription className="text-muted-foreground">
              Step {step} of 2: {step === 1 ? 'Select your ticket type' : 'Complete your purchase'}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Movie Info Bar */}
        <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg mb-6">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-16 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-bold text-foreground">{movie.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center">
                <Star className="w-3 h-3 text-golden mr-1" />
                {movie.rating}
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {movie.duration}
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {movie.state}
              </div>
            </div>
            <Badge variant="secondary" className="mt-2 text-xs">
              {movie.language}
            </Badge>
          </div>
        </div>

        {/* Step 1: Ticket Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Choose Your Experience</h3>
            
            <div className="grid gap-4">
              {ticketTypes.map((ticket) => (
                <Card 
                  key={ticket.id}
                  className={`cursor-pointer border-2 transition-all ${
                    selectedTicket === ticket.id 
                      ? 'border-golden bg-golden/5' 
                      : 'border-border/30 hover:border-golden/30'
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedTicket === ticket.id 
                              ? 'border-golden bg-golden' 
                              : 'border-border'
                          }`} />
                          <h4 className="font-semibold text-foreground">{ticket.name}</h4>
                          <Badge className="bg-primary/20 text-primary-light">
                            ₹{ticket.price}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-golden/30 text-golden text-xs">
                            {ticket.viewingLimit}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        </div>
                        <div className="space-y-1">
                          {ticket.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-xs text-muted-foreground">
                              <Check className="w-3 h-3 text-golden mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-border/30 text-muted-foreground hover:bg-background/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceedToPayment}
                className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition"
              >
                Proceed to Payment - ₹{selectedTicketType?.price}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Payment Details</h3>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-golden">₹{selectedTicketType?.price}</p>
              </div>
            </div>

            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-card-accent/50">
                <TabsTrigger value="card" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="upi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  UPI
                </TabsTrigger>
                <TabsTrigger value="wallet" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-background/30 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Card Number</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          **** **** **** 1234
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Cardholder Name</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          Demo User
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Expiry</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          12/25
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">CVV</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          ***
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upi" className="mt-4">
                <div className="bg-background/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground mb-4">UPI Payment Demo</p>
                  <div className="p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                    user@paytm
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="wallet" className="mt-4">
                <div className="bg-background/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground mb-4">Wallet Balance</p>
                  <div className="p-3 bg-background/50 rounded border border-border/30 text-golden font-semibold">
                    ₹2,500 Available
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-border/30 text-muted-foreground hover:bg-background/50"
              >
                Back
              </Button>
              <Button
                onClick={handleCompletePurchase}
                className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition"
              >
                Complete Purchase
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-golden/20 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-golden" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Purchase Successful!</h3>
              <p className="text-muted-foreground mb-4">
                Your {selectedTicketType?.name} for "{movie.title}" has been added to your library.
              </p>
              
              <Card className="bg-card-accent/30 border-border/20 max-w-md mx-auto">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono text-foreground">HPX{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Amount Paid:</span>
                    <span className="font-semibold text-golden">₹{selectedTicketType?.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Access:</span>
                    <span className="text-foreground">Immediate</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-golden/50 text-golden hover:bg-golden/10"
              >
                Continue Browsing
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 theatre-gradient text-white"
              >
                Go to My Library
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseDialog;