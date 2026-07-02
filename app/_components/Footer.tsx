
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-colonial/10 bg-waterloo/95 text-colonial">
      <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="text-2xl font-custom sm:text-3xl">Asaan Taqreeb</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
            Direct event planning for Pakistan’s banquets, catering, salons, and photography teams.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-white/65 sm:text-right">
          <span className="font-semibold text-colonial">No broker cuts. No hidden fees.</span>
          <span>© 2026 Asaan Taqreeb. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
