import Image from "next/image";
import Hero from '../public/hero.png'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen flex-1 flex justify-between items-center p-5">
        <div className="w-2/5 flex flex-col items-center mx-10">
          <h1 className="text-6xl font-bold capitalize">Har taqreeb ki tyari,<br />ab hui asaan!</h1>
          <p className="text-lg font-semibold mt-5 mx-12 text-justify">Skip the middlemen and plan your perfect event. Connect directly with Pakistan’s premium banquets, caterers, photographers, and makeup artists. No hidden charges. No communication delays.</p>
          <button className="px-8 py-4 bg-pregold rounded-md text-waterloo text-lg font-bold mt-5 place-self-start mx-10"><Link href={'/'}>Learn More</Link></button>
        </div>
        <div className="w-3/5 flex justify-center items-center">
          <Image src={Hero} alt="hero" className="w-[35%] object-cover"/>
        </div>
      </div>
    </>
  );
}
