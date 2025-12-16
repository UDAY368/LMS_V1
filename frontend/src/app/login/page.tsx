"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, GraduationCap, School } from "lucide-react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { setCurrentUser, users } = useData();
    const router = useRouter();

    const handleLogin = (role: 'learner' | 'mentor' | 'admin') => {
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const user = users.find(u => u.role === role);
            if (user) {
                setCurrentUser(user);

                // Redirect based on role
                if (role === 'learner') router.push('/dashboard');
                else if (role === 'mentor') router.push('/mentor');
                else if (role === 'admin') router.push('/admin');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <MainLayout>
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/20 py-12 px-4">
                <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-playfair font-bold">Welcome Back</CardTitle>
                        <CardDescription>
                            Sign in to continue your spiritual journey
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="demo" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="demo">Demo Login</TabsTrigger>
                                <TabsTrigger value="email">Email Login</TabsTrigger>
                            </TabsList>

                            {/* Demo Login Tab */}
                            <TabsContent value="demo" className="space-y-4">
                                <div className="bg-secondary/10 p-4 rounded-lg text-sm text-muted-foreground mb-4">
                                    <p className="font-semibold text-secondary-foreground mb-1">PROJECT DEMO MODE</p>
                                    As this is a simulation, click a role below to instantly log in as that user type.
                                </div>

                                <div className="grid gap-3">
                                    <Button
                                        variant="outline"
                                        className="h-14 justify-start px-4 hover:bg-green-50 hover:border-green-200 transition-all font-normal"
                                        onClick={() => handleLogin('learner')}
                                        disabled={isLoading}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-green-100 items-center justify-center flex mr-3">
                                            <GraduationCap className="h-4 w-4 text-green-700" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-foreground">Uday (Learner)</div>
                                            <div className="text-xs text-muted-foreground">Access Dashboard, Courses</div>
                                        </div>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="h-14 justify-start px-4 hover:bg-orange-50 hover:border-orange-200 transition-all font-normal"
                                        onClick={() => handleLogin('mentor')}
                                        disabled={isLoading}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-orange-100 items-center justify-center flex mr-3">
                                            <School className="h-4 w-4 text-orange-700" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-foreground">Guru Vasishta (Mentor)</div>
                                            <div className="text-xs text-muted-foreground">Manage Courses, Students</div>
                                        </div>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="h-14 justify-start px-4 hover:bg-blue-50 hover:border-blue-200 transition-all font-normal"
                                        onClick={() => handleLogin('admin')}
                                        disabled={isLoading}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-blue-100 items-center justify-center flex mr-3">
                                            <ShieldCheck className="h-4 w-4 text-blue-700" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-foreground">Admin User</div>
                                            <div className="text-xs text-muted-foreground">Platform Settings, Approvals</div>
                                        </div>
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Standard Email Login Tab (Visual only) */}
                            <TabsContent value="email" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" placeholder="m@example.com" type="email" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="password" type="password" className="pl-9" />
                                    </div>
                                </div>
                                <Button className="w-full" disabled>Log in (Use Demo Mode)</Button>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-center text-sm text-muted-foreground">
                        Don't have an account? <a href="/register" className="ml-1 text-primary hover:underline underline-offset-4">Sign up</a>
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    );
}
