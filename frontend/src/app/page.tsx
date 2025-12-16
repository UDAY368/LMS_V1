import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Leaf, Star } from "lucide-react";
import { SectionHeader } from "@/components/public/SectionHeader";
import { CourseCard } from "@/components/public/CourseCard";
import { MentorCard } from "@/components/public/MentorCard";
import { PROGRAMS, MENTORS, TESTIMONIALS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const featuredPrograms = PROGRAMS.slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl rounded-r-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium mb-6 animate-fade-in-up">
            <Leaf className="w-4 h-4" />
            <span>Admissions Open for batch 2025</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-tight mb-6">
            Awaken the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Teacher</span> <br className="hidden md:block" />Within You
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            Join the world's most authentic Teacher Training Portal. Master the ancient science of meditation and spiritual wisdom with certified global mentors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 text-lg h-12" asChild>
              <Link href="/programs">Explore Courses</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-12" asChild>
              <Link href="/about">Our Vision <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t pt-10 lg:w-3/4 mx-auto">
            <div>
              <div className="text-3xl font-bold font-playfair text-foreground">500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Certified Teachers</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-playfair text-foreground">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-playfair text-foreground">20+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Expert Mentors</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-playfair text-foreground">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Authentic Wisdom</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / About Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Meditation Group"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 lg:right-[-20px] bg-card p-6 rounded-xl shadow-xl border max-w-xs hidden md:block">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary-foreground">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-playfair">Global Certification</h4>
                    <p className="text-sm text-muted-foreground">Recognized by International Yoga & Meditation Alliance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <SectionHeader
                align="left"
                title="Why Become A Certified Teacher?"
                subtitle="Impact The World"
                description="The world is in need of stillness. As a spiritual guide, you don't just teach techniques; you hold space for transformation."
              />
              <ul className="space-y-6">
                {[
                  "Deepen your own personal practice and understanding.",
                  "Learn the science behind breath, mind, and energy.",
                  "Gain the confidence to lead groups and individuals.",
                  "Build a fulfilling career aligned with your soul's purpose."
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" size="lg" variant="secondary" asChild>
                <Link href="/about">Read Our Story <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Our Featured Programs"
            subtitle="Curriculum"
            description="Structured pathways designed to take you from a practitioner to a master teacher."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map(program => (
              <CourseCard key={program.id} program={program} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Learn From The Masters"
            subtitle="Faculty"
            description="Guidance from those who have walked the path for decades."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {MENTORS.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Success Stories"
            subtitle="Community"
            description="Hear from our graduates who are now lighting the way for others."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(story => (
              <Card key={story.id} className="bg-card/50 border-muted">
                <CardContent className="pt-6">
                  <div className="flex gap-1 text-secondary mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{story.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image src={story.image} alt={story.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{story.name}</h4>
                      <p className="text-xs text-muted-foreground">{story.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="max-w-xl mx-auto text-primary-foreground/90 text-lg mb-8">
            Enroll in our upcoming batch and take the first step towards your transformation.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-lg font-semibold" asChild>
            <Link href="/register">Apply Now</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
