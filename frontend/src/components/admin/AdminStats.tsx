import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AdminStatsProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function AdminStats({ title, value, icon: Icon, trend, trendUp }: AdminStatsProps) {
    return (
        <Card>
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    {trend && (
                        <div className={cn("text-xs mt-1 flex items-center font-medium", trendUp ? "text-green-600" : "text-red-600")}>
                            {trendUp ? "↑" : "↓"} {trend}
                        </div>
                    )}
                </div>
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", "bg-muted text-muted-foreground")}>
                    <Icon className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    );
}
