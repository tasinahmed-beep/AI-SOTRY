import { Link, useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Seo title="404 – Page Not Found | PromptVerse" description="The page you are looking for does not exist on PromptVerse." />
      <div className="text-center bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-sm">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;




