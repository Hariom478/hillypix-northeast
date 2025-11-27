import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Premieres from "./pages/Premieres";
import TVSeries from "./pages/TVSeries";
import Music from "./pages/Music";
import HillywoodFiesta from "./pages/HillywoodFiesta";
import HallOfFamePage from "./pages/HallOfFamePage";
import MyLibrary from "./pages/MyLibrary";
import AllHonorees from "./pages/AllHonorees";
import AboutUs from "./pages/AboutUs";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import DetailsPage from "./pages/Details";
import RefundCancellation from "./pages/refundcancellation";
import Faq from "./pages/Faq";
import HelpCenter from "./pages/HelpCenter";
import Termsofuse from "./pages/Termsofuse";
import TermAndConditionPage from "./pages/term-and-condition";
import HillypixObtain from "./pages/hillypix-obtain";
import PrivacyPolicy from "./pages/Privacy-policy";
import ContactUs from "./pages/ContactUs";
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
       <AuthProvider>   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/premieres" element={<Premieres />} />
          <Route path="/tv-series" element={<TVSeries />} />
          <Route path="/details" element= {<DetailsPage />} />
          <Route path="/music" element={<Music />} />
          <Route path="/hillywood-fiesta" element={<HillywoodFiesta />} />
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/all-honorees" element={<AllHonorees />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/refund-cancellation" element={<RefundCancellation />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/terms-use" element={<Termsofuse />} />          
          <Route path="/terms-and-conditions" element={<TermAndConditionPage />} />          
          <Route path="/hillypix-obtain" element={<HillypixObtain />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/watch" element={<VideoPlayerPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
