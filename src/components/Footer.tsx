
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-500 text-black py-4 px-6 relative overflow-hidden">
      {/* Background grid pattern for footer */}
      <div className="absolute inset-0 grid grid-cols-[repeat(50,minmax(0,1fr))] opacity-20">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="border-r border-black/10 h-full"
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/d8c3fbd4-b94c-4ec6-8088-4bc6d09d1da7.png" 
              alt="Stealth Dev Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-black font-black text-lg font-['JetBrains_Mono',monospace] tracking-tight">
            STEALTH DEV
          </span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a 
            href="https://x.com/stealthdevco" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-gray-800 font-medium transition-colors"
          >
            Twitter
          </a>
        </div>

        <div className="text-black text-sm font-medium">
          © 2025 Stealth Dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
