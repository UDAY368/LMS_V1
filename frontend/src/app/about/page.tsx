import { MainLayout } from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/public/SectionHeader";
import Image from "next/image";

export default function AboutPage() {
    return (
        <MainLayout>
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Meditation Retreat"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4">Our Vision</h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">Bridging Ancient Wisdom with Modern Science</p>
                </div>
            </div>

            <div className="container px-4 py-20">
                <div className="max-w-3xl mx-auto space-y-8 text-lg text-muted-foreground leading-relaxed">
                    <p>
                        <span className="text-primary font-bold text-xl block mb-2 text-foreground">Established in 2010,</span>
                        Spiritual Science Institute was born from a desire to make the profound teachings of Himalayan masters accessible, structured, and scientifically validated for the modern world.
                    </p>
                    <p>
                        We believe that meditation is not just a relaxation technique, but a systematic technology for expanding human consciousness. Our curriculum is designed to move beyond dogma and belief, focusing instead on direct experience and measurable transformation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                        <div className="bg-secondary/10 p-8 rounded-2xl border border-secondary/20">
                            <h3 className="text-xl font-bold font-playfair text-foreground mb-3">Our Mission</h3>
                            <p>To train 100,000 certified meditation teachers who can carry the torch of wisdom into schools, corporations, and communities worldwide.</p>
                        </div>
                        <div className="bg-primary/10 p-8 rounded-2xl border border-primary/20">
                            <h3 className="text-xl font-bold font-playfair text-foreground mb-3">Our Values</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Authenticity in teaching</li>
                                <li>Scientific validation</li>
                                <li>Inclusive community</li>
                                <li>Service to humanity</li>
                            </ul>
                        </div>
                    </div>
                    <p>
                        Today, our alumni network spans over 50 countries, creating a ripple effect of peace and mindfulness across the globe. Whether you seek personal growth or professional certification, you have found your home.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
