import Link from "next/link";

export default function Navbar() {
    return (
        <header className="w-full border-b border-colonial/10 bg-waterloo/90 backdrop-blur">
            <div className="mx-auto flex h-24 w-full max-w-384 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-3xl font-medium font-custom sm:text-4xl lg:text-5xl text-colonial">
                    Asaan Taqreeb
                </Link>
            </div>
        </header>
    )
}