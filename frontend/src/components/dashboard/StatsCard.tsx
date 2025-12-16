import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    className?: string;
    iconClassName?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className, iconClassName }: StatsCardProps) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <Icon className={cn("h-4 w-4 text-muted-foreground", iconClassName)} />
                </div>
                <div className="flex items-center pt-2">
                    <div className="text-2xl font-bold">{value}</div>
                    {trend && (
                        <span className="ml-auto text-xs text-green-500 font-medium">
                            {trend}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
