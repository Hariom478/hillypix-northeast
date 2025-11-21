import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mountain, Users, Globe, Film, Heart, Star, 
  PlayCircle, BookOpen, Award, Calendar,
  ArrowRight, X, MapPin, Languages
} from 'lucide-react';

interface LearnMoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topic?: 'hillywood' | 'premiere' | 'general';
  movieTitle?: string;
}

const hillywoodStory = {
  sections: [
    {
      title: "The Birth of HillyWood",
      content: "HillyWood represents more than just a film industry—it's a cultural revolution. Born from the recognition that Northeast India's eight states possess rich, diverse storytelling traditions that deserve global recognition, HillyWood aims to create a sustainable ecosystem for regional cinema.",
      icon: Mountain
    },
    {
      title: "Celebrating NorthEast Culture",
      content: "Every film in our collection serves as a digital archive, preserving languages, traditions, and stories that might otherwise be lost. We work directly with communities to ensure authentic representation and cultural accuracy in every production.",
      icon: Heart
    },
    {
      title: "Economic Impact",
      content: "By supporting HillyWood, you're directly contributing to the livelihoods of hundreds of artists, technicians, and storytellers across Northeast India. Every ticket purchase helps sustain local economies and create new opportunities.",
      icon: Users
    },
    {
      title: "Global Recognition",
      content: "Our ultimate goal is to bring Northeast Indian cinema to international film festivals, streaming platforms, and global audiences, showcasing the region's unique perspectives and artistic excellence.",
      icon: Globe
    }
  ]
};

const eightStates = [
  { name: 'Arunachal Pradesh', languages: ['Nyishi', 'Apatani', 'Galo'], films: 12, specialty: 'Mountain folklore' },
  { name: 'Assam', languages: ['Assamese', 'Bodo'], films: 34, specialty: 'Tea garden stories' },
  { name: 'Manipur', languages: ['Manipuri', 'Tangkhul'], films: 18, specialty: 'Classical dance cinema' },
  { name: 'Meghalaya', languages: ['Khasi', 'Garo'], films: 12, specialty: 'Matrilineal narratives' },
  { name: 'Mizoram', languages: ['Mizo', 'Chakma'], films: 10, specialty: 'Bamboo culture tales' },
  { name: 'Nagaland', languages: ['Ao', 'Angami', 'Sema'], films: 15, specialty: 'Warrior traditions' },
  { name: 'Sikkim', languages: ['Nepali', 'Bhutia'], films: 8, specialty: 'Buddhist philosophy' },
  { name: 'Tripura', languages: ['Kokborok', 'Bengali'], films: 16, specialty: 'Royal heritage' }
];

const filmCategories = [
  {
    name: 'Traditional',
    description: 'Stories rooted in ancient traditions, folklore, and cultural practices',
    count: 45,
    examples: ['Ka Jainsen (Khasi legend)', 'Naga Rangtsa (Warrior saga)', 'Puanchei (Mizo folk tale)']
  },
  {
    name: 'Modern',
    description: 'Contemporary stories exploring current issues and urban experiences',
    count: 32,
    examples: ['Digital Village (Tech revolution)', 'City Lights (Urban migration)', 'Himalayan Dreams (Youth aspirations)']
  },
  {
    name: 'Documentary',
    description: 'Real stories documenting culture, history, and social issues',
    count: 28,
    examples: ['Sacred Groves (Environmental)', 'Bamboo Forest (Traditional crafts)', 'Royal Heritage (Historical)']
  },
  {
    name: 'Folk Tales',
    description: 'Animated and live-action adaptations of traditional stories',
    count: 22,
    examples: ['Hunter\'s Tale (Naga mythology)', 'Spirit Dance (Apatani traditions)', 'Raas Leela (Manipuri classics)']
  }
];

const LearnMoreDialog = ({ open, onOpenChange, topic = 'general', movieTitle }: LearnMoreDialogProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getDialogTitle = () => {
    switch (topic) {
      case 'hillywood':
        return 'About HillyWood Movement';
      case 'premiere':
        return movieTitle ? `About "${movieTitle}"` : 'About Our Premieres';
      default:
        return 'Learn More About HillyPix';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-golden" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                  {getDialogTitle()}
                </DialogTitle>
                <Badge className="bg-golden/20 text-golden text-xs mt-1">
                  🎭 Cultural Cinema Platform
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-muted-foreground">
            Discover the story behind Northeast India's premier cultural cinema platform
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card-accent/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Film className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="states" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              8 States
            </TabsTrigger>
            <TabsTrigger value="films" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <PlayCircle className="w-4 h-4 mr-2" />
              Film Types
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Star className="w-4 h-4 mr-2" />
              Impact
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">The HillyWood Revolution</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                HillyPix is pioneering a new era for Northeast Indian cinema, creating the first comprehensive platform 
                dedicated to preserving, celebrating, and globalizing the region's rich storytelling traditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hillywoodStory.sections.map((section, index) => (
                <Card key={index} className="bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-golden" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-golden/10 rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold text-foreground mb-2">Our Mission</h4>
              <p className="text-muted-foreground italic">
                "To create a thriving ecosystem where Northeast India's eight states have their own cinematic identity—
                <span className="text-golden font-semibold"> HillyWood</span>—that rivals any film industry in the world."
              </p>
            </div>
          </TabsContent>

          {/* Eight States Tab */}
          <TabsContent value="states" className="mt-6 space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Eight States, Infinite Stories</h3>
              <p className="text-muted-foreground">
                Each state brings its unique cultural perspective, languages, and storytelling traditions to HillyWood.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {eightStates.map((state, index) => (
                <Card key={index} className="bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-bold text-foreground mb-2">{state.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center text-golden">
                        <Film className="w-3 h-3 mr-1" />
                        <span>{state.films} films</span>
                      </div>
                      <div className="flex items-center justify-center text-muted-foreground">
                        <Languages className="w-3 h-3 mr-1" />
                        <span>{state.languages.join(', ')}</span>
                      </div>
                      <div className="text-xs text-muted-foreground italic">
                        {state.specialty}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-background/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">Language Preservation</h4>
              <p className="text-muted-foreground mb-4">
                HillyPix actively works to preserve and promote over 50 indigenous languages across Northeast India, 
                ensuring that each film maintains linguistic authenticity and cultural accuracy.
              </p>
              <div className="flex items-center text-golden">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">UNESCO Language Preservation Partner</span>
              </div>
            </div>
          </TabsContent>

          {/* Film Types Tab */}
          <TabsContent value="films" className="mt-6 space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Diverse Film Categories</h3>
              <p className="text-muted-foreground">
                From ancient folklore to contemporary stories, our collection spans every genre and style.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filmCategories.map((category, index) => (
                <Card key={index} className="bg-card-accent/30 border-border/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-foreground">{category.name}</h4>
                      <Badge className="bg-golden/20 text-golden">{category.count} films</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div>
                      <h5 className="text-sm font-semibold text-foreground mb-2">Featured Films:</h5>
                      <ul className="space-y-1">
                        {category.examples.map((example, exIndex) => (
                          <li key={exIndex} className="text-sm text-muted-foreground flex items-center">
                            <PlayCircle className="w-3 h-3 mr-2 text-golden" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="mt-6 space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Our Cultural Impact</h3>
              <p className="text-muted-foreground">
                Measuring success beyond numbers—preserving heritage, empowering communities, and inspiring pride.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-card-accent/30 border-border/20 text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-golden mb-1">127</div>
                  <div className="text-sm text-muted-foreground">Films Preserved</div>
                </CardContent>
              </Card>
              <Card className="bg-card-accent/30 border-border/20 text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary-light mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Languages Featured</div>
                </CardContent>
              </Card>
              <Card className="bg-card-accent/30 border-border/20 text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-golden mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Artists Supported</div>
                </CardContent>
              </Card>
              <Card className="bg-card-accent/30 border-border/20 text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary-light mb-1">1M+</div>
                  <div className="text-sm text-muted-foreground">Cultural Connections</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="bg-card-accent/30 border-border/20">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Heart className="w-5 h-5 text-red-400 mr-2" />
                    Community Stories
                  </h4>
                  <p className="text-muted-foreground italic">
                    "HillyPix gave our village's 200-year-old folk tale a global stage. Now our children are proud of their heritage." 
                    <span className="text-golden font-medium">— Elder from Arunachal Pradesh</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card-accent/30 border-border/20">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Users className="w-5 h-5 text-golden mr-2" />
                    Economic Empowerment
                  </h4>
                  <p className="text-muted-foreground">
                    Over 500 artists, technicians, and storytellers across Northeast India now have sustainable 
                    income through our platform, with 80% reporting improved livelihoods since joining HillyWood.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card-accent/30 border-border/20">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Globe className="w-5 h-5 text-blue-400 mr-2" />
                    Global Recognition
                  </h4>
                  <p className="text-muted-foreground">
                    15 HillyWood films have been selected for international film festivals, with 3 winning awards 
                    and bringing global recognition to Northeast Indian cinema.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-border/20 text-center">
          <Button
            onClick={() => onOpenChange(false)}
            className="theatre-gradient text-white px-8"
          >
            Start Exploring HillyPix
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMoreDialog;