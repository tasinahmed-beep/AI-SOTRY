import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Privacy Policy – PromptVerse" description="Understand how PromptVerse handles data, cookies, Google AdSense, and third-party services to protect your privacy." />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-panel space-y-8 bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-sm">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: October 26, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect minimal information necessary to operate and improve this site. This may include
                basic analytics (e.g., page views, referring pages, device/browser types) and information you
                voluntarily provide if you contact us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Advertising (Google AdSense)</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may display ads served by Google AdSense or other partners. These partners may use cookies
                and similar technologies to show personalized or non‑personalized ads based on your visit
                to this and other websites. Learn how Google uses data from partners here:
                <a className="underline ml-1" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
                  https://policies.google.com/technologies/partner-sites
                </a>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You can manage ad personalization preferences via our cookie consent banner or by visiting Google’s
                Ad Settings:
                <a className="underline ml-1" href="https://adssettings.google.com" target="_blank" rel="noreferrer">https://adssettings.google.com</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Cookies & Consent</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use a simple cookie banner to capture consent for analytics and ad personalization where required.
                You may accept or reject cookies; your choice will be saved in your browser.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about this policy, email us at
                <a className="underline ml-1" href="mailto:hello@example.com">hello@example.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;


