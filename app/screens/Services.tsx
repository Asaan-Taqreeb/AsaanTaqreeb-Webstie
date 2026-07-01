import { House, Utensils, Camera, WandSparkles } from "lucide-react"

function Services() {
  const service = [
    {
      id: 1,
      icon: House,
      heading: "Banquets & Halls",
      para: "Direct calender sync with venue managers. Protects reservations with a strict double-booking lock at the database level.",
      subPara: "Real-Time Booking Guard"
    },
    {
      id: 2,
      icon: Utensils,
      heading: "Catering Networks",
      para: "Select custom dish menus with dynamic price-per-head calculators. Automatically aggregates final guest count bills.",
      subPara: "Dynamic Menu Compiler"
    },
    {
      id: 3,
      icon: Camera,
      heading: "Photo & Video",
      para: "Review dynamix portfolio grids, choose custom photoshoot duration slots, and lock in package tiers transparently.",
      subPara: "Interative Portfolios"
    },
    {
      id: 4,
      icon: WandSparkles,
      heading: "Makeup Salons",
      para: "Book groom or bridal makeup dlots directly with specific artists. Transparent session timelines and clear refund settings.",
      subPara: "Artist Session Booking"
    },
  ]
  return (
    <section className="mx-auto flex flex-col justify-center items-center bg-colonial text-waterloo p-5">
      <div className="mt-20 flex flex-col items-center justify-center">
        <p className="text-xl font-bold mb-2">Modular Ecosystem</p>
        <h2 className="text-3xl font-bold mt-5 text-center">Four Tailored Verticals One Unified Engine</h2>
        <p className="mt-5 text-lg text-justify md:w-1/2 font-medium leading-relaxed">Unlike basic multi-vendor scripts that treat every shop the same, Asaan Taqreeb features custom transaction models for Pakistan's distinct event services</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {
          service.map(services => {
            return (  
              <div key={services.id} className="group relative bg-navy border border-white hover:border-pregold/30 rounded-2xl p-6 text-white transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-20 h-20 rounded-xl bg-pregold/10 flex items-center justify-center text-pregold text-xl mb-6 group-hover:bg-pregold group-hover:text-waterloo transition-all duration-300">
                  <services.icon size={30} />
                </div>
                <h3 className="text-xl font-bold text-lightgold mb-2">{services.heading}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 text-justify">{services.para}</p>
                <span className="text-xs font-bold uppercase tracking-wider text-pregold">{services.subPara}</span>
              </div>
            )
          })
        }
      </div>
      
    </section>
  )
}

export default Services

