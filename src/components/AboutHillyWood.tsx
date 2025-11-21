import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Globe, Zap, ArrowRight, Mountain } from 'lucide-react';
import SupportHillyWoodDialog from './SupportHillyWoodDialog';
import LearnMoreDialog from './LearnMoreDialog';
import { useIsMobile } from '@/hooks/use-mobile';

const values = [
  {
    icon: Heart,
    title: "Celebrating Northeast India's Culture",
    description: 'Every film is a living archive, preserving languages, traditions, and stories that might otherwise be lost to time.',
    color: 'text-red-400'
  },
  {
    icon: Users,
    title: 'Community Pride',
    description: 'Building a movement where every Northeastern person sees their culture celebrated and their stories told with dignity.',
    color: 'text-golden'
  },
  {
    icon: Globe,
    title: 'Global Recognition',
    description: 'Bringing the rich diversity of Northeast India to the world stage, one authentic story at a time.',
    color: 'text-blue-400'
  },
  {
    icon: Zap,
    title: 'Industry Innovation',
    description: 'Creating new opportunities for filmmakers, actors, and storytellers across all eight states.',
    color: 'text-primary-light'
  }
];

const stats = [
  { number: '8', label: 'States United', sublabel: 'One Vision' },
  { number: '50+', label: 'Languages', sublabel: 'Preserved' },
  { number: '200+', label: 'Stories', sublabel: 'Celebrated' },
  { number: '1M+', label: 'Hearts', sublabel: 'Connected' }
];

const AboutHillyWood = () => {
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const [isLearnMoreDialogOpen, setIsLearnMoreDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section className={`${isMobile ? 'py-12' : 'py-20'} px-6 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-5"></div>
      
      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary-light px-4 py-2">
            🏔️ {isMobile ? 'HILLYWOOD' : 'THE HILLYWOOD MOVEMENT'}
          </Badge>
          {isMobile ? (
            <>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                  NE India's Cultural Voice
                </span>
              </h2>
              <p className="text-base text-muted-foreground max-w-md mx-auto line-clamp-2">
                Cinema, music and fashion celebrating Northeast India
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                  Its glorious destiny in NE India and beyond
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-merriweather leading-relaxed mb-4">
                Hillywood celebrates cultural identity and narratives through cinema, music and fashion from the North East India
              </p>
            </>
          )}
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className={`bg-card-accent/40 border-golden/20 ${isMobile ? 'p-4' : 'p-8'} text-center`}>
            <CardContent className="p-0">
              <div className={`flex items-center justify-center ${isMobile ? 'mb-3' : 'mb-6'}`}>
                <Mountain className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-golden`} />
              </div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-foreground mb-3`}>Our Mission</h3>
              {isMobile ? (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  Transforming NE India's cultural landscape
                </p>
              ) : (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  "Hillywood catalyses transformative change in North East India's cultural, social and economic landscape."
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-foreground mb-8`}>
            {isMobile ? 'Our Values' : 'What Drives Us'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition group text-center"
              >
                <CardContent className={isMobile ? 'p-4' : 'p-6'}>
                  <div className={`flex items-center justify-center ${isMobile ? 'mb-2' : 'mb-4'}`}>
                    <value.icon className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} ${value.color} group-hover:scale-110 theatre-transition`} />
                  </div>
                  <h4 className={`font-semibold text-foreground ${isMobile ? 'mb-1 text-sm' : 'mb-3'} leading-snug`}>
                    {value.title}
                  </h4>
                  {!isMobile && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="mb-12">
          <div className={`grid grid-cols-2 ${isMobile ? 'gap-4' : 'md:grid-cols-4 gap-8'}`}>
            {stats.slice(0, isMobile ? 2 : 4).map((stat, index) => (
              <div 
                key={index}
                className={`text-center ${isMobile ? 'p-4' : 'p-6'} rounded-lg bg-card-accent/20 border border-border/10 hover:border-golden/20 theatre-transition`}
              >
                <div className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-golden mb-2`}>
                  {stat.number}
                </div>
                <div className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-foreground mb-1`}>
                  {stat.label}
                </div>
                {!isMobile && (
                  <div className="text-sm text-muted-foreground">
                    {stat.sublabel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The Vision */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">The HillyWood Vision</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-card-accent/20 rounded-lg border border-border/10">
              <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-golden font-bold">1</span>
              </div>
              <div>
                <p className="text-muted-foreground">
                  A platform to discover and launch new actress and actor talents from the North East.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card-accent/20 rounded-lg border border-border/10">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-light font-bold">2</span>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Celebrating cultural identity while embracing futuristic cinematic storytelling, heartfelt music and unique fashion.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card-accent/20 rounded-lg border border-border/10">
              <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-golden font-bold">3</span>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Empowering youth and bridging generations through entertainment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Dialog */}
        <SupportHillyWoodDialog 
          open={isSupportDialogOpen}
          onOpenChange={setIsSupportDialogOpen}
        />

        {/* Learn More Dialog */}
        <LearnMoreDialog 
          open={isLearnMoreDialogOpen}
          onOpenChange={setIsLearnMoreDialogOpen}
          topic="hillywood"
        />
      </div>
    </section>
  );
};

export default AboutHillyWood;