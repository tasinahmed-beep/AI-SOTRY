import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Sparkles, Target, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="About – PromptVerse" description="Learn about PromptVerse, a curated gallery of AI image prompts with detailed metadata to inspire your creations." />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-panel space-y-8 bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-sm">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">About PromptVerse</h1>
            <p className="text-xl text-muted-foreground">Your destination for high‑quality AI image generation prompts</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              PromptVerse is a curated collection of AI image generation prompts designed to inspire artists,
              designers, and AI enthusiasts. We focus on clarity, quality, and predictable results across
              popular styles.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Each entry includes a concise positive prompt, a scoped negative prompt, and context like style,
              suggested size, and helpful tags. Our goal is to reduce trial‑and‑error and make it easier to
              learn why a prompt works, so you can adapt it for portraits, landscapes, cinematic scenes, and
              stylized illustration.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We regularly expand the gallery with new subjects and refine existing entries for clarity and
              reproducibility. If you have suggestions or want to collaborate, we’d love to hear from you via
              the Contact page.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Curated Collection</h3>
              <p className="text-muted-foreground">Hand‑picked prompts that deliver exceptional results across generators.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Detailed Metadata</h3>
              <p className="text-muted-foreground">Positive/negative prompts and key parameters included for each item.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Copy Friendly</h3>
              <p className="text-muted-foreground">Copy prompts with one click and start creating immediately.</p>
            </div>
          </div>

          <div className="bg-muted rounded-xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe great AI art starts with great prompts. Our mission is to make high‑quality prompts
              accessible to everyone, from beginners to professionals.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

