import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import ModeToggle from "@/components/ModeToggle";

const Header = () => {
  return (
    <header className="glass-panel border-b border-white/10 bg-background/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">
            PromptVerse
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <Link to="/terms" className="text-foreground hover:text-primary transition-colors">
            Terms
          </Link>
          <Link to="/privacy" className="text-foreground hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link to="/disclaimer" className="text-foreground hover:text-primary transition-colors">
            Disclaimer
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
