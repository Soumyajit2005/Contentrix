import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Sparkles className="h-12 w-12 text-yellow-400 animate-spin-slow" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              RepurposePie
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your content into platform-perfect posts in seconds.
            <span className="text-yellow-400 font-semibold">
              {" "}
              Save hours of work
            </span>{" "}
            with AI-powered repurposing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onGetStarted}
              size="xl"
              className="flex items-center gap-2"
            >
              Start Repurposing <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                AI-Powered
              </div>
              <div className="text-gray-300">Intelligent content adaptation</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-yellow-400 mb-2">10+</div>
              <div className="text-gray-300">Platform formats supported</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-yellow-400 mb-2">Fast</div>
              <div className="text-gray-300">Content ready in seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
