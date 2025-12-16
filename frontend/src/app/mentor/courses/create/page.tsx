"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { GripVertical, Plus, Trash2, Video, FileText, Save, ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
    const { addCourse } = useData();
    const router = useRouter();

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [category, setCategory] = useState("Meditation");

    const handlePublish = () => {
        // In real app, validation first
        addCourse({
            title: title || "New Untitled Course",
            description,
            price: price || "0",
            level,
            category,
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder
            mentorId: 'm1',
            mentorName: 'Guru Vasishta',
            modules: []
        });
        // Redirect to courses list
        router.push('/mentor/courses');
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/mentor/courses"><ArrowLeft className="w-5 h-5" /></Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-playfair font-bold">Course Studio</h1>
                    <p className="text-muted-foreground">Design your curriculum and publish to the world.</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline"><Save className="w-4 h-4 mr-2" /> Save Draft</Button>
                    <Button onClick={handlePublish}>Publish Course</Button>
                </div>
            </div>

            <Tabs defaultValue="basic" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                    <TabsTrigger value="basic" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">1. Basic Info</TabsTrigger>
                    <TabsTrigger value="curriculum" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">2. Curriculum</TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">3. Settings</TabsTrigger>
                </TabsList>

                {/* Step 1: Basic Info */}
                <TabsContent value="basic" className="mt-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Details</CardTitle>
                            <CardDescription>The information that will be displayed on the public course page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input id="title" placeholder="e.g., Advanced Meditation Techniques" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc">Description</Label>
                                <Textarea id="desc" placeholder="What will students learn?" className="min-h-[150px]" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Level</Label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={level} onChange={e => setLevel(e.target.value)}>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={category} onChange={e => setCategory(e.target.value)}>
                                        <option>Meditation</option>
                                        <option>Wellness</option>
                                        <option>Teaching Skills</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Thumbnail</Label>
                                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="text-muted-foreground">Click to upload image</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Step 2: Curriculum */}
                <TabsContent value="curriculum" className="mt-8 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Course Content</CardTitle>
                                <CardDescription>Structure your course into modules and lessons.</CardDescription>
                            </div>
                            <Button variant="secondary" size="sm" className="gap-2">
                                <Plus className="w-4 h-4" /> Add Module
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Mock Module */}
                            <div className="border rounded-lg p-4 bg-muted/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                                        <div className="font-semibold">Module 1: Introduction</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                    </div>
                                </div>

                                <div className="space-y-2 pl-8">
                                    {/* Mock Item */}
                                    <div className="flex items-center gap-3 p-3 bg-card border rounded flex-1">
                                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                                        <Video className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-medium">Welcome Video</span>
                                        <Badge variant="outline" className="ml-auto">Video</Badge>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-card border rounded flex-1">
                                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                                        <FileText className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm font-medium">Course Syllabus</span>
                                        <Badge variant="outline" className="ml-auto">PDF</Badge>
                                    </div>

                                    <Button variant="ghost" size="sm" className="w-full border border-dashed mt-2">
                                        <Plus className="w-4 h-4 mr-2" /> Add Lesson
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Step 3: Settings */}
                <TabsContent value="settings" className="mt-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div>
                                    <div className="font-medium">Public Visibility</div>
                                    <div className="text-sm text-muted-foreground">Make this course visible in the catalog</div>
                                </div>
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div>
                                    <div className="font-medium">Certificate</div>
                                    <div className="text-sm text-muted-foreground">Issue certificate upon completion</div>
                                </div>
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (INR)</Label>
                                <Input id="price" placeholder="15000" value={price} onChange={e => setPrice(e.target.value)} />
                                <p className="text-xs text-muted-foreground">Set to 0 for free courses.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
