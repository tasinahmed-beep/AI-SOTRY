import Header from "@/components/Header";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Contact – PromptVerse" description="Get in touch with the PromptVerse team." />
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="glass-panel bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-sm space-y-6">
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="text-muted-foreground">
            Have questions, feedback, or partnership inquiries? We'd love to hear from you.
          </p>
          <div className="space-y-2 text-sm">
            <div>
              Email: <a href="mailto:hello@example.com" className="underline">hello@example.com</a>
            </div>
            <div>
              X/Twitter: <a href="#" className="underline">@promptverse</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

