import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VideoPlayer } from "@/components/course-player/VideoPlayer";
import { CourseSidebar } from "@/components/course-player/CourseSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, FileText, MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function CoursePlayerPage() {
    return (
        // We override the Dashboard Layout for this page to have a custom full-width experience if needed, 
        // but for now keeping it simple. Ideally, Player often hides the main sidebar.
        // To achieve "Focus Mode", we might want a different layout, but let's stick to DashboardLayout for consistency first.

        <div className="flex flex-col h-[calc(100vh-4rem)] -m-4 md:-m-6 lg:-m-8">
            {/* Course Header */}
            <div className="bg-background border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/learning"><ChevronLeft className="w-5 h-5" /></Link>
                    </Button>
                    <div>
                        <h1 className="font-semibold text-sm md:text-base line-clamp-1">Certified Meditation Teacher Training (Level 1)</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        <HelpCircle className="w-4 h-4 mr-2" /> Help
                    </Button>
                </div>
            </div>

            {/* Player Content */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                {/* Left/Main: Video & Tabs */}
                <div className="flex-1 overflow-y-auto bg-muted/10">
                    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
                        <VideoPlayer />

                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold font-playfair mb-1">Module 1: Practice: 3-Part Breath</h2>
                                    <p className="text-muted-foreground">Lesson 3 of 24</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary">Previous</Button>
                                    <Button>Next Lesson</Button>
                                </div>
                            </div>

                            <Tabs defaultValue="overview">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="resources">Resources</TabsTrigger>
                                    <TabsTrigger value="notes">My Notes</TabsTrigger>
                                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="mt-6 space-y-4">
                                    <div className="prose dark:prose-invert max-w-none">
                                        <h3>About this lesson</h3>
                                        <p>In this session, we will practice the Dirga Pranayama (Three-Part Breath). This is a foundational technique to expand lung capacity and center the mind.</p>
                                        <h4>Key Takeaways</h4>
                                        <ul>
                                            <li>Understanding the 3 chambers of the lungs</li>
                                            <li>Connecting breath with movement</li>
                                            <li>Parasympathetic nervous system activation</li>
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent value="resources" className="mt-6">
                                    <div className="border rounded-lg p-4 bg-card flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center text-primary">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium">3-Part Breath Guide.pdf</div>
                                                <div className="text-xs text-muted-foreground">PDF • 2.4 MB</div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="discussion" className="mt-6">
                                    <div className="text-center py-10 text-muted-foreground">
                                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>Discussion forum coming soon.</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>

                {/* Right/Bottom: Sidebar */}
                <div className="w-full lg:w-96 border-l bg-background">
                    <CourseSidebar />
                </div>
            </div>
        </div>
    );
}
