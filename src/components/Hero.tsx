
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [glitchIndices, setGlitchIndices] = useState<number[]>([]);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const numGlitches = Math.floor(Math.random() * 25) + 35;
      const newIndices = Array.from({ length: numGlitches }, () => 
        Math.floor(Math.random() * 1600)
      );
      
      setGlitchIndices(newIndices);
      
      setTimeout(() => {
        setGlitchIndices([]);
      }, 120);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const handleSeeFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}>
          {Array.from({ length: 1600 }).map((_, i) => {
            const row = Math.floor(i / 40);
            const col = i % 40;
            return (
              <div
                key={i}
                className={`absolute w-10 h-10 hover:bg-emerald-500/30 hover:border hover:border-emerald-500/60 hover:shadow-[0_0_20px_5px_rgba(16,185,129,0.7)] hover:shadow-emerald-500/70 hover:scale-105 group cursor-pointer relative overflow-hidden ${
                  glitchIndices.includes(i) ? "animate-glitch" : ""
                }`}
                style={{
                  left: `${col * 40}px`,
                  top: `${row * 40}px`
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-emerald-500/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/0 group-hover:bg-emerald-500/70 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/0 group-hover:bg-emerald-500/50 transform scale-x-0 group-hover:scale-x-100 origin-right"></div>
                <div className="absolute top-0 left-0 w-[2px] h-full bg-emerald-500/0 group-hover:bg-emerald-500/50 transform scale-y-0 group-hover:scale-y-100 origin-bottom"></div>
                <div className="absolute top-0 right-0 w-[2px] h-full bg-emerald-500/0 group-hover:bg-emerald-500/50 transform scale-y-0 group-hover:scale-y-100 origin-top"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div 
        ref={heroRef}
        className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${
          heroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Your Secret
          <div className="bg-emerald-500 text-black px-6 py-2 inline-block mt-2 transform -rotate-1 font-['JetBrains_Mono',monospace]">
            Debugging Edge
          </div>
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-coolvetica">
          <span className="line-through text-gray-600">Debug</span> <span className="text-emerald-400 font-semibold">Ace</span> your coding sessions and interviews with our powerful debugging toolkit
        </p>

        <div className="flex justify-center gap-4">
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-3 text-lg"
            onClick={handleSeeFeatures}
          >
            See Features
          </Button>
          <Button 
            variant="animated"
            className="px-8 py-3 text-lg"
            onClick={() => navigate('/download')}
          >
            <Download className="mr-2 h-5 w-5" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
