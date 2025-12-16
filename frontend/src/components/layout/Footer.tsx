import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-muted/40">
            <div className="container px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-playfair text-xl font-bold text-primary">Spiritual Science</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Empowering individuals to become certified guides in meditation and spiritual wisdom.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link href="/programs" className="text-muted-foreground hover:text-primary">Programs</Link></li>
                            <li><Link href="/mentors" className="text-muted-foreground hover:text-primary">Faculty</Link></li>
                            <li><Link href="/success-stories" className="text-muted-foreground hover:text-primary">Success Stories</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
                            <li><Link href="/help" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
                            <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>info@spiritualscience.org</span>
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-1" />
                                <span>Pyramid Valley International, Kanakapura Road, Bengaluru</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Spiritual Science Institute. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
