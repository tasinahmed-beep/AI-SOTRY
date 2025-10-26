import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface HeroProps {
  onSearch: (query: string) => void;
  popularTags?: string[];
}

const Hero = ({ onSearch, popularTags }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const fallbackTags = [
    "ice", "fire", "sword", "warrior", "dragon", 
    "landscape", "portrait", "magic", "battle", "female"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    onSearch(tag);
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Discover Amazing{" "}
            <span className="text-primary relative inline-block">
              AI Prompts
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50 5 100 2 150 5C200 8 250 5 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Curated collection of high-quality prompts for AI image generation
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.15s" }}>
            PromptVerse is a human‑curated gallery of AI image prompts designed to help you get reliable,
            repeatable results. Each entry includes a clear positive and negative prompt, style information,
            suggested size, and helpful tags, so you can quickly copy, tweak, and learn what makes a strong
            prompt. Use search to filter by subject, mood, or technique, then open an item to view the full
            details and related images. New prompts are added regularly to keep the collection fresh and
            useful for creators of all levels across portrait and landscape compositions.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="glass-panel relative flex items-center gap-2 bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl 
            shadow-sm hover:shadow-xl focus-within:shadow-2xl focus-within:border-primary 
            transition-all duration-300 p-2 group">
            <Search className="w-5 h-5 text-muted-foreground ml-2 group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts (e.g., ice, fire, warrior)"
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent"
            />
            <Button 
              type="submit" 
              className="rounded-xl px-8 bg-gradient-to-r from-primary to-accent hover:shadow-lg 
                hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Popular Tags */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Popular Keywords:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {(popularTags && popularTags.length ? popularTags : fallbackTags).map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                onClick={() => handleTagClick(tag)}
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground 
                  transition-all duration-300 hover:scale-110 animate-scale-in text-sm px-4 py-1.5"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
