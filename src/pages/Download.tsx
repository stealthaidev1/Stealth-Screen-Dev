
import { Button } from "@/components/ui/button";
import { Download, Monitor, Apple, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const DownloadPage = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      description: "Text copied!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16 px-4 py-4">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 font-coolvetica leading-[1.1] tracking-tight">
            Download{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-500">
              Stealth Dev
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your platform and follow the instructions to get started with Stealth Dev.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Windows */}
          <div className="bg-gray-800/50 border border-emerald-500/30 rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <img src="/lovable-uploads/aed1709c-52b3-4b92-a3a4-c2748eaed0f7.png" alt="Windows" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 font-coolvetica">Windows</h3>
                <p className="text-gray-400">Download for Windows 10/11</p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-emerald-500 text-black hover:bg-emerald-400 mb-4 h-12 text-lg font-black"
              onClick={() => window.open('https://f005.backblazeb2.com/file/Cipher-assets/Stealthdev.Setup.1.2.1', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download .exe
            </Button>
            
            <div className="text-sm text-gray-400">
              <p>• Windows 10 or later required</p>
              <p>• 64-bit architecture supported</p>
              <p>• Automatic updates included</p>
            </div>
          </div>

          {/* Mac */}
          <div className="bg-gray-800/50 border border-emerald-500/30 rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-500/20 rounded-lg flex items-center justify-center border border-gray-500/30">
                <img src="/lovable-uploads/9d057450-9fd4-4b4a-a709-bf43b3a03d23.png" alt="Mac" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 font-coolvetica">Mac</h3>
                <p className="text-gray-400">Download for macOS (Intel & Apple Silicon)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button 
                className="bg-emerald-500 text-black hover:bg-emerald-400 h-12 font-black"
                onClick={() => window.open('https://f005.backblazeb2.com/file/Cipher-assets/Stealthdev-1.2.0.dmg', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download .dmg (Intel)
              </Button>
              <Button 
                className="bg-emerald-500 text-black hover:bg-emerald-400 h-12 font-black"
                onClick={() => window.open('https://f005.backblazeb2.com/file/Cipher-assets/Stealthdev-1.2.0-arm64.dmg', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download .dmg (ARM)
              </Button>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>• macOS 11.0 or later required</p>
              <p>• Both Intel and Apple Silicon supported</p>
              <p>• Universal binary available</p>
            </div>
          </div>
        </div>

        {/* Installation Notes for Mac */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-yellow-400 text-sm font-bold">!</span>
            </div>
            <div className="flex-1">
              <h4 className="text-yellow-400 font-bold mb-2 font-coolvetica">Note for Mac users:</h4>
              <p className="text-gray-300 mb-3">
                After installing, run the following command in Terminal to remove the "app is damaged and can't be opened" warning:
              </p>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-3">
                <code className="text-emerald-400 font-['JetBrains_Mono',monospace] text-sm">
                  xattr -c /Applications/StealthDev.app
                </code>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard("xattr -c /Applications/StealthDev.app")} className="ml-2 h-6 px-2 text-emerald-400 hover:bg-emerald-500/10">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-gray-400 text-sm">
                Still seeing "macOS cannot verify that this app is free from malware"? Open System Settings, click Privacy & Security, 
                scroll down and click the <strong>Open Anyway</strong> button to confirm your intent to open or install the app.{" "}
                <a href="https://macpaw.com/how-to/fix-macos-cannot-verify-that-app-is-free-from-malware" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">
                  Learn more →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default DownloadPage;
