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
                  Eight States
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="space-y-2 text-sm">
                    <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Assam</a>
                    <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Manipur</a>
                    <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Nagaland</a>
                    <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Meghalaya</a>
                  </nav>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="platform">
                <AccordionTrigger className="font-spartan font-semibold text-foreground">
                  Platform
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="space-y-2 text-sm">
                    <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Premieres</a>
                    <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Library</a>
                    <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Hall of Fame</a>
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
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
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
                <h4 className="font-spartan font-semibold text-foreground mb-4">Eight States</h4>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Assam</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Manipur</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Nagaland</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Meghalaya</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Mizoram</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Tripura</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Arunachal Pradesh</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Sikkim</a>
                </nav>
              </div>

              {/* Platform */}
              <div>
                <h4 className="font-spartan font-semibold text-foreground mb-4">Platform</h4>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Premieres</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Library</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Hall of Fame</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">About</a>
                </nav>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-spartan font-semibold text-foreground mb-4">Support</h4>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Help Center</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Community</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Contact</a>
                  <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Press Kit</a>
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
