import Image from "next/image";
import Hero from '../public/hero.png'

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-384 items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="max-w-2xl text-3xl font-bold capitalize leading-tight sm:text-3xl lg:text-6xl">
              Har taqreeb ki tyari,
              <br />
              ab hui asaan!
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-colonial/85 sm:text-lg lg:leading-9">
              Skip the middlemen and plan your perfect event. Connect directly with Pakistan’s premium banquets, caterers, photographers, and makeup artists. No hidden charges. No communication delays.
            </p>
            <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-2xl border border-colonial/15 bg-white/5 px-4 py-3 text-center backdrop-blur-sm">
                <h2 className="text-3xl font-bold">0 %</h2>
                <span className="mt-2 block text-sm font-semibold uppercase tracking-wide sm:text-base">Commission Cut</span>
              </div>
              <div className="rounded-2xl border border-colonial/15 bg-white/5 px-4 py-3 text-center backdrop-blur-sm">
                <h2 className="text-3xl font-bold">3 +</h2>
                <span className="mt-2 block text-sm font-semibold uppercase tracking-wide sm:text-base">Languages Supported</span>
              </div>
              <div className="rounded-2xl border border-colonial/15 bg-white/5 px-4 py-3 text-center backdrop-blur-sm">
                <h2 className="text-3xl font-bold">4</h2>
                <span className="mt-2 block text-sm font-semibold uppercase tracking-wide sm:text-base">Services</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <Image
                src={Hero}
                alt="hero"
                className="h-auto mx-auto object-contain drop-shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
