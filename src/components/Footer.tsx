import { useIsMobile } from '@/hooks/use-mobile';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import hillywoodLogo from '@/assets/hillywood-logo.svg';

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-card-accent/50 border-t border-border/20 py-12 px-6">
      <div className="container mx-auto">
        {isMobile ? (
          <>
            {/* Mobile: Brand Section */}
            <div className="mb-6">
              <img 
                src={hillywoodLogo} 
                alt="HillyWood" 
                className="h-10 w-auto mb-3"
              />
              <p className="text-sm text-muted-foreground mb-2 font-merriweather line-clamp-2">
                Celebrating Northeast India's cultural cinema
              </p>
              <p className="text-xs text-golden italic font-semibold">
                From NE for NE India
              </p>
            </div>

            {/* Mobile: Accordion Navigation */}
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="states">
                <AccordionTrigger className="font-spartan font-semibold text-foreground">
                  Explore
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="space-y-2 text-sm">
                    <a href="/premieres" className="block text-muted-foreground hover:text-golden theatre-transition">Movies</a>
                    <a href="/tv-series" className="block text-muted-foreground hover:text-golden theatre-transition">TV Series</a>
                    <a href="/music" className="block text-muted-foreground hover:text-golden theatre-transition">Music</a>
                  </nav>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="platform">
                <AccordionTrigger className="font-spartan font-semibold text-foreground">
                  Platform
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="space-y-2 text-sm">
                    <a href="/hillywood-fiesta" className="block text-muted-foreground hover:text-golden theatre-transition">Hillywood Fiesta</a>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Support">
                <AccordionTrigger className="font-spartan font-semibold text-foreground">
                  Support
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="space-y-2 text-sm">
                    <a href="/about" className="block text-muted-foreground hover:text-golden theatre-transition">About Us</a>
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Mobile: Copyright */}
            <div className="text-center text-sm text-muted-foreground">
              © 2024 HillyPix
            </div>
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-5 gap-8">
              {/* Brand */}
              <div className="col-span-2 md:col-span-2">
                <img 
                  src={hillywoodLogo} 
                  alt="HillyWood" 
                  className="h-12 w-auto mb-4"
                />
                <p className="text-sm text-muted-foreground mb-3 font-merriweather">
                  Celebrating Northeast India's cultural cinema through the HillyWood movement.
                </p>
                <p className="text-xs text-golden italic font-semibold mb-3">
                  Traditionally rooted, futuristically bold
                </p>
                <p className="text-xs text-muted-foreground">
                  © 2024 HillyWood. Preserving culture through cinema.
                </p>
              </div>

              {/* States */}
              <div>
                <h4 className="font-spartan font-semibold text-foreground mb-4">Explore</h4>
                <nav className="space-y-2 text-sm">
                  <a href="/premieres" className="block text-muted-foreground hover:text-golden theatre-transition">Movies</a>
                  <a href="/tv-series" className="block text-muted-foreground hover:text-golden theatre-transition">TV Series</a>
                  <a href="/music" className="block text-muted-foreground hover:text-golden theatre-transition">Music</a>
                </nav>
              </div>

              {/* Platform */}
              <div>
                <h4 className="font-spartan font-semibold text-foreground mb-4">Platform</h4>
                <nav className="space-y-2 text-sm">
                  <a href="/hillywood-fiesta" className="block text-muted-foreground hover:text-golden theatre-transition">Hillywood Fiesta</a>
                </nav>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-spartan font-semibold text-foreground mb-4">Support</h4>
                <nav className="space-y-2 text-sm">
                  <a href="/about" className="block text-muted-foreground hover:text-golden theatre-transition">About Us</a>
                </nav>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border/20 text-center space-y-2">
              <p className="text-sm font-semibold text-golden">
                From Northeast for Northeast India
              </p>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ for Northeast India's cultural heritage
              </p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
