import { Sidebar } from "./Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Mobile Header */}
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                    <span className="font-semibold">Dashboard</span>
                </header>

                <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/10">
                    {children}
                </main>
            </div>
        </div>
    );
}
