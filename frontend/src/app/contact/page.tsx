import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <MainLayout>
            <div className="bg-muted/30 py-12 border-b">
                <div className="container px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Contact Us</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">We are here to answer your questions and guide you on your spiritual journey.</p>
                </div>
            </div>

            <div className="container px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <Card className="border-muted bg-card shadow-sm">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-playfair font-bold mb-6">Send us a message</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                                            <Input id="name" placeholder="Your Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                                            <Input id="email" type="email" placeholder="your@email.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                        <Input id="subject" placeholder="What is this regarding?" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                                    </div>
                                    <Button size="lg" className="w-full">Send Message</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-playfair font-bold mb-6">Get in Touch</h3>
                            <p className="text-muted-foreground mb-8">
                                Whether you have questions about our curriculum, need help with admissions, or just want to visit our campus, we are just a message away.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Visit Us</h4>
                                    <p className="text-sm text-muted-foreground">Pyramid Valley International, <br />Kanakapura Road, Bengaluru, Karnataka, India - 560082</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Call Us</h4>
                                    <p className="text-sm text-muted-foreground">+91 98765 43210 <br />+91 80 1234 5678</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email Us</h4>
                                    <p className="text-sm text-muted-foreground">info@spiritualscience.org <br />admissions@spiritualscience.org</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Office Hours</h4>
                                    <p className="text-sm text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM <br />Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
