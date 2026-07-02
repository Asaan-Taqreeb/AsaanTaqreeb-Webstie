import Link from "next/link";

export default function Navbar() {
    return (
        <header className="w-full border-b border-colonial/10 bg-waterloo/90 backdrop-blur">
            <div className="mx-auto flex h-24 w-full max-w-384 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-3xl font-medium font-custom sm:text-4xl lg:text-5xl">
                    Asaan Taqreeb
                </Link>
                {/* <div>
                    <ul className="flex items-center gap-12">
                        <li className="text-base font-medium"><Link href={'/'}>Home</Link></li>
                        <li className="text-base font-medium"><Link href={'/'}>About</Link></li>
                        <li className="text-base font-medium"><Link href={'/'}>Service</Link></li>
                        <li className="text-base font-medium"><Link href={'/'}>FAQ</Link></li>
                        <li className="text-base font-medium"><Link href={'/'}>Contact</Link></li>
                        <button className="px-5 p-3 bg-pregold rounded-xl text-lg font-bold text-waterloo"><Link href={'/'}>Download Now</Link></button>
                    </ul>
                </div> */}
            </div>
        </header>
    )
}