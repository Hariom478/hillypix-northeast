import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Award, Send, Star } from 'lucide-react';

interface NominationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const states = [
  'Arunachal Pradesh',
  'Assam', 
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Sikkim',
  'Tripura'
];

const categories = [
  'Lifetime Achievement',
  'Outstanding Directors',
  'Celebrated Performers',
  'Best Film',
  'Celebrating NorthEast Culture',
  'Technical Excellence',
  'Rising Star',
  'Community Impact'
];

const NominationDialog = ({ open, onOpenChange }: NominationDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nomineeName: '',
    nomineeState: '',
    category: '',
    achievement: '',
    filmography: '',
    contribution: '',
    nominatorName: '',
    nominatorEmail: '',
    nominatorRelation: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nomineeName || !formData.nomineeState || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Nomination Submitted!",
      description: `Thank you for nominating ${formData.nomineeName}. Our review committee will evaluate the submission within 2-3 weeks.`,
    });

    // Reset form
    setFormData({
      nomineeName: '',
      nomineeState: '',
      category: '',
      achievement: '',
      filmography: '',
      contribution: '',
      nominatorName: '',
      nominatorEmail: '',
      nominatorRelation: ''
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-golden" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                Submit Nomination
              </DialogTitle>
              <Badge className="bg-golden/20 text-golden text-xs mt-1">
                🏆 Hall of Fame
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-muted-foreground">
            Nominate someone who has made significant contributions to Northeast Indian cinema and culture.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Nominee Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-golden" />
              <h3 className="font-semibold text-foreground">Nominee Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomineeName" className="text-foreground">Full Name *</Label>
                <Input
                  id="nomineeName"
                  value={formData.nomineeName}
                  onChange={(e) => handleInputChange('nomineeName', e.target.value)}
                  className="bg-background/50 border-border/30 focus:border-golden/50"
                  placeholder="Enter nominee's full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nomineeState" className="text-foreground">State *</Label>
                <Select value={formData.nomineeState} onValueChange={(value) => handleInputChange('nomineeState', value)}>
                  <SelectTrigger className="bg-background/50 border-border/30 focus:border-golden/50">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="bg-background/50 border-border/30 focus:border-golden/50">
                  <SelectValue placeholder="Select nomination category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievement" className="text-foreground">Key Achievement</Label>
              <Input
                id="achievement"
                value={formData.achievement}
                onChange={(e) => handleInputChange('achievement', e.target.value)}
                className="bg-background/50 border-border/30 focus:border-golden/50"
                placeholder="e.g., National Award Winner, Pioneer of Regional Cinema"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filmography" className="text-foreground">Notable Films/Works</Label>
              <Textarea
                id="filmography"
                value={formData.filmography}
                onChange={(e) => handleInputChange('filmography', e.target.value)}
                className="bg-background/50 border-border/30 focus:border-golden/50 min-h-[80px]"
                placeholder="List significant films, productions, or cultural works..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contribution" className="text-foreground">Cultural Contribution</Label>
              <Textarea
                id="contribution"
                value={formData.contribution}
                onChange={(e) => handleInputChange('contribution', e.target.value)}
                className="bg-background/50 border-border/30 focus:border-golden/50 min-h-[100px]"
                placeholder="Describe their impact on Northeast Indian cinema and culture..."
              />
            </div>
          </div>

          {/* Nominator Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-primary-light" />
              <h3 className="font-semibold text-foreground">Your Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nominatorName" className="text-foreground">Your Name</Label>
                <Input
                  id="nominatorName"
                  value={formData.nominatorName}
                  onChange={(e) => handleInputChange('nominatorName', e.target.value)}
                  className="bg-background/50 border-border/30 focus:border-golden/50"
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nominatorEmail" className="text-foreground">Email</Label>
                <Input
                  id="nominatorEmail"
                  type="email"
                  value={formData.nominatorEmail}
                  onChange={(e) => handleInputChange('nominatorEmail', e.target.value)}
                  className="bg-background/50 border-border/30 focus:border-golden/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nominatorRelation" className="text-foreground">Relationship to Nominee</Label>
              <Input
                id="nominatorRelation"
                value={formData.nominatorRelation}
                onChange={(e) => handleInputChange('nominatorRelation', e.target.value)}
                className="bg-background/50 border-border/30 focus:border-golden/50"
                placeholder="e.g., Colleague, Fan, Film Scholar, Community Member"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border/30 text-muted-foreground hover:bg-background/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Nomination
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NominationDialog;