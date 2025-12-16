import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Shield, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">User Name {i + 1}</div>
                            <div className="text-sm text-muted-foreground">user{i + 1}@example.com</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-sm text-muted-foreground hidden md:block">Joined Dec 2024</div>
                        <Badge variant={i === 2 ? "destructive" : "outline"}>
                            {i === 2 ? "Suspended" : "Active"}
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
