"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/public/CourseCard";
// import { SectionHeader } from "@/components/public/SectionHeader"; // Unused currently
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useState } from "react";

export default function ProgramsPage() {
    const { courses } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Programs");
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

    // Filter Logic
    const publishedCourses = courses.filter(c => c.status === 'Published');

    const filteredCourses = publishedCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All Programs" || course.category === selectedCategory;
        const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
        return matchesSearch && matchesCategory && matchesLevel;
    });

    const handleLevelChange = (level: string) => {
        setSelectedLevels(prev =>
            prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
        );
    };

    return (
        <MainLayout>
            <div className="bg-muted/30 py-12 border-b">
                <div className="container px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Our Curriculum</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Explore our range of certified teacher training programs designed to deepen your practice and empower you to guide others.</p>
                </div>
            </div>

            <div className="container px-4 py-12 md:py-16">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-8">
                        <div>
                            <h3 className="font-semibold mb-4 text-lg">Search</h3>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search programs..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-lg">Categories</h3>
                            <div className="space-y-2">
                                {["All Programs", "Meditation", "Spiritual Science", "Wellness", "Education"].map((cat, i) => (
                                    <Button
                                        key={i}
                                        variant={selectedCategory === cat ? "secondary" : "ghost"}
                                        className="w-full justify-start text-left"
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-lg">Level</h3>
                            <div className="space-y-2">
                                {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`l-${i}`}
                                            checked={selectedLevels.includes(level)}
                                            onChange={() => handleLevelChange(level)}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`l-${i}`} className="text-sm font-medium leading-none cursor-pointer">{level}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCourses.map(course => (
                                <CourseCard key={course.id} program={{
                                    id: course.id,
                                    title: course.title,
                                    duration: course.totalDuration || "4 Weeks", // Fallback
                                    level: course.level,
                                    mode: "Online + Live", // Mock fallback
                                    price: `₹${course.price}`,
                                    description: course.description,
                                    image: course.image,
                                    mentor: course.mentorName,
                                    category: course.category
                                }} />
                            ))}
                            {filteredCourses.length === 0 && (
                                <div className="col-span-full text-center py-12 text-muted-foreground">
                                    No programs found matching your criteria.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
