import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NowPremiering from '@/components/NowPremiering';
import CulturalLibrary from '@/components/CulturalLibrary';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = 'HillyPix - Northeast India\'s Cultural Cinema Theatre | HillyWood Movement';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experience HillyPix - the premier online cultural theatre showcasing films from all eight states of Northeast India. Buy tickets for premieres, explore our cultural library, and join the HillyWood movement celebrating authentic stories and traditions.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HillyPix",
      "alternateName": "HillyWood",
      "description": "Northeast India's premier cultural cinema theatre platform",
      "url": "https://hillypix.com",
      "logo": "https://hillypix.com/logo.png",
      "sameAs": [
        "https://twitter.com/hillypix",
        "https://facebook.com/hillypix"
      ],
      "areaServed": [
        "Assam", "Manipur", "Nagaland", "Meghalaya", 
        "Tripura", "Arunachal Pradesh", "Mizoram", "Sikkim"
      ],
      "knowsAbout": [
        "Northeast Indian Cinema",
        "Cultural Films",
        "Traditional Stories",
        "Regional Languages"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section - Theatre Entrance */}
        <Hero />
        
        {/* Now Premiering - Current Releases */}
        <NowPremiering />
        
        {/* Cultural Library - Film Collection */}
        <CulturalLibrary />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
