"use client"

import { useEffect, useState } from "react"
import Image, { type StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Ai from "../../public/AI.png"
import Planner from "../../public/Planner.png"
import Chat from "../../public/Chat.png"

type FeatureSlide = {
    id: number
    image: StaticImageData
    heading: string
    desc: string
}

function Features() {
    const features: FeatureSlide[] = [
        {
            id: 1,
            image: Ai,
            heading: "Multilingual AI Concierge",
            desc: "Type event planning questions naturally. Powered by a fine-tuned Groq endpoint parsing English, Urdu, and Roman Urdu to identify matching packages or location listings.",
        },
        {
            id: 2,
            image: Planner,
            heading: "Dynamic Budget Planner",
            desc: "Keep event milestones on target. Track total limits, record cash transactions, and dynamically link checklist task nodes back to active vendor contract states.",
        },
        {
            id: 3,
            image: Chat,
            heading: "P2P Chat & Consultation",
            desc: "Bypass slow third-party translation delays. Book directly aligned 15-minute consultation calls, send visual transaction proofs, and record bidirectional asynchronous voice notes..",
        },
    ]

    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveSlide((currentSlide) => (currentSlide + 1) % features.length)
        }, 5000)

        return () => window.clearInterval(interval)
    }, [features.length])

    const currentFeature = features[activeSlide]

    const goToPrevious = () => {
        setActiveSlide((currentSlide) => (currentSlide - 1 + features.length) % features.length)
    }

    const goToNext = () => {
        setActiveSlide((currentSlide) => (currentSlide + 1) % features.length)
    }

    return (
        <section className="mx-auto flex flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-pregold">Additional Features</p>
                    <h3 className="mt-3 text-3xl font-bold text-lightgold sm:text-4xl">Built to make event planning easier</h3>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Previous feature"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-pregold hover:bg-pregold hover:text-waterloo"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next feature"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-pregold hover:bg-pregold hover:text-waterloo"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-navy/30 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="flex items-center justify-center bg-linear-to-br from-waterloo via-navy to-waterloo p-8 sm:p-10 lg:p-12">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 rounded-4xl bg-pregold/10 blur-3xl" />
                            <Image
                                key={currentFeature.id}
                                src={currentFeature.image}
                                alt={currentFeature.heading}
                                className="relative mx-auto block h-auto w-3/5 object-contain drop-shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-14">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pregold">
                                0{currentFeature.id}
                            </p>
                            <h4 className="mt-4 text-3xl font-bold text-lightgold sm:text-4xl">
                                {currentFeature.heading}
                            </h4>
                        </div>

                        <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                            {currentFeature.desc}
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            {features.map((feature, index) => (
                                <button
                                    key={feature.id}
                                    type="button"
                                    onClick={() => setActiveSlide(index)}
                                    aria-label={`Go to ${feature.heading}`}
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        index === activeSlide ? "w-10 bg-pregold" : "w-3 bg-white/30 hover:bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-3 md:hidden">
                            <button
                                type="button"
                                onClick={goToPrevious}
                                aria-label="Previous feature"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-pregold hover:bg-pregold hover:text-waterloo"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={goToNext}
                                aria-label="Next feature"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-pregold hover:bg-pregold hover:text-waterloo"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
