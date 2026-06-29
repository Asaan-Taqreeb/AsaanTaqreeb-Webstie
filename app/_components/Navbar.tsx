import Link from "next/link";

export default function Navbar() {
    return (
        <header className="w-full h-1/6 mt-20">
            <div className="flex justify-between items-center mx-20">
                <h1 className="text-5xl font-medium font-custom">Asaan Taqreeb</h1>
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