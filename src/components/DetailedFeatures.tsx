// Cache buster: v2.0.1
import { useEffect, useState, useRef } from "react";
import { Youtube, ArrowLeftRight, Check, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import PlanComparison from "@/components/PlanComparison";

// Phantom wallet types
declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      signTransaction: (transaction: any) => Promise<any>;
      publicKey: { toString: () => string };
    };
  }
}

// Custom Video Player Component
const VideoPlayer = ({ src, title, className = "" }: { src: string; title: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    console.log('Toggle play called, isPlaying:', isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(true);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowControls(false);
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    console.log('Right click detected, isPlaying:', isPlaying);
    e.preventDefault();
    e.stopPropagation();
    if (isPlaying && videoRef.current) {
      console.log('Pausing video via right click');
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    // Only handle left clicks for play/pause
    if (e.button === 0 && !isLoading) {
      console.log('Left click on video, toggling play');
      togglePlay();
    }
  };

  const handleLoadedData = () => {
    console.log('Video loaded');
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-2xl bg-gray-800 ${className}`}>
      <div className="relative w-full aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-contain cursor-pointer bg-black"
          onLoadedData={handleLoadedData}
          onPlay={() => {
            console.log('Video play event');
            setIsPlaying(true);
            setShowControls(false);
          }}
          onPause={() => {
            console.log('Video pause event');
            setIsPlaying(false);
            setShowControls(true);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setShowControls(true);
          }}
          onContextMenu={handleRightClick}
          onClick={handleVideoClick}
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play/Pause Button Overlay */}
        {showControls && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="pointer-events-auto cursor-pointer flex justify-center items-center relative text-[45px] select-none fill-white"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              <input 
                type="checkbox" 
                checked={isPlaying}
                onChange={() => {}}
                className="absolute opacity-0 cursor-pointer h-0 w-0"
              />
              
              {isLoading ? (
                <div className="w-11 h-11 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Play 
                    className={`absolute w-11 h-11 text-white transition-all duration-300 ${
                      isPlaying 
                        ? 'opacity-0 scale-50' 
                        : 'opacity-100 scale-100 animate-[fade-scale_0.3s_ease-out]'
                    }`}
                  />
                  <Pause 
                    className={`absolute w-11 h-11 text-white transition-all duration-300 ${
                      isPlaying 
                        ? 'opacity-100 scale-100 animate-[fade-scale_0.3s_ease-out]' 
                        : 'opacity-0 scale-50'
                    }`}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/80 via-emerald-500/40 to-transparent"></div>
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl"></div>
      <div className="absolute -top-2 -left-2 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
    </div>
  );
};

const DetailedFeatures = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  // Add Space Grotesk font to document head
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleSolanaPurchase = async () => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        alert('Phantom wallet not found! Please install Phantom wallet.');
        return;
      }

      const provider = window.solana;
      await provider.connect();
      
      const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = await import('@solana/web3.js');
      
      const connection = new Connection('https://api.devnet.solana.com');
      const fromPubkey = new PublicKey(provider.publicKey.toString());
      
      // Replace with your actual receiving wallet address
      const toPubkey = new PublicKey('H1Ea82JVSmczyM2BgyELMxQ4GfGtLx1Krn4hP7Nfep1p');
      
      const lamports = 0.1 * LAMPORTS_PER_SOL;
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        })
      );
      
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      transaction.feePayer = fromPubkey;
      
      const signedTransaction = await provider.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      
      console.log('Payment successful! Signature:', signature);
      alert('Payment successful! You purchased Cheater Solana');
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const leftImageOffset = Math.max(-120, -60 - (sliderPosition - 50) * 1.2);
  const rightImageOffset = Math.min(120, -60 + (sliderPosition - 50) * 1.2);

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Video Section */}
      <div id="features-section" className="relative z-10 w-full max-w-6xl mx-auto pt-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
          <span className="text-white">SEE </span> 
          <span className="bg-emerald-500 text-black px-4 py-1 inline-block transform -rotate-1 font-['JetBrains_Mono',monospace]">
            IT
          </span>
          <span className="text-white"> IN ACTION</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">Solution Generation</h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed font-coolvetica tracking-widest font-thin">
              Take screenshot of the problem and let Stealth Dev generate a solution for you with a step by step explanation.
            </p>
            <div className="text-emerald-400 text-sm font-['JetBrains_Mono',monospace]">
              Press <kbd className="bg-gray-800 px-2 py-1 rounded border border-emerald-500/30 mx-1">cmd + enter</kbd> to start solving
            </div>
          </div>

          <div className="lg:w-1/2">
            <VideoPlayer 
              src="https://github.com/ERPA-DEV/CIPHER-DEV/raw/3eb72c897de49c65367501821af6d384e8a1834a/solution_generation%20(1440p).mp4"
              title="Solution Generation"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Quote Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-24 px-6 py-16 border-t border-emerald-500/20">
        <div className="relative text-center">
          <div className="text-7xl text-emerald-500/20 font-serif absolute top-0 left-0 transform -translate-y-1/2">"</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-100 leading-relaxed max-w-4xl mx-auto px-8 font-coolvetica">
            Technical interviews have become a test of who can grind the most LeetCode, not who can solve real problems. Stealth Dev exists to flip the script—giving everyone a fair shot, not just the best grinders.
          </blockquote>
          <div className="text-7xl text-emerald-500/20 font-serif absolute bottom-0 right-0 transform translate-y-1/3">"</div>
        </div>
      </div>

      {/* Window Management Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-24 px-6 py-16 border-t border-emerald-500/20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">
              <span className="text-white">Window </span>
              <span className="bg-emerald-500 text-black px-4 py-1 inline-block transform -rotate-1 font-['JetBrains_Mono',monospace]">
                Management
              </span>
            </h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed font-coolvetica tracking-widest font-thin">
              Stealth Dev can be moved around your screen, and resized to your liking without interfering with your workflow.
            </p>
          </div>

          <div className="lg:w-1/2">
            <VideoPlayer 
              src="https://github.com/ERPA-DEV/CIPHER-DEV/raw/3eb72c897de49c65367501821af6d384e8a1834a/window-management%20(1).mp4"
              title="Window Management"
            />
          </div>
        </div>
      </div>

      {/* Multi-language Support Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-24 px-6 py-16 border-t border-emerald-500/20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">
              <span className="text-white">Multi-language </span>
              <span className="bg-emerald-500 text-black px-4 py-1 inline-block transform -rotate-1 font-['JetBrains_Mono',monospace]">
                Support
              </span>
            </h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed font-coolvetica tracking-widest font-thin">
              Stealth Dev supports a wide range of languages, including Python, Java, C++, and more.
            </p>
          </div>

          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
              <img 
                src="/lovable-uploads/211e38a0-96a1-4078-99c6-904a2ca85b47.png"
                alt="Multi-language support showing various programming language icons"
                className="w-full h-auto rounded-2xl"
              />
              
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/80 via-emerald-500/40 to-transparent"></div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Repository Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-24 px-6 py-16 border-t border-emerald-500/20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">
              <span className="text-white">Open </span>
              <span className="bg-emerald-500 text-black px-4 py-1 inline-block transform -rotate-1 font-['JetBrains_Mono',monospace]">
                Source
              </span>
            </h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed font-coolvetica tracking-widest font-thin">
              Stealth Dev is completely open source. Check out our GitHub repository to see how it works or contribute to the project.
            </p>
          </div>

          <div className="lg:w-1/2">
            <VideoPlayer 
              src="https://github.com/ERPA-DEV/CIPHER-DEV/raw/3eb72c897de49c65367501821af6d384e8a1834a/Open_source.mp4"
              title="Open Source"
            />
          </div>
        </div>
      </div>

      {/* Split Screen Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-24 px-6 py-16 border-t border-emerald-500/20">
        <h2 className="text-4xl font-bold text-center mb-10 tracking-tight">
          <span className="text-white">WORK </span> 
          <span className="bg-emerald-500 text-black px-4 py-1 inline-block transform -rotate-1 font-['JetBrains_Mono',monospace]">
            INVISIBLY
          </span>
        </h2>
        
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[500px] border rounded-xl overflow-hidden border-emerald-500/30 bg-gray-800/50"
          onLayout={(sizes) => setSliderPosition(sizes[0])}
        >
          <ResizablePanel defaultSize={50} className="relative">
            <div className="h-full flex flex-col justify-between p-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">All while being</h3>
                <p className="text-gray-400">(What you see)</p>
              </div>
              <div className="relative flex-1 flex items-center justify-center">
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 z-20 transition-all duration-200 ease-out"
                  style={{ right: `${leftImageOffset}px` }}
                >
                  <div className="relative rounded-lg overflow-hidden shadow-lg border border-emerald-500/30">
                    <img 
                      src="/lovable-uploads/e5a882ab-7d24-46f0-a26e-623611820b70.png"
                      alt="Document view showing debugging process"
                      className="max-h-[350px] object-contain"
                    />
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/80 via-emerald-500/40 to-transparent"></div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="w-2 bg-emerald-500/20 hover:bg-emerald-500/40 transition-colors cursor-col-resize">
            <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 rounded-full p-2 z-30 shadow-lg">
              <ArrowLeftRight className="h-4 w-4 text-black" />
            </div>
          </ResizableHandle>
          
          <ResizablePanel defaultSize={50} className="relative">
            <div className="h-full flex flex-col justify-between p-6">
              <div className="space-y-2 text-right">
                <h3 className="text-3xl font-bold">Entirely <span className="text-yellow-400">invisible</span></h3>
                <p className="text-gray-400">(What they see)</p>
              </div>
              <div className="relative flex-1 flex items-center justify-center">
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 z-20 transition-all duration-200 ease-out"
                  style={{ left: `${rightImageOffset}px` }}
                >
                  <div className="relative rounded-lg overflow-hidden shadow-lg border border-emerald-500/30">
                    <img 
                      src="/lovable-uploads/86999cac-8126-4954-b4cb-3ec08bae60d8.png"
                      alt="Code editor view showing clean interface"
                      className="max-h-[350px] object-contain"
                    />
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-500/80"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
        
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-coolvetica tracking-widest font-thin">
            Stealth Dev operates completely invisibly - your debugging companion works without revealing itself to observers,
            letting you focus on solving problems without drawing attention.
          </p>
        </div>
      </div>

      {/* Keyboard Shortcuts Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-24 px-6 py-16 border-t border-emerald-500/20">
        <h2 className="text-4xl font-bold text-center mb-6 tracking-tight">
          <span className="text-white">Keyboard </span>
          <span className="bg-emerald-500 text-black px-4 py-1 inline-block transform -rotate-1 font-['JetBrains_Mono',monospace]">
            Shortcuts
          </span>
        </h2>
        
        <p className="text-gray-300 text-lg text-center mb-10 max-w-3xl mx-auto font-coolvetica tracking-widest font-thin">
          Stealth Dev is designed to be as unobtrusive as possible. Here are the keyboard shortcuts you can use to control it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Start New Problem</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">R</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Open Settings</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">↑</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">I</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Take Screenshot</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">H</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Process Screenshots</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">↗</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Toggle Visibility</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">B</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Move Window</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">↑←↓→</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Decrease Opacity</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">[</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Increase Opacity</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">]</kbd>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-500/40 transition-colors">
            <h3 className="text-white font-semibold text-lg mb-4">Quit</h3>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">⌘</kbd>
              <span className="text-gray-400">+</span>
              <kbd className="bg-gray-700 px-3 py-2 rounded text-white text-sm font-mono">Q</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Comparison Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-24 px-6 py-16 border-t border-emerald-500/20">
        <h2 className="text-4xl font-bold text-center mb-6 tracking-tight">
          <span className="text-white">Choose Your </span>
          <span className="bg-emerald-500 text-black px-4 py-1 inline-block transform -rotate-1 font-['JetBrains_Mono',monospace]">
            Plan
          </span>
        </h2>
        
        <p className="text-gray-300 text-lg text-center mb-16 max-w-3xl mx-auto font-coolvetica">
          Whether you're just getting started or need advanced features for complex projects, we have the perfect plan for you.
        </p>

        {/* Pricing Cards Section */}
        <div className="flex flex-col lg:flex-row gap-4 mb-16 max-w-4xl mx-auto">
          {/* Rookie Plan */}
          <div className="bg-gray-800 rounded-xl p-6 lg:w-1/3 relative">
            <div className="text-center">
              <h3 className="text-white text-2xl font-bold font-pricing tracking-wide">Rookie</h3>
              <div className="text-white text-5xl font-extrabold font-pricing tracking-tight italic mb-2">Free</div>
              <p className="text-gray-400 text-sm mb-6 font-pricing italic">Forever free</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">Invisible overlay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">AI analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">Window management</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cheater Plan */}
          <div className="bg-gray-800 rounded-xl p-6 lg:w-1/3 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-emerald-400 text-black px-3 py-1 rounded-md text-xs font-bold font-pricing">
              COMING SOON
            </div>
            
            <div className="text-center">
              <h3 className="text-white text-2xl font-bold font-pricing tracking-wide italic mb-1">Cheater</h3>
              <div className="text-white text-5xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-tight mb-2">$19</div>
              <p className="text-gray-400 text-sm mb-6 font-pricing italic">All the features of Rookie, plus...</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">AI eye tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">Voice recognition</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">Context awareness</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cheater Solana Plan */}
          <div className="bg-gray-800 rounded-xl p-6 lg:w-1/3 relative">
            
            <div className="text-center">
              <h3 className="text-white text-2xl font-bold font-pricing tracking-wide italic mb-1">Cheater Solana</h3>
              <div className="text-white text-5xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-tight italic mb-2">0.1 SOL</div>
              <p className="text-gray-400 text-sm mb-6 font-pricing italic">Save money by paying with SOL</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">AI eye tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">Context awareness</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-white w-4 h-4" />
                  <span className="text-white text-sm font-pricing italic font-bold">Voice recognition</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleSolanaPurchase()}
                className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <PlanComparison />
      </div>
    </div>
  );
};

export default DetailedFeatures;
