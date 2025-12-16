"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { CourseProgressCard } from "@/components/dashboard/CourseProgressCard";
import { BookOpen, Trophy, Flame, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DonationModal } from "@/components/payment/DonationModal";
import { useData } from "@/context/DataContext";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const { currentUser, enrollments, courses, getLearnerStats, logout } = useData();
    const [stats, setStats] = useState({ inProgress: 0, completed: 0, streak: 0, hours: 0 });

    useEffect(() => {
        if (currentUser) {
            setStats(getLearnerStats(currentUser.id));
        }
    }, [currentUser, enrollments]);

    if (!currentUser) return <div>Loading...</div>;

    // Find active course (most recently accessed)
    const myEnrollments = enrollments.filter(e => e.studentId === currentUser.id);
    const lastActiveEnrollment = myEnrollments.sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())[0];

    // Get all enrolled courses with progress
    const enrolledCoursesList = myEnrollments.map(e => {
        const course = courses.find(c => c.id === e.courseId);
        if (!course) return null;
        return {
            ...course,
            enrollment: e
        };
    }).filter(item => item !== null);


    const activeCourseData = lastActiveEnrollment ? courses.find(c => c.id === lastActiveEnrollment.courseId) : null;

    const activeCourseProps = activeCourseData && lastActiveEnrollment ? {
        id: activeCourseData.id,
        title: activeCourseData.title,
        image: activeCourseData.image,
        progress: lastActiveEnrollment.progress,
        totalLessons: 24, // Mock for now
        completedLessons: lastActiveEnrollment.completedLessons.length,
        lastAccessed: lastActiveEnrollment.lastAccessed
    } : null;

    // Recommended courses (not enrolled in)
    const recommendedCourses = courses
        .filter(c => c.status === 'Published' && !myEnrollments.find(e => e.courseId === c.id))
        .slice(0, 2);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-foreground">Welcome back, {currentUser.name.split(' ')[0]}</h1>
                    <p className="text-muted-foreground">You are making great progress on your spiritual journey.</p>
                </div>
                <div className="flex gap-3">
                    <DonationModal />
                    <Button variant="outline" asChild><Link href="/dashboard/learning">My Courses</Link></Button>
                    <Button asChild><Link href="/programs">Browse New</Link></Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Courses in Progress" value={stats.inProgress.toString()} icon={BookOpen} />
                <StatsCard title="Completed Courses" value={stats.completed.toString()} icon={Trophy} />
                <StatsCard title="Learning Streak" value={`${stats.streak} Days`} icon={Flame} trend="Keep it up!" />
                <StatsCard title="Hours Learned" value={stats.hours.toString()} icon={Clock} />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Active Course & Recent */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Pick up where you left off</h2>
                        </div>
                        {activeCourseProps ? (
                            <CourseProgressCard course={activeCourseProps} />
                        ) : (
                            <div className="p-8 border rounded-lg text-center bg-muted/20">
                                <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                                <Button asChild><Link href="/programs">Browse Catalog</Link></Button>
                            </div>
                        )}
                    </section>

                    {/* Recently Enrolled List (if more than 1) */}
                    {enrolledCoursesList.length > 1 && (
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Your Courses</h2>
                                <Link href="/dashboard/learning" className="text-sm text-primary hover:underline">View All</Link>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {enrolledCoursesList.slice(0, 3).map(item => (
                                    <div key={item!.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <img src={item!.image} alt={item!.title} className="w-16 h-16 rounded object-cover" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm md:text-base">{item!.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: `${item!.enrollment.progress}%` }}></div>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{item!.enrollment.progress}%</span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" asChild>
                                            <Link href={`/dashboard/learning`}>Continue</Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Recommended for you</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recommendedCourses.map(course => (
                                <div key={course.id} className="group relative rounded-lg border overflow-hidden">
                                    <div className="aspect-video relative bg-muted">
                                        <img src={course.image} alt={course.title} className="object-cover w-full h-full transition-transform group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs text-primary font-medium mb-1">{course.category}</div>
                                        <h3 className="font-bold font-playfair leading-tight mb-2">
                                            <Link href={`/programs/${course.id}`} className="hover:underline">{course.title}</Link>
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Schedule / Announcements */}
                <div className="space-y-6">
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                        <div className="p-6 pb-4 border-b">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" /> Upcoming Sessions
                            </h3>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="flex-shrink-0 w-12 text-center bg-muted rounded p-1">
                                        <div className="text-xs font-bold uppercase text-muted-foreground">Dec</div>
                                        <div className="text-lg font-bold">18</div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Live Meditation Q&A</h4>
                                        <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1">Join Link</Button>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="flex-shrink-0 w-12 text-center bg-muted rounded p-1">
                                        <div className="text-xs font-bold uppercase text-muted-foreground">Dec</div>
                                        <div className="text-lg font-bold">20</div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Breathwork Masterclass</h4>
                                        <p className="text-xs text-muted-foreground">6:00 PM - 7:30 PM</p>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1">Join Link</Button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-primary/5 text-card-foreground shadow-sm">
                        <div className="p-6">
                            <h3 className="font-bold flex items-center gap-2 mb-2 text-primary">
                                <Trophy className="w-4 h-4" /> Weekly Challenge
                            </h3>
                            <p className="text-sm mb-4">Complete 3 quiz modules this week to earn the "Scholar" badge.</p>
                            <div className="w-full bg-background rounded-full h-2 mb-1">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '66%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>2/3 Completed</span>
                                <span>1 day left</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
