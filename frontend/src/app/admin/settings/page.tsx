import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-playfair font-bold">Settings</h1>
                <p className="text-muted-foreground">Configure platform parameters and preferences.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform Information</CardTitle>
                            <CardDescription>Visible in site metadata and footer.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Platform Name</Label>
                                    <Input defaultValue="Spiritual Science Institute" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Support Email</Label>
                                    <Input defaultValue="support@spiritualscience.org" />
                                </div>
                            </div>
                            <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payments" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Commission & Fees</CardTitle>
                            <CardDescription>Set the platform fee percentage for course sales.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 max-w-xs">
                                <Label>Platform Fee (%)</Label>
                                <Input type="number" defaultValue="15" />
                                <p className="text-xs text-muted-foreground">Percentage taken from every course sale.</p>
                            </div>
                            <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
