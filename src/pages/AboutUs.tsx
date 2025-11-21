import { useEffect } from 'react';
import Header from '@/components/Header';
import AboutHillyWood from '@/components/AboutHillyWood';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/Footer';

const AboutUs = () => {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = 'About HillyWood - The Northeast India Cinema Movement | HillyPix';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about the HillyWood movement - celebrating and preserving Northeast India\'s rich cultural heritage through cinema. Discover our mission, values, and vision for regional filmmaking.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary px-4 py-2">
              🎬 ABOUT HILLYWOOD
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bebas mb-6">
              <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                More than
              </span>
              <br />
              Entertainment
            </h1>
            <p className="text-xl md:text-2xl font-bold text-golden mb-4">
              Traditionally rooted, futuristically bold
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-merriweather mb-2">
              Discover the story behind HillyWood - a cultural movement dedicated to celebrating 
              and preserving Northeast India's cinematic, music and fashion heritage.
            </p>
            <p className="text-base text-golden italic font-semibold">
              Roots in soil, eyes on stars
            </p>
          </div>
        </section>

        {/* About HillyWood Component */}
        <AboutHillyWood />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
