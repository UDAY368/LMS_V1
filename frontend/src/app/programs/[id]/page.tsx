import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "@/components/program/EnrollButton";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Clock, BarChart, Users, ArrowRight, CheckCircle, Star, PlayCircle, BookOpen, Award, ShieldCheck } from "lucide-react";
import { PROGRAMS, MENTORS } from "@/lib/mock-data";

interface ProgramDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProgramDetailsPage(props: ProgramDetailsProps) {
    const params = await props.params;
    const program = PROGRAMS.find((p) => p.id === params.id);

    if (!program) {
        notFound();
    }

    // Find Mentor
    const mentor = MENTORS.find((m) => m.name === program.mentor);

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-muted/20">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-xs px-3 py-1">
                                    {program.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{program.rating}</span>
                                    <span className="text-muted-foreground">({program.reviewCount} reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground leading-tight mb-6">
                                {program.title}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                                {program.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-foreground/80">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase">Duration</p>
                                        <p className="font-semibold">{program.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <BarChart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase">Level</p>
                                        <p className="font-semibold">{program.level}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase">Enrolled</p>
                                        <p className="font-semibold">{program.enrolledCount?.toLocaleString()} Students</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <EnrollButton courseId={program.id} courseTitle={program.title} />
                                <div className="flex flex-col justify-center bg-card border rounded-full px-6 h-14">
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Enrollment</span>
                                    <span className="font-bold text-xl text-primary">Free</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-background">
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer hover:bg-black/30 transition-all">
                                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                        <PlayCircle className="w-8 h-8 text-primary fill-current ml-1" />
                                    </div>
                                </div>
                            </div>
                            {/* Floating Instructor Card */}
                            {mentor && (
                                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border max-w-xs animate-in slide-in-from-bottom-5 duration-700 hidden md:flex items-center gap-4">
                                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20">
                                        <Image src={mentor.image} alt={mentor.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Led by Mentor</p>
                                        <p className="font-bold font-playfair text-lg text-foreground">{mentor.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* About Course */}
                        <section id="about" className="scroll-mt-24">
                            <h2 className="text-3xl font-playfair font-bold mb-6">About This Course</h2>
                            <div className="prose prose-lg text-muted-foreground max-w-none">
                                <p>{program.longDescription || program.description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                {[
                                    "Lifetime Access to Course Material",
                                    "Certificate of Completion",
                                    "30-Day Money-Back Guarantee",
                                    "Access to Community Forum"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Curriculum */}
                        <section id="curriculum" className="scroll-mt-24">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-playfair font-bold">Course Curriculum</h2>
                                <div className="text-sm text-muted-foreground hidden sm:block">
                                    {program.modules?.length} Modules • {program.modules?.reduce((acc, m) => acc + m.subModules.length, 0)} Lessons
                                </div>
                            </div>

                            {program.modules && (
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {program.modules.map((module, index) => (
                                        <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-2 shadow-sm bg-card">
                                            <AccordionTrigger className="px-4 py-4 hover:no-underline">
                                                <div className="flex text-left items-center gap-4 w-full">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="font-semibold text-lg">{module.title}</div>
                                                        <div className="text-xs text-muted-foreground font-normal mt-1">{module.subModules.length} Lessons • {module.duration}</div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-4 pb-4 pt-2">
                                                <div className="flex flex-col gap-3 pl-14">
                                                    {module.subModules.map((sub, idx) => (
                                                        <div key={idx} className="flex items-center justify-between text-sm py-2 border-b last:border-0 border-dashed border-muted/50">
                                                            <div className="flex items-center gap-3">
                                                                <PlayCircle className="w-4 h-4 text-muted-foreground" />
                                                                <span>{sub.title}</span>
                                                            </div>
                                                            <span className="text-muted-foreground font-mono text-xs bg-muted px-2 py-0.5 rounded">{sub.duration}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </section>

                        {/* Reviews */}
                        <section id="reviews" className="scroll-mt-24">
                            <h2 className="text-3xl font-playfair font-bold mb-8">Student Reviews</h2>
                            <div className="bg-muted/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                <div className="text-center md:text-left">
                                    <div className="text-6xl font-bold text-foreground mb-2">{program.rating}</div>
                                    <div className="flex gap-1 justify-center md:justify-start text-amber-500 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-5 h-5 ${i < Math.floor(program.rating || 5) ? "fill-current" : "text-muted"}`} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">Course Rating • {program.reviewCount} Reviews</p>
                                </div>
                                <div className="flex-grow w-full space-y-2">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1 w-12 flex-shrink-0">
                                                <span className="font-semibold">{stars}</span> <Star className="w-3 h-3 fill-muted-foreground text-muted-foreground" />
                                            </div>
                                            <Progress value={stars === 5 ? 75 : stars === 4 ? 15 : 5} className="h-2" />
                                            <span className="w-10 text-right text-muted-foreground">{stars === 5 ? "75%" : stars === 4 ? "15%" : "5%"}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-8">
                            {/* Instructor Widget */}
                            {mentor && (
                                <Card className="overflow-hidden border-none shadow-lg">
                                    <div className="h-24 bg-primary/10"></div>
                                    <CardContent className="pt-0 relative px-6 pb-6">
                                        <div className="absolute -top-12 left-6 h-24 w-24 rounded-full overflow-hidden border-4 border-background bg-background">
                                            <Image src={mentor.image} alt={mentor.name} fill className="object-cover" />
                                        </div>
                                        <div className="mt-14 mb-4">
                                            <h3 className="font-bold text-xl font-playfair">{mentor.name}</h3>
                                            <p className="text-sm text-primary font-medium">{mentor.role}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-6 line-clamp-4">
                                            {mentor.bio}
                                        </p>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Award className="w-4 h-4 text-primary" />
                                                <span>{mentor.rating} Instructor Rating</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Users className="w-4 h-4 text-primary" />
                                                <span>{mentor.students?.toLocaleString()} Students Trained</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <ShieldCheck className="w-4 h-4 text-primary" />
                                                <span>Waitlist Verified</span>
                                            </div>
                                        </div>

                                        <Button variant="outline" className="w-full rounded-full" asChild>
                                            <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Free Enrollment Badge */}
                            <div className="bg-card border p-6 rounded-xl flex items-start gap-4">
                                <ShieldCheck className="w-8 h-8 text-green-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-sm mb-1">Free & Open for All</h4>
                                    <p className="text-xs text-muted-foreground">This course is available for free. Donations are welcome to support our mission.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
