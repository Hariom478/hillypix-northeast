import { useState,useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
 const { state } = useLocation();
 const navigate = useNavigate();
 const movie = state?.videos;


      return (
        <div className="min-h-screen bg-background">
          <Header />
          

    
          {/* Footer */}
          <Footer />
        </div>
      );

};

export default Details;