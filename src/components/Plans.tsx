import { Check, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Phantom wallet types
declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{
        publicKey: {
          toString: () => string;
        };
      }>;
      signTransaction: (transaction: any) => Promise<any>;
      publicKey: {
        toString: () => string;
      };
    };
  }
}
const Plans = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const plans = [{
    name: "Solana Cheater Pack",
    price: "0.1",
    icon: Zap,
    features: ["Basic cheats & hacks", "Standard support", "Monthly updates", "Basic tutorials", "5 game exploits", "Community access"],
    popular: false,
    gradient: "from-emerald-500/20 to-cyan-500/20"
  }, {
    name: "Pro Cheater Pack",
    price: "0.3",
    icon: Crown,
    features: ["All basic features", "Advanced cheats & exploits", "Priority support", "Weekly updates", "15+ game exploits", "Exclusive techniques", "Direct dev access", "Custom configurations", "Private Discord channel"],
    popular: true,
    gradient: "from-purple-500/20 to-pink-500/20"
  }];
  const handlePurchase = async (planName: string, price: string) => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        alert('Phantom wallet not found! Please install Phantom wallet.');
        return;
      }
      const provider = window.solana;
      await provider.connect();
      const {
        Connection,
        PublicKey,
        Transaction,
        SystemProgram,
        LAMPORTS_PER_SOL
      } = await import('@solana/web3.js');
      const connection = new Connection('https://api.devnet.solana.com');
      const fromPubkey = new PublicKey(provider.publicKey.toString());

      // Replace with your actual receiving wallet address
      const toPubkey = new PublicKey('H1Ea82JVSmczyM2BgyELMxQ4GfGtLx1Krn4hP7Nfep1p');
      const lamports = parseFloat(price) * LAMPORTS_PER_SOL;
      const transaction = new Transaction().add(SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports
      }));
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      transaction.feePayer = fromPubkey;
      const signedTransaction = await provider.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      console.log('Payment successful! Signature:', signature);
      alert(`Payment successful! You purchased ${planName}`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };
  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Power Level
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock the ultimate gaming advantage with our premium cheat packs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name}
                className={`relative overflow-hidden bg-gradient-to-br ${plan.gradient} border border-gray-700/50 backdrop-blur-sm transition-all duration-1000 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-emerald-400 mb-2">
                    {plan.price} SOL
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handlePurchase(plan.name, plan.price)}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                        : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600'
                    } text-white border-0`}
                  >
                    Purchase with Phantom
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Plans;