import { Brain, Database, Target, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Our AI is trained on millions of verified real and fake news articles from trusted sources.",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Advanced NLP algorithms analyze text patterns, writing style, and linguistic features.",
  },
  {
    icon: Target,
    title: "Pattern Detection",
    description: "The model identifies suspicious patterns and indicators commonly found in misinformation.",
  },
  {
    icon: Shield,
    title: "Verification",
    description: "Get instant results with confidence scores to help you make informed decisions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="bg-gradient-hero bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system uses advanced machine learning to detect fake news with high accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-in border-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
