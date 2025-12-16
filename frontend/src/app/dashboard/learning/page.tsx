"use client";

import { CourseProgressCard } from "@/components/dashboard/CourseProgressCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/context/DataContext";

export default function MyLearningPage() {
    const { enrollments, courses, currentUser } = useData();

    if (!currentUser) return null;

    const myEnrollments = enrollments.filter(e => e.studentId === currentUser.id);

    // Merge enrollment data with course data
    const enrolledCoursesData = myEnrollments.map(e => {
        const course = courses.find(c => c.id === e.courseId);
        if (!course) return null;
        return {
            id: course.id,
            title: course.title,
            image: course.image,
            progress: e.progress,
            totalLessons: 24, // Mock
            completedLessons: e.completedLessons.length,
            lastAccessed: e.lastAccessed,
            status: e.progress === 100 ? 'completed' : e.progress > 0 ? 'in-progress' : 'not-started'
        };
    }).filter(c => c !== null);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-playfair font-bold text-foreground mb-2">My Learning</h1>
                <p className="text-muted-foreground">Track your progress and continue your education.</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="all">All Courses</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                    {enrolledCoursesData.map(course => (
                        // @ts-ignore
                        <CourseProgressCard key={course.id} course={course} />
                    ))}
                </TabsContent>

                <TabsContent value="in-progress" className="space-y-6">
                    {enrolledCoursesData.filter(c => c?.status !== 'completed').map(course => (
                        // @ts-ignore
                        <CourseProgressCard key={course.id} course={course} />
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-6">
                    {enrolledCoursesData.filter(c => c?.status === 'completed').map(course => (
                        // @ts-ignore
                        <CourseProgressCard key={course.id} course={course} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
