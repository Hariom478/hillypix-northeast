import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 pt-24">
        <div className="text-center">
          <h1 className="text-6xl font-bebas text-golden mb-4">404</h1>
          <p className="text-2xl font-bold text-foreground mb-2">Oops! Page not found</p>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="theatre-gradient text-white"
          >
            Return to Home
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
