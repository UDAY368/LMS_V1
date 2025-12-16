"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Mentors", href: "/mentors" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-playfair text-xl font-bold tracking-tight text-primary">
                        Spiritual Science
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="flex md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="grid gap-4 py-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex w-full items-center py-2 text-lg font-semibold"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="mt-4 flex flex-col gap-2">
                                    <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/login">Log in</Link>
                                    </Button>
                                    <Button asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
