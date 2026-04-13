
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tarot from "./pages/Tarot";
import Certificate from "./pages/Certificate";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Tradition from "./pages/Tradition";
import Regeneration from "./pages/Regeneration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tarot" element={<Tarot />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<ShopCategory />} />
          <Route path="/tradition" element={<Tradition />} />
          <Route path="/regeneration" element={<Regeneration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;