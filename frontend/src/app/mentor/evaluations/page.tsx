import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, X } from "lucide-react";

export default function EvaluationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-playfair font-bold">Evaluations</h1>
                <p className="text-muted-foreground">Review and grade student assignments and field work.</p>
            </div>

            <div className="grid gap-4">
                {[1, 2, 3].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">Pending Review</Badge>
                                    <span className="text-xs text-muted-foreground">Submitted 2 days ago</span>
                                </div>
                                <h3 className="font-semibold text-lg">Field Work Log: 10 Students Guided</h3>
                                <p className="text-sm text-muted-foreground">Student: <span className="font-medium text-foreground">John Doe</span> • Course: Meditation Level 1</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="gap-2">
                                    <ExternalLink className="w-4 h-4" /> View Submission
                                </Button>
                                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                                    <Check className="w-4 h-4" /> Approve
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
