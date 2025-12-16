import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, MoreVertical, PlusCircle } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MY_COURSES = [
    { id: 1, title: "Certified Meditation Teacher Training (Level 1)", status: "Published", students: 850, rating: 4.8, revenue: "₹2.5L" },
    { id: 2, title: "Advanced Breathwork Techniques", status: "Draft", students: 0, rating: "-", revenue: "-" },
    { id: 3, title: "Child Wisdom Module", status: "Published", students: 120, rating: 4.9, revenue: "₹85k" },
];

export default function CoursesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-playfair font-bold">My Courses</h1>
                    <p className="text-muted-foreground">Create and manage your curriculum content.</p>
                </div>
                <Button className="gap-2" asChild>
                    <Link href="/mentor/courses/create">
                        <PlusCircle className="w-4 h-4" /> Create New Course
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {MY_COURSES.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg truncate">{course.title}</h3>
                                        <Badge variant={course.status === 'Published' ? "default" : "secondary"}>
                                            {course.status}
                                        </Badge>
                                    </div>
                                    <div className="flex gap-4 text-sm text-muted-foreground">
                                        <span>{course.students} Students</span>
                                        <span>{course.rating} Rating</span>
                                        <span>{course.revenue} Revenue</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Edit className="w-4 h-4" /> Edit
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <Eye className="w-4 h-4" /> Preview
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Analytics</DropdownMenuItem>
                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
