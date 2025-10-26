import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent"; // values: accepted | rejected

export function getCookieConsent(): "accepted" | "rejected" | null {
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "accepted" || v === "rejected") return v;
  return null;
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = getCookieConsent();
      setVisible(!v);
    } catch {
      // localStorage might be blocked
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch {}
    setVisible(false);
  };
  const reject = () => {
    try { localStorage.setItem(STORAGE_KEY, "rejected"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="glass-panel mx-auto max-w-3xl rounded-2xl border border-white/10 bg-background/90 p-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <p className="text-sm text-muted-foreground flex-1">
            We use cookies and similar technologies to analyze traffic and, after approval, to support ad personalization (e.g., Google AdSense). See our <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={reject} aria-label="Reject cookies">
              Reject
            </Button>
            <Button size="sm" onClick={accept} aria-label="Accept cookies">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

