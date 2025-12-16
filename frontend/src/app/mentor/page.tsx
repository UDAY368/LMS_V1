"use client";

import { MentorStats } from "@/components/mentor/MentorStats";
import { Users, BookOpen, Star, DollarSign, MessageSquare, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DonationModal } from "@/components/payment/DonationModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useData } from "@/context/DataContext";
import { useEffect, useState } from "react";

export default function MentorDashboard() {
    const { currentUser, courses, enrollments, users, getMentorStats } = useData();
    const [stats, setStats] = useState({ totalStudents: 0, activeCourses: 0, pendingReviews: 0, averageRating: 0, revenue: 0 });

    useEffect(() => {
        if (currentUser) {
            setStats(getMentorStats(currentUser.id));
        }
    }, [currentUser, courses, enrollments]);

    // Get enrollments for this mentor's courses
    const myCourseIds = courses.filter(c => c.mentorName === currentUser?.name).map(c => c.id);
    const myEnrollments = enrollments.filter(e => myCourseIds.includes(e.courseId));

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(amount);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-playfair font-bold">Mentor Dashboard</h1>
                    <p className="text-muted-foreground">Manage your courses, students, and performance.</p>
                </div>
                <div className="flex gap-3">
                    <DonationModal />
                    <Button className="gap-2" asChild>
                        <Link href="/mentor/courses/create">
                            <BookOpen className="w-4 h-4" /> Create New Course
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MentorStats title="Total Students" value={stats.totalStudents.toString()} icon={Users} subtext="+12 this week" />
                <MentorStats title="Active Courses" value={stats.activeCourses.toString()} icon={BookOpen} />
                <MentorStats title="Pending Reviews" value={stats.pendingReviews.toString()} icon={MessageSquare} subtext="Action required" />
                <MentorStats title="Average Rating" value={stats.averageRating.toString()} icon={Star} subtext="Top 5%" />
                <MentorStats title="Total Earnings" value={formatCurrency(stats.revenue)} icon={DollarSign} subtext="Withdrawal available" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Pending Actions */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Pending Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { type: "Evaluation", title: "Assignment: Breathwork Video", user: "Sarah J.", time: "2 hours ago" },
                                { type: "Approval", title: "Field Work Report: Week 4", user: "Mike R.", time: "5 hours ago" },
                                { type: "Comment", title: "Question on 'Mindfulness Basics'", user: "Anita D.", time: "1 day ago" }
                            ].map((action, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-muted/5">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            {action.type === 'Evaluation' && <AlertCircle className="w-5 h-5 text-orange-500" />}
                                            {action.type === 'Approval' && <Users className="w-5 h-5 text-blue-500" />}
                                            {action.type === 'Comment' && <MessageSquare className="w-5 h-5 text-green-500" />}
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{action.title}</h4>
                                            <p className="text-sm text-muted-foreground">from {action.user} • {action.time}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Review</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Enrollments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {myEnrollments.slice(0, 5).map((enrollment, i) => {
                                    const student = users.find(u => u.id === enrollment.studentId);
                                    const course = courses.find(c => c.id === enrollment.courseId);
                                    if (!student || !course) return null;

                                    return (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground">
                                            <Avatar>
                                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">
                                                    <span className="font-bold">{student.name}</span> enrolled in <span className="font-bold">{course.title}</span>
                                                </p>
                                                <p className="text-xs text-muted-foreground">{new Date(enrollment.lastAccessed).toLocaleDateString()} {/* Using lastAccessed as proxy for enrolled date */}</p>
                                            </div>
                                            <Button size="sm" variant="outline">View Progress</Button>
                                        </div>
                                    );
                                })}
                                {myEnrollments.length === 0 && (
                                    <div className="text-center py-6 text-muted-foreground">No recent enrollments.</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar - Rapid Links / Notifications */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg text-primary">Instructor Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm">Engage with your students within 24 hours of their queries to maintain a high course rating.</p>
                            <Button variant="link" className="p-0 h-auto">View Best Practices</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
