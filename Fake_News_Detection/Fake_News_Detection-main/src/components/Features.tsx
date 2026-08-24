import { Shield, Zap, TrendingUp, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant results in seconds. Our optimized AI model processes articles at incredible speed.",
  },
  {
    icon: Shield,
    title: "Highly Accurate",
    description: "Trained on millions of articles, our model delivers reliable and precise verification results.",
  },
  {
    icon: TrendingUp,
    title: "Constantly Improving",
    description: "Our AI learns and adapts to new misinformation patterns, staying ahead of fake news tactics.",
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    description: "Your data is never stored or shared. All analysis happens securely and privately.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Our <span className="bg-gradient-hero bg-clip-text text-transparent">Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology meets user-friendly design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-card border-2 hover:border-primary transition-all duration-300 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
