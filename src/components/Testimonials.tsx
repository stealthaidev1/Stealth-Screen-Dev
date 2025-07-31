
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Testimonials = () => {
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();

  const testimonials = [
    {
      quote: "Stealth Dev saved me during a crucial coding interview. The subtle hints helped me catch errors without anyone noticing.",
      author: "Alex K.",
      company: "Software Engineer"
    },
    {
      quote: "I've improved my debugging skills tremendously since using this tool. It's like having a mentor watching over your code.",
      author: "Sarah M.",
      company: "Senior Developer"
    },
    {
      quote: "The VS Code integration is seamless. It's become an essential part of my daily coding workflow.",
      author: "Marcus L.",
      company: "Full Stack Developer"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={testimonialsRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            testimonialsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Developer Success Stories</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            See how Stealth Dev is helping developers ace their interviews and debug with confidence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card 
              key={index} 
              className={`bg-gray-700 border-gray-600 transition-all duration-1000 ${
                testimonialsVisible ? `animate-fade-in-up animate-delay-${(index + 1) * 200}` : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="pt-6">
                <div className="text-emerald-400 text-4xl mb-4 font-['JetBrains_Mono',monospace]">"</div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">{item.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
                    {item.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white">{item.author}</p>
                    <p className="text-sm text-gray-400">{item.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
