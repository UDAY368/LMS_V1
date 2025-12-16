import { MainLayout } from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/public/SectionHeader";
import { TESTIMONIALS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function StoriesPage() {
    return (
        <MainLayout>
            <div className="bg-secondary/10 py-16 border-b">
                <div className="container px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Voices of Transformation</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Discover how our teacher training programs have empowered individuals to find their purpose and light the way for others.
                    </p>
                </div>
            </div>

            <div className="container px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((story) => (
                        <Card key={story.id} className="bg-card hover:shadow-lg transition-shadow duration-300 border-muted">
                            <CardContent className="pt-8 px-6 pb-6 flex flex-col h-full">
                                <div className="mb-6 text-primary/20">
                                    <Quote className="h-10 w-10" />
                                </div>

                                <p className="text-muted-foreground mb-8 text-lg italic flex-grow leading-relaxed">
                                    "{story.content}"
                                </p>

                                <div className="border-t pt-6 mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                                            <Image
                                                src={story.image}
                                                alt={story.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-playfair text-foreground">{story.name}</h4>
                                            <p className="text-xs text-primary font-medium uppercase tracking-wide">{story.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 text-orange-400 mt-3 justify-end">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Additional Mock Stories filler to make page look fuller */}
                    <Card className="bg-primary text-primary-foreground border-none">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-8 min-h-[300px]">
                            <h3 className="text-2xl font-bold font-playfair mb-4">Your Story Begins Here</h3>
                            <p className="text-primary-foreground/80 mb-6">
                                Join our upcoming batch and become part of our growing global community.
                            </p>
                            <a href="/register" className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 px-8 py-2">
                                Start Your Journey
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
