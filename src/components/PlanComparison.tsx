
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PlanComparison = () => {
  const { ref: planRef, isVisible: planVisible } = useScrollAnimation();

  const features = [
    { name: "Stealth Mode", free: true, cheater: true },
    { name: "Smart Capture", free: true, cheater: true },
    { name: "AI Brainpower", free: true, cheater: true },
    { name: "Solution Insights", free: true, cheater: true },
    { name: "Intelligent Debugging", free: true, cheater: true },
    { name: "Flexible Window", free: true, cheater: true },
    { name: "AI Eye Tracking (Coming Soon)", free: false, cheater: true },
    { name: "Voice Recognition (Coming Soon)", free: false, cheater: true },
    { name: "Context Awareness (Coming Soon)", free: false, cheater: true },
  ];

  return (
    <section className="py-16 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={planRef}
          className={`text-4xl font-bold text-center text-white mb-12 transition-all duration-1000 ${
            planVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          Compare plans
        </h2>
        
        <Card 
          className={`bg-gray-900/80 border-gray-700 backdrop-blur-sm transition-all duration-1000 ${
            planVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0 translate-y-10'
          }`}
        >
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300 font-medium py-6 px-6">
                    Plans
                  </TableHead>
                  <TableHead className="text-center text-white font-semibold py-6">
                    Free
                  </TableHead>
                  <TableHead className="text-center text-white font-semibold py-6">
                    Cheater
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature, index) => (
                  <TableRow key={index} className="border-gray-700">
                    <TableCell className="text-gray-300 py-4 px-6">
                      {feature.name}
                    </TableCell>
                    <TableCell className="text-center py-4">
                      {feature.free ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center py-4">
                      {feature.cheater ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PlanComparison;
