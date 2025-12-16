import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface CourseProgressCardProps {
    course: {
        id: string;
        title: string;
        image: string;
        progress: number;
        totalLessons: number;
        completedLessons: number;
        lastAccessed: string;
    };
}

export function CourseProgressCard({ course }: CourseProgressCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-playfair font-bold text-xl">{course.title}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                Last active: {course.lastAccessed}
                            </span>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{course.progress}% Complete</span>
                                <span className="text-muted-foreground">{course.completedLessons}/{course.totalLessons} Lessons</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button asChild className="gap-2">
                            <Link href={`/dashboard/courses/${course.id}`}>
                                <PlayCircle className="w-4 h-4" />
                                Continue Learning
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
