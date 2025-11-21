import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Ticket, Calendar, Users } from 'lucide-react';
import theatreHero from '@/assets/theatre-hero.jpg';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();

  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Theatre Image */}
      <div className="absolute inset-0 z-0">
        <img src={theatreHero} alt="Grand Cultural Theatre" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"></div>
        <div className="absolute inset-0 cultural-pattern opacity-30"></div>
      </div>

      {/* Spotlight Effect */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 spotlight-glow animate-spotlight-fade pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-theatre-entrance">
        {/* Cultural Badge */}
        <Badge className="mb-6 theatre-gradient text-white px-6 py-2 text-sm font-medium tracking-wider">
          🎭 {isMobile ? 'NE INDIA CINEMA' : 'NORTHEAST INDIA\'S CULTURAL CINEMA'}
        </Badge>

        {/* Main Title */}
        {isMobile ? (
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-golden via-primary-light to-golden bg-clip-text text-transparent">
              HillyPix
            </span>
          </h1>
        ) : (
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-golden via-primary-light to-golden bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="text-foreground">HillyPix</span>
          </h1>
        )}

        {/* Tagline */}
        {isMobile ? (
          <div className="mb-6 space-y-2">
            <p className="text-xl font-bold text-golden">
              From NE for NE India
            </p>
          </div>
        ) : (
          <div className="mb-8 space-y-3">
            <p className="text-2xl md:text-3xl font-bold text-golden">
              From Northeast for Northeast India
            </p>
            <p className="text-lg md:text-xl font-medium text-muted-foreground italic">
              Roots in soil, eyes on stars
            </p>
          </div>
        )}

        {/* Subtitle */}
        {!isMobile && (
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Step into the grand cultural theatre of Hillywood, defining North East India. <span className="text-golden font-semibold">"Truly East"</span>
          </p>
        )}

        {/* Stats */}
        <div className={`flex flex-wrap justify-center ${isMobile ? 'gap-4' : 'gap-8'} mb-10 text-center`}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary-light" />
            </div>
            <span className="text-muted-foreground text-sm">8 States</span>
          </div>
          {!isMobile && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-golden" />
              </div>
              <span className="text-muted-foreground">Multiple Languages</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-light" />
            </div>
            <span className="text-muted-foreground text-sm">Weekly Premieres</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size={isMobile ? "default" : "lg"} asChild className="theatre-gradient text-white px-8 py-4 text-lg font-semibold hover:scale-105 theatre-transition premiere-glow w-full sm:w-auto">
            <Link to="/premieres">
              <Ticket className="w-5 h-5 mr-3" />
              {isMobile ? 'Premieres' : 'Browse Premieres'}
            </Link>
          </Button>
          <Button variant="outline" size={isMobile ? "default" : "lg"} asChild className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-4 text-lg font-semibold hover:scale-105 theatre-transition w-full sm:w-auto">
            <Link to="/library">
              <Play className="w-5 h-5 mr-3" />
              {isMobile ? 'Library' : 'Explore Library'}
            </Link>
          </Button>
        </div>

        {/* Cultural Note - Desktop Only */}
        {!isMobile && (
          <div className="mt-12 p-6 bg-card-accent/30 backdrop-blur-sm rounded-xl border border-border/20">
            <p className="text-sm text-muted-foreground italic">
              "Every ticket purchased supports the growing <span className="text-golden font-medium">HillyWood</span> movement, preserving and celebrating the rich cultural heritage of Northeast India through cinema, music and fashion."
            </p>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
