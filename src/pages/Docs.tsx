import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
const Docs = () => {
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
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
  return <div className="min-h-screen bg-gray-900 text-white font-['Inter',sans-serif] relative overflow-hidden flex flex-col">
      {/* Site-wide Grid Background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(50,minmax(0,1fr))] opacity-20 pointer-events-none">
        {Array.from({
        length: 2000
      }).map((_, i) => <div key={i} className={`border-r border-b border-emerald-500/10 h-full transition-all duration-300 ${glitchIndex === i ? "animate-glitch" : ""}`} style={{
        backgroundColor: glitchIndex === i ? 'rgba(16, 185, 129, 0.2)' : 'transparent'
      }} />)}
      </div>

      {/* Site Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Navigation />
        
        <div className="flex-1 max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-500">
                Stealth Dev Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
              Your complete guide to mastering the Stealth Dev VS Code extension
            </p>
          </div>

          {/* Getting Started */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">Getting Started</h2>
            
            <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Installation</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Open VS Code</li>
                <li>Go to Extensions (Ctrl+Shift+X)</li>
                <li>Search for "stealth-dev.live-coding-assistant"</li>
                <li>Click Install</li>
                <li>Restart VS Code</li>
              </ol>
            </div>

            <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">First Launch</h3>
              <p className="text-gray-300 mb-4">
                After installation, press <kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+Shift+P</kbd> and type "Stealth Dev" to see available commands.
              </p>
              <p className="text-gray-300">
                The extension will activate automatically when you start coding.
              </p>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">Keyboard Shortcuts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Primary Actions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Start Solving</span>
                    <kbd className="bg-gray-700 px-2 py-1 rounded text-emerald-400">Cmd+Enter</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Quick Debug</span>
                    <kbd className="bg-gray-700 px-2 py-1 rounded text-emerald-400">Ctrl+D</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Hide/Show</span>
                    <kbd className="bg-gray-700 px-2 py-1 rounded text-emerald-400">Ctrl+H</kbd>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Advanced Controls</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Screenshot Mode</span>
                    <kbd className="bg-gray-700 px-2 py-1 rounded text-emerald-400">Ctrl+Shift+S</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Settings</span>
                    <kbd className="bg-gray-700 px-2 py-1 rounded text-emerald-400">Ctrl+,</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Toggle Stealth</span>
                    <kbd className="bg-gray-700 px-2 py-1 rounded text-emerald-400">Alt+S</kbd>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">Core Features</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Solution Generation</h3>
                <p className="text-gray-300 mb-4">
                  Take a screenshot of your coding problem and let Stealth Dev generate step-by-step solutions.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Automatic problem detection</li>
                  <li>Multiple solution approaches</li>
                  <li>Code optimization suggestions</li>
                  <li>Time and space complexity analysis</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Invisible Operation</h3>
                <p className="text-gray-300 mb-4">
                  Stealth Dev operates completely invisibly during interviews and coding sessions.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>No visible UI elements</li>
                  <li>Silent background operation</li>
                  <li>Undetectable by screen sharing</li>
                  <li>Quick toggle on/off</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Multi-Language Support</h3>
                <p className="text-gray-300 mb-4">
                  Full support for all major programming languages and frameworks.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-300">
                  <span>• Python</span>
                  <span>• JavaScript</span>
                  <span>• Java</span>
                  <span>• C++</span>
                  <span>• TypeScript</span>
                  <span>• Go</span>
                  <span>• Rust</span>
                  <span>• C#</span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Is Stealth Dev detectable during interviews?</h3>
                <p className="text-gray-300">
                  No, Stealth Dev is designed to be completely invisible. It doesn't show any UI elements and operates silently in the background.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How does the screenshot feature work?</h3>
                <p className="text-gray-300">
                  Simply press Cmd+Shift+S to capture your coding problem. Stealth Dev will analyze the image and provide solutions within seconds.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I customize the keyboard shortcuts?</h3>
                <p className="text-gray-300">
                  Yes, you can customize all keyboard shortcuts through VS Code's keyboard shortcuts settings (Ctrl+K Ctrl+S).
                </p>
              </div>

              <div className="bg-gray-800/50 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What if I need help during use?</h3>
                <p className="text-gray-300">
                  Join our Discord community or check our GitHub repository for support and community discussions.
                </p>
              </div>
            </div>
          </section>

          {/* Support */}
          
        </div>

        <Footer />
      </div>
    </div>;
};
export default Docs;