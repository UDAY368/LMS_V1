"use client";

import { AdminStats } from "@/components/admin/AdminStats";
import { Users, BookOpen, DollarSign, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { useEffect, useState } from "react";
import Link from "next/link"; // Added Link import
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminDashboard() {
    const { getAdminStats, courses } = useData();
    const [stats, setStats] = useState({ totalRevenue: 0, totalUsers: 0, totalMentors: 0, pendingCourses: 0 });

    useEffect(() => {
        setStats(getAdminStats());
    }, [getAdminStats, courses]); // Update if courses change

    const pendingCoursesList = courses.filter(c => c.status === 'Pending').slice(0, 3);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(amount);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-playfair font-bold">Platform Overview</h1>
                <p className="text-muted-foreground">Administer users, content, and system settings.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStats title="Total Donations" value={formatCurrency(stats.totalRevenue)} icon={DollarSign} trend="12% vs last month" trendUp={true} />
                <AdminStats title="Active Learners" value={stats.totalUsers.toString()} icon={Users} trend="5% vs last month" trendUp={true} />
                <AdminStats title="Active Mentors" value={stats.totalMentors.toString()} icon={Users} trend="2 new this week" trendUp={true} />
                <AdminStats title="Courses Pending" value={stats.pendingCourses.toString()} icon={BookOpen} trend="Requires attention" trendUp={false} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { msg: "New Mentor Application: Dr. Anjali Sharma", time: "2 hours ago", type: "info" },
                            { msg: "Course 'Yoga Nidra Mastery' submitted for approval", time: "5 hours ago", type: "warning" },
                            { msg: "User reported content in 'Module 3: Ethics'", time: "1 day ago", type: "error" },
                            { msg: "New 500+ User Milestone reached!", time: "2 days ago", type: "success" },
                        ].map((activity, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="mt-1">
                                    <Activity className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{activity.msg}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Pending Approvals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Course Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pendingCoursesList.length > 0 ? pendingCoursesList.map((course) => (
                                <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{course.title}</div>
                                            <div className="text-xs text-muted-foreground">by {course.mentorName}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href="/admin/courses">Review</Link>
                                        </Button>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-6 text-muted-foreground">No pending courses.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
