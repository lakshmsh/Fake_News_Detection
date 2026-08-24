import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2, ShieldAlert, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  prediction: "FAKE" | "REAL";
  confidence: number;
  reasoning: string;
  indicators: string[];
  recommendations: string;
}

const AnalysisForm = () => {
  const [newsText, setNewsText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeNews = async () => {
    if (!newsText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some news text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-news', {
        body: { newsText }
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Analysis Complete",
        description: `The news appears to be ${data.prediction === "FAKE" ? 'fake' : 'real'}.`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze news. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setNewsText("");
    setResult(null);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-card border-2 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Analyze News Article
            </CardTitle>
            <CardDescription className="text-lg">
              Paste any news article or headline below to verify its authenticity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="news-input" className="text-sm font-medium">
                News Text
              </label>
              <Textarea
                id="news-input"
                placeholder="Enter or paste the news article, headline, or claim you want to verify..."
                className="min-h-[200px] text-base resize-none focus-visible:ring-primary"
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                disabled={isAnalyzing}
              />
              <p className="text-xs text-muted-foreground">
                {newsText.length} characters
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={analyzeNews}
                disabled={isAnalyzing || !newsText.trim()}
                className="flex-1 h-12 text-lg font-semibold bg-gradient-hero hover:opacity-90 transition-opacity"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze News"
                )}
              </Button>
              {(newsText || result) && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="h-12"
                  disabled={isAnalyzing}
                >
                  Reset
                </Button>
              )}
            </div>

            {result && (
              <div className="space-y-4 animate-scale-in">
                <div
                  className={`p-6 rounded-lg border-2 ${
                    result.prediction === "FAKE"
                      ? "bg-destructive/10 border-destructive"
                      : "bg-success/10 border-success"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {result.prediction === "FAKE" ? (
                      <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    ) : (
                      <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        {result.prediction === "FAKE" ? "Likely Fake News" : "Likely Real News"}
                      </h3>
                      <p className="text-base mb-4">{result.reasoning}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Confidence Level</span>
                          <span className="font-bold">{result.confidence}%</span>
                        </div>
                        <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              result.prediction === "FAKE" ? "bg-destructive" : "bg-success"
                            }`}
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {result.indicators.length > 0 && (
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" />
                        Key Indicators Detected
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.indicators.map((indicator, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{result.recommendations}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AnalysisForm;
