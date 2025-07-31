
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 40);
      setGlitchIndex(randomIndex);
      
      setTimeout(() => {
        setGlitchIndex(null);
      }, 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToKeyboardShortcuts = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const headings = Array.from(document.querySelectorAll('h2'));
        const keyboardHeading = headings.find(h => h.textContent?.includes('Keyboard'));
        if (keyboardHeading) {
          keyboardHeading.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Find the Keyboard Shortcuts heading by text content
      const headings = Array.from(document.querySelectorAll('h2'));
      const keyboardHeading = headings.find(h => h.textContent?.includes('Keyboard'));
      if (keyboardHeading) {
        keyboardHeading.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToPricing = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const headings = Array.from(document.querySelectorAll('h2'));
        const pricingHeading = headings.find(h => h.textContent?.includes('Choose Your Plan'));
        if (pricingHeading) {
          pricingHeading.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Find the pricing heading by text content
      const headings = Array.from(document.querySelectorAll('h2'));
      const pricingHeading = headings.find(h => h.textContent?.includes('Choose Your Plan'));
      if (pricingHeading) {
        pricingHeading.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDocs = () => {
    console.log('Docs button clicked, navigating to /docs');
    navigate('/docs');
  };

  const handleDownload = () => {
    navigate('/download');
  };

  const handleTwitter = () => {
    window.open('https://x.com/StealthDevCo', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="bg-gray-900 border-b border-emerald-500/20 px-6 py-4 relative">
      {/* Grid Pattern for Navigation */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] opacity-30">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`border-r border-emerald-500/10 h-full transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] hover:shadow-emerald-500/60 group cursor-pointer relative overflow-hidden ${
              glitchIndex === i ? "animate-glitch" : ""
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-emerald-500/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/0 group-hover:bg-emerald-500/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 overflow-hidden">
            <img 
              src="/lovable-uploads/d8c3fbd4-b94c-4ec6-8088-4bc6d09d1da7.png" 
              alt="Stealth Dev Logo" 
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>
          <span className="text-white font-black text-2xl font-['JetBrains_Mono',monospace] tracking-tight relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-500 drop-shadow-[0_0_2px_rgba(16,185,129,0.5)]">STEALTH DEV</span>
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-500/30"></span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('features-section')}
            className="text-white hover:text-emerald-400 font-medium tracking-wide transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={scrollToKeyboardShortcuts}
            className="text-white hover:text-emerald-400 font-medium tracking-wide transition-colors cursor-pointer"
          >
            Shortcuts
          </button>
          <button 
            onClick={scrollToPricing}
            className="text-white hover:text-emerald-400 font-medium tracking-wide transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button 
            onClick={handleDocs}
            className="text-white hover:text-emerald-400 font-medium tracking-wide transition-colors cursor-pointer"
          >
            Docs
          </button>
          <button 
            onClick={handleTwitter}
            className="text-white hover:text-emerald-400 font-medium tracking-wide transition-colors cursor-pointer"
          >
            Twitter
          </button>
        </div>

        <Button 
          className="bg-emerald-500 text-black hover:bg-emerald-400 flex items-center space-x-2 font-medium"
          onClick={handleDownload}
        >
          <span>Download</span>
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto mt-2 text-center relative z-10">
        <div className="text-emerald-400 text-sm font-['JetBrains_Mono',monospace] ml-24">
          <span className="font-medium">VS Code Extension ID:</span> stealth-dev.live-coding-assistant
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
