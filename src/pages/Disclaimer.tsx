import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Disclaimer – PromptVerse"
        description="Important notices about AI-generated content, third-party services, and limitations of warranties on PromptVerse."
      />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-panel space-y-8 bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-sm">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Disclaimer</h1>
            <p className="text-muted-foreground">Last updated: October 26, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">1. General Information</h2>
              <p className="text-muted-foreground">
                Content on PromptVerse is provided for informational and educational purposes. While
                we strive for accuracy, we make no guarantees and accept no responsibility for
                errors or omissions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">2. AI‑Generated Content</h2>
              <p className="text-muted-foreground">
                Images shown are AI‑generated examples. Results depend on the model, parameters,
                and platform; your results may vary.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">3. Third‑Party Services</h2>
              <p className="text-muted-foreground">
                We are not responsible for the availability, terms, or policies of any third‑party
                tools or platforms referenced.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Disclaimer;


