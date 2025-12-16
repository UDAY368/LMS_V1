import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MentorStatsProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    subtext?: string;
}

export function MentorStats({ title, value, icon: Icon, subtext }: MentorStatsProps) {
    return (
        <Card>
            <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                    {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
