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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/premieres" element={<Premieres />} />
          <Route path="/tv-series" element={<TVSeries />} />
          <Route path="/music" element={<Music />} />
          <Route path="/hillywood-fiesta" element={<HillywoodFiesta />} />
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/all-honorees" element={<AllHonorees />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
