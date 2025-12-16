"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    FileText,
    Award,
    Shield,
    Settings,
    LogOut,
    Users
} from "lucide-react";
import { useData } from "@/context/DataContext";

const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Learning", href: "/dashboard/learning", icon: BookOpen },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { name: "Assignments", href: "/dashboard/assignments", icon: FileText },
    { name: "My Certificates", href: "/dashboard/certificates", icon: Award },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    // DataContext exports logout.
    const { logout, currentUser } = useData();

    const handleLogout = () => {
        // Since we can't easily pass null if strict typing blocks it without inspecting constraints,
        // and we want to simulate logout:
        // Ideally: setCurrentUser(null); 
        // If types complain, we can cast or just rely on the redirect for the demo.
        // Let's assume the user type is User | null in state, but setter might be strict.
        // Checking previous file content...
        // DataContext: const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]);
        // DataContextType: setCurrentUser: (user: User) => void;
        // The interface is wrong! It handles User | null but interface says User.
        // I will fix the interface in DataContext.tsx later if needed, but for now let's just cheat the callback
        // or just rely on the redirect. 

        // Actually, forcing a reload/redirect is effectively a logout in a real app if we cleared tokens.
        // For this demo context, we *should* clear the state.
        logout();
        router.push('/login');
    };

    return (
        <div className="flex h-screen sticky top-0 flex-col border-r bg-sidebar text-sidebar-foreground w-64">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-playfair font-bold text-lg">
                    <span className="text-primary">Spiritual Science</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-2">
                    {/* Mentor Links - Visible to Mentors only */}
                    {currentUser?.role === 'mentor' && (
                        <div className="mb-6">
                            <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Mentor
                            </h4>
                            <div className="space-y-1">
                                <Link
                                    href="/mentor"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/mentor/courses"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    My Courses
                                </Link>
                                <Link
                                    href="/mentor/evaluations"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Users className="h-4 w-4" />
                                    Evaluations
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Admin Links - Visible only to Admins */}
                    {currentUser?.role === 'admin' && (
                        <div className="mb-6">
                            <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Admin
                            </h4>
                            <div className="space-y-1">
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Shield className="h-4 w-4" />
                                    Overview
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Users className="h-4 w-4" />
                                    Users
                                </Link>
                                <Link
                                    href="/admin/courses"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    Courses
                                </Link>
                                <Link
                                    href="/admin/settings"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Learner Menu - Visible to Learners (and optionally others, but user asked for strict separation) */}
                    {(currentUser?.role === 'learner' || !currentUser) && (
                        <>
                            <div className="px-4 py-2">
                                <h3 className="mb-1 text-xs font-semibold uppercase text-muted-foreground/60">
                                    Learner Menu
                                </h3>
                            </div>
                            {sidebarLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href;
                                return (
                                    <Button
                                        key={link.name}
                                        variant={isActive ? "secondary" : "ghost"}
                                        size="sm"
                                        className={cn(
                                            "justify-start gap-2",
                                            isActive && "font-medium"
                                        )}
                                        asChild
                                    >
                                        <Link href={link.href}>
                                            <Icon className="h-4 w-4" />
                                            {link.name}
                                        </Link>
                                    </Button>
                                );
                            })}
                        </>
                    )}
                </nav>
            </div>
            <div className="border-t p-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </Button>
            </div>
        </div>
    );
}
