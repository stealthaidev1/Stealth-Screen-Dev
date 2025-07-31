
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Features = () => {
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  const features = [
    {
      title: "Real-Time Code Monitoring",
      description: "Continuously analyzes your code as you type, identifying potential issues before they become problems.",
      icon: "👁️"
    },
    {
      title: "Silent Debug Suggestions",
      description: "Quietly suggests debug strategies without interrupting your flow during coding sessions or interviews.",
      icon: "🤫"
    },
    {
      title: "Error Line Flagging",
      description: "Intelligently flags likely error lines and logic bugs with subtle visual indicators.",
      icon: "🚩"
    },
    {
      title: "VS Code Integration",
      description: "Seamless integration with VS Code and browser-based editors for a smooth development experience.",
      icon: "⚡"
    },
    {
      title: "Interview Mode",
      description: "Special stealth mode designed for coding interviews - helps without being obvious.",
      icon: "🎯"
    },
    {
      title: "Smart Debugging",
      description: "Advanced analysis provides context-aware debugging hints and best practices.",
      icon: "🧠"
    }
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={featuresRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            featuresVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to debug like a pro, whether you're coding solo or in an interview
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`bg-gray-800 border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:scale-105 cursor-pointer group ${
                featuresVisible ? `animate-fade-in-up animate-delay-${(index + 1) * 100}` : 'opacity-0 translate-y-10'
              }`}
            >
              <CardHeader>
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <CardTitle className="text-white font-semibold group-hover:text-emerald-400 transition-colors duration-300">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
