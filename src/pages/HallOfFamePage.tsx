import Header from '@/components/Header';
import HallOfFame from '@/components/HallOfFame';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/Footer';

const HallOfFamePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
              🏆 HALL OF FAME
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bebas mb-6">
              <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                Honoring Legends of
              </span>
              <br />
              North East India
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-merriweather">
              Celebrating the visionary filmmakers, talented actors, musicians and groundbreaking fashion icons 
              that have shaped and continue to define the Hillywood awakening.
            </p>
          </div>
        </section>

        {/* Hall of Fame Component */}
        <HallOfFame />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HallOfFamePage;