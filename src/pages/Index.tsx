
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DetailedFeatures from "@/components/DetailedFeatures";

import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const Index = () => {
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Add Vimeo player script
    const vimeoScript = document.createElement('script');
    vimeoScript.src = 'https://player.vimeo.com/api/player.js';
    vimeoScript.async = true;
    document.head.appendChild(vimeoScript);
    
    return () => {
      document.head.removeChild(link);
      if (document.head.contains(vimeoScript)) {
        document.head.removeChild(vimeoScript);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 2000);
      setGlitchIndex(randomIndex);
      
      setTimeout(() => {
        setGlitchIndex(null);
      }, 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Inter',sans-serif] relative overflow-hidden flex flex-col">
      {/* Site-wide Grid Background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(50,minmax(0,1fr))] opacity-20 pointer-events-none">
        {Array.from({ length: 2000 }).map((_, i) => (
          <div
            key={i}
            className={`border-r border-b border-emerald-500/10 h-full transition-all duration-300 ${
              glitchIndex === i ? "animate-glitch" : ""
            }`}
            style={{
              backgroundColor: glitchIndex === i ? 'rgba(16, 185, 129, 0.2)' : 'transparent'
            }}
          />
        ))}
      </div>

      {/* Site Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Navigation />
        <div className="flex-1">
          <Hero />
          <DetailedFeatures />
          
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
