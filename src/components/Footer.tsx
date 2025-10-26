import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-background/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <div className="font-semibold text-foreground">PromptVerse</div>
          <div className="opacity-80">AI Image Prompt Gallery</div>
          <div className="opacity-60 mt-1">© {new Date().getFullYear()} PromptVerse</div>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <Link to="/privacy" className="hover:text-primary">Privacy</Link>
          <Link to="/terms" className="hover:text-primary">Terms</Link>
          <Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

