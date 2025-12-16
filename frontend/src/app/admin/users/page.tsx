"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Shield, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useData } from "@/context/DataContext";

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-playfair font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage learners, mentors, and administrators.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search users..." className="pl-8" />
                    </div>
                    <Button>Add User</Button>
                </div>
            </div>

            <Tabs defaultValue="learners" className="w-full">
                <TabsList>
                    <TabsTrigger value="learners">Learners (8,540)</TabsTrigger>
                    <TabsTrigger value="mentors">Mentors (145)</TabsTrigger>
                    <TabsTrigger value="admins">Admins (4)</TabsTrigger>
                </TabsList>

                <TabsContent value="learners" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Learners Directory</CardTitle>
                            <CardDescription>View and manage registered students.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserList role="Learner" />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="mentors" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mentor Directory</CardTitle>
                            <CardDescription>View and manage teaching faculty.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserList role="Mentor" />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="admins" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrators</CardTitle>
                            <CardDescription>Users with platform management access.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserList role="Admin" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function UserList({ role }: { role: string }) {
    const { users } = useData();

    // Filter users based on role
    // Role mapping: 'Learner' -> 'learner', 'Mentor' -> 'mentor', 'Admin' -> 'admin'
    const roleKey = role.toLowerCase();
    const filteredUsers = users.filter((u: any) => u.role === roleKey);

    if (filteredUsers.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">No {role}s found.</div>;
    }

    return (
        <div className="space-y-4">
            {filteredUsers.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            {user.avatar && <AvatarImage src={user.avatar} />}
                        </Avatar>
                        <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-sm text-muted-foreground hidden md:block">Joined {new Date(user.joinedDate).toLocaleDateString()}</div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            Active
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Ban User</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            ))}
        </div>
    )
}
