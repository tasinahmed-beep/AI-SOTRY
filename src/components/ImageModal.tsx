import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, X, Sparkles } from "lucide-react";
import { ImageData } from "./ImageGrid";
import RelatedImages from "@/components/RelatedImages";
import { useToast } from "@/hooks/use-toast";

interface ImageModalProps {
  image: ImageData;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Downloaded!",
      description: "Image saved to your device",
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl sm:rounded-2xl animate-scale-in">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          title="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-background/60 backdrop-blur-sm p-2.5 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg border border-border"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Section */}
          <div className={`relative rounded-xl overflow-hidden bg-muted/50 shadow-2xl animate-fade-in ${
            image.orientation === "landscape" ? "aspect-video" : "aspect-[5/7]"
          }`}>
            <img
              src={image.src}
              srcSet={image.srcSet}
              alt={image.title}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
                {image.aspectRatio}
              </Badge>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div>
              <DialogTitle className="text-3xl font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                {image.title}
              </DialogTitle>
              {image.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {image.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Prompt Section */}
              <div className="glass-panel bg-background/40 backdrop-blur-sm rounded-xl p-5 border border-white/10 
                hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Prompt
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(image.prompt, "Prompt")}
                    aria-label="Copy prompt"
                    className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-h-32 overflow-y-auto 
                  custom-scrollbar">
                  {image.prompt}
                </p>
              </div>

              {/* Negative Prompt Section */}
              <div className="glass-panel bg-background/40 backdrop-blur-sm rounded-xl p-5 border border-white/10 
                hover:border-destructive/40 transition-all duration-300 hover:shadow-lg group">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive"></span>
                    Negative Prompt
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(image.negativePrompt, "Negative prompt")}
                    aria-label="Copy negative prompt"
                    className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-h-24 overflow-y-auto 
                  custom-scrollbar">
                  {image.negativePrompt}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-primary/40 
                  transition-all duration-300 hover:shadow-md">
                  <span className="text-xs text-muted-foreground block mb-1">Style</span>
                  <span className="font-semibold text-sm">{image.style}</span>
                </div>
                <div className="glass-panel bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-primary/40 
                  transition-all duration-300 hover:shadow-md">
                  <span className="text-xs text-muted-foreground block mb-1">Aspect Ratio</span>
                  <span className="font-semibold text-sm">{image.aspectRatio}</span>
                </div>
                <div className="glass-panel bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-primary/40 
                  transition-all duration-300 hover:shadow-md col-span-2">
                  <span className="text-xs text-muted-foreground block mb-1">Size</span>
                  <span className="font-semibold text-sm">{image.size}</span>
                </div>
              </div>

              {/* Download Button */}
              <Button 
                onClick={handleDownload} 
                aria-label="Download image"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent 
                  hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02]
                  group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"></span>
                <Download className="w-5 h-5 mr-2 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">Download Image</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <RelatedImages current={image} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
