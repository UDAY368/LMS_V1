"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useState } from "react";

export default function AdminCoursesPage() {
    const { courses, updateCourseStatus } = useData();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.mentorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusUpdate = (courseId: string, status: 'Published' | 'Rejected') => {
        if (confirm(`Are you sure you want to ${status.toLowerCase()} this course?`)) {
            updateCourseStatus(courseId, status);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-playfair font-bold">Course Management</h1>
                    <p className="text-muted-foreground">Review, approve, or reject course submissions.</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search courses..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Title</TableHead>
                            <TableHead>Mentor</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell>{course.mentorName}</TableCell>
                                <TableCell>₹{course.price}</TableCell>
                                <TableCell>{course.category}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        course.status === 'Published' ? "default" :
                                            course.status === 'Pending' ? "secondary" :
                                                course.status === 'Rejected' ? "destructive" : "outline"
                                    }>
                                        {course.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="icon" variant="ghost" title="View Details">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        {course.status === 'Pending' && (
                                            <>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    title="Approve"
                                                    onClick={() => handleStatusUpdate(course.id, 'Published')}
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    title="Reject"
                                                    onClick={() => handleStatusUpdate(course.id, 'Rejected')}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredCourses.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No courses found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
