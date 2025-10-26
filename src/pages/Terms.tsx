import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Terms of Service – PromptVerse"
        description="Read PromptVerse's Terms of Service covering acceptable use, intellectual property, and limitations of liability."
      />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-panel space-y-8 bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-sm">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: October 26, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using PromptVerse, you agree to be bound by these Terms of Service. If you
                do not agree, please refrain from using the site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">2. Use of Service</h2>
              <p className="text-muted-foreground">
                PromptVerse provides AI image generation prompts for inspiration and educational purposes.
                You are responsible for your use and compliance with applicable laws and third‑party terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The site content and layout are protected by applicable IP laws. Prompts may be freely used
                for generating images unless otherwise stated.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">4. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                The service is provided "as is" without warranties of any kind. Prompt results vary by model,
                parameters, and platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, PromptVerse shall not be liable for any indirect,
                incidental, special, or consequential damages arising from your use of the site.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;


