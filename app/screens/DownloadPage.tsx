
import { ArrowDownToLine, Apple, ExternalLink, ShieldCheck, Smartphone } from "lucide-react";

function DownloadPage() {
  const androidSteps = [
    'Tap "Download APK" to start downloading the app directly.',
    'If Android warns about unknown sources, allow installs from your browser.',
    'Open the file after download and finish the install prompt.',
  ];

  const iosSteps = [
    'Click "Open Web App" to access Asaan Taqreeb directly on iOS.',
    'Optionally tap "Share" and select "Add to Home Screen".',
    'Enjoy live access to all features on your iPhone.',
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-waterloo px-6 py-10 text-white shadow-[0_32px_120px_rgba(0,0,0,0.35)] sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,240,186,0.08),transparent_30%)]" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-pregold/30 bg-pregold/10 px-4 py-2 text-sm font-semibold text-colonial">
            <ArrowDownToLine size={16} />
            Download Center
          </p>
          <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-colonial sm:text-4xl lg:text-5xl">
            Har Taqreeb Ki Tayyari, Ab Aap Ke Haath Mein
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            Download the official Asaan Taqreeb app to connect directly with premium local banquets, caterers, salons, and photographers across Pakistan. No broker cuts. Full transparency.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pregold/15 text-pregold">
                <Smartphone size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-colonial">Download for Android</h3>
                <p className="mt-1 text-sm text-white/65">APK sideload build for direct installation.</p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/75">
              Because this build is distributed manually and is not yet published on the Play Store, Android may show a Play Protect or unknown sources warning during install.
            </p>

            <div className="mt-6 space-y-3">
              {androidSteps.map((step) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-waterloo/70 px-4 py-3 text-sm text-white/80">
                  <ShieldCheck className="mt-0.5 shrink-0 text-pregold" size={18} />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/Asaan-Taqreeb/Asaan-Taqreeb-App/releases/download/build-18/asaantaqreeb.apk"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pregold px-5 py-3 text-sm font-bold text-waterloo transition-transform duration-200 hover:-translate-y-0.5"
              >
                <ArrowDownToLine size={16} />
                Download APK
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pregold/15 text-pregold">
                <Apple size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-colonial">Download for iOS</h3>
                <p className="mt-1 text-sm text-white/65">Web App for direct browser access.</p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/75">
              Since App Store review is in progress, iPhone users can access the full features directly via the live Web App version.
            </p>

            <div className="mt-6 space-y-3">
              {iosSteps.map((step) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-waterloo/70 px-4 py-3 text-sm text-white/80">
                  <ShieldCheck className="mt-0.5 shrink-0 text-pregold" size={18} />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://asaan-taqreeb.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-colonial px-5 py-3 text-sm font-bold text-waterloo transition-transform duration-200 hover:-translate-y-0.5"
              >
                <ExternalLink size={16} />
                Open Web App
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadPage;
