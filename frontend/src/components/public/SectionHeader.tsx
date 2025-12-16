import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeader({
    title,
    subtitle,
    description,
    align = "center",
    className
}: SectionHeaderProps) {
    return (
        <div className={cn(
            "flex flex-col gap-2 mb-10",
            align === "center" ? "items-center text-center" : "items-start text-left",
            className
        )}>
            {subtitle && (
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                    {subtitle}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
                {title}
            </h2>
            {description && (
                <p className="max-w-2xl text-lg text-muted-foreground mt-2">
                    {description}
                </p>
            )}
            <div className={cn(
                "h-1 w-20 rounded-full mt-4 bg-secondary",
                align === "center" ? "mx-auto" : ""
            )} />
        </div>
    );
}
