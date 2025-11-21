import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart, Star, Crown, Users, Film, Mountain, Check, CreditCard } from 'lucide-react';

interface SupportHillyWoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const supportTiers = [
  {
    id: 'patron',
    name: 'Cultural Patron',
    amount: 500,
    icon: Heart,
    color: 'text-red-400',
    bgColor: 'bg-red-400/20',
    description: 'Support independent filmmakers',
    features: [
      'Monthly newsletter updates',
      'Exclusive behind-the-scenes content',
      'Early access to new releases',
      'Digital certificate of support'
    ]
  },
  {
    id: 'guardian',
    name: 'Heritage Guardian',
    amount: 1500,
    icon: Star,
    color: 'text-golden',
    bgColor: 'bg-golden/20',
    description: 'Preserve cultural traditions',
    features: [
      'All Cultural Patron benefits',
      'Quarterly video calls with filmmakers',
      'Name in film credits (selected films)',
      'Exclusive merchandise package',
      'Priority customer support'
    ],
    popular: true
  },
  {
    id: 'champion',
    name: 'HillyWood Champion',
    amount: 5000,
    icon: Crown,
    color: 'text-primary-light',
    bgColor: 'bg-primary/20',
    description: 'Champion the movement',
    features: [
      'All Heritage Guardian benefits',
      'Annual meet & greet with cast/crew',
      'Executive producer credit opportunity',
      'Custom documentary about your state',
      'Lifetime access to all content',
      'Advisory board invitation'
    ]
  }
];

const impactStats = [
  { amount: '₹500', impact: 'Funds 1 hour of film production' },
  { amount: '₹1,500', impact: 'Supports 1 emerging filmmaker for a month' },
  { amount: '₹5,000', impact: 'Preserves 1 traditional folk tale digitally' },
  { amount: '₹15,000', impact: 'Produces 1 cultural documentary' }
];

const SupportHillyWoodDialog = ({ open, onOpenChange }: SupportHillyWoodDialogProps) => {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState('guardian');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'tier' | 'custom'>('tier');
  const [step, setStep] = useState(1); // 1: Choose support, 2: Payment, 3: Confirmation

  const selectedTierData = supportTiers.find(t => t.id === selectedTier);
  const finalAmount = donationType === 'custom' ? parseInt(customAmount) : selectedTierData?.amount || 0;

  const handleProceedToPayment = () => {
    if (donationType === 'custom' && (!customAmount || parseInt(customAmount) < 100)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a minimum amount of ₹100.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleCompleteSupport = () => {
    toast({
      title: "Thank You for Supporting HillyWood!",
      description: `Your contribution of ₹${finalAmount} will help preserve Northeast India's cultural heritage.`,
    });
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setDonationType('tier');
    setCustomAmount('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-golden" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                {step === 3 ? 'Thank You!' : 'Support HillyWood'}
              </DialogTitle>
              <Badge className="bg-golden/20 text-golden text-xs mt-1">
                🏔️ Cultural Movement
              </Badge>
            </div>
          </div>
          {step !== 3 && (
            <DialogDescription className="text-muted-foreground">
              Step {step} of 2: {step === 1 ? 'Choose your support level' : 'Complete your contribution'}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Step 1: Choose Support Level */}
        {step === 1 && (
          <div className="space-y-6">
            <Tabs value={donationType} onValueChange={(value) => setDonationType(value as 'tier' | 'custom')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card-accent/50">
                <TabsTrigger value="tier" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Support Tiers
                </TabsTrigger>
                <TabsTrigger value="custom" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Custom Amount
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tier" className="mt-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {supportTiers.map((tier) => (
                    <Card 
                      key={tier.id}
                      className={`cursor-pointer border-2 transition-all relative ${
                        selectedTier === tier.id 
                          ? 'border-golden bg-golden/5' 
                          : 'border-border/30 hover:border-golden/30'
                      }`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-golden text-black font-semibold">Most Popular</Badge>
                        </div>
                      )}
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 mx-auto ${tier.bgColor} rounded-full flex items-center justify-center mb-4`}>
                          <tier.icon className={`w-8 h-8 ${tier.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                        <div className="text-3xl font-bold text-golden mb-2">₹{tier.amount}</div>
                        <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                        <div className="space-y-2 text-left">
                          {tier.features.map((feature, index) => (
                            <div key={index} className="flex items-start text-xs text-muted-foreground">
                              <Check className="w-3 h-3 text-golden mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="mt-6">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">Custom Support</h3>
                    <p className="text-muted-foreground">Enter any amount to support the HillyWood movement</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount" className="text-foreground">Amount (₹)</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      min="100"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="bg-background/50 border-border/30 focus:border-golden/50 text-center text-xl"
                      placeholder="1000"
                    />
                    <p className="text-xs text-muted-foreground text-center">Minimum amount: ₹100</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Your Impact:</h4>
                    {impactStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-background/20 rounded-lg">
                        <span className="font-medium text-golden">{stat.amount}</span>
                        <span className="text-sm text-muted-foreground">{stat.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

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
                Support with ₹{finalAmount}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Complete Your Support</h3>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Contribution</p>
                <p className="text-2xl font-bold text-golden">₹{finalAmount}</p>
              </div>
            </div>

            <div className="bg-background/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CreditCard className="w-5 h-5 text-golden" />
                <h4 className="font-semibold text-foreground">Payment Method</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-foreground">Card Number</Label>
                  <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                    **** **** **** 1234
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">Cardholder Name</Label>
                  <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                    Demo Supporter
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Expiry Date</Label>
                  <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                    12/25
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">CVV</Label>
                  <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                    ***
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-border/30 text-muted-foreground hover:bg-background/50"
              >
                Back
              </Button>
              <Button
                onClick={handleCompleteSupport}
                className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition"
              >
                Complete Support
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-golden/20 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-golden" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Thank You for Supporting HillyWood!</h3>
              <p className="text-muted-foreground mb-4">
                Your contribution of ₹{finalAmount} will help preserve and celebrate Northeast India's rich cultural heritage.
              </p>
              
              <Card className="bg-card-accent/30 border-border/20 max-w-md mx-auto">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Support ID:</span>
                    <span className="font-mono text-foreground">HW{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-golden">₹{finalAmount}</span>
                  </div>
                  {donationType === 'tier' && selectedTierData && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tier:</span>
                      <span className="text-foreground">{selectedTierData.name}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-background/20 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">What Happens Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• Confirmation email sent to your registered address</li>
                  <li>• Digital certificate of support (if applicable)</li>
                  <li>• Access to exclusive supporter content</li>
                  <li>• Regular updates on funded projects</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={handleClose}
              className="theatre-gradient text-white px-8"
            >
              Continue Exploring HillyPix
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SupportHillyWoodDialog;