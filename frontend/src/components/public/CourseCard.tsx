import Link from "next/link";
import Image from "next/image";
import { Clock, BarChart, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgramProps {
    id: string;
    title: string;
    duration: string;
    level: string;
    mode: string;
    price: string;
    description: string;
    image: string;
    mentor: string;
    category: string;
}

interface CourseCardProps {
    program: ProgramProps;
}

export function CourseCard({ program }: CourseCardProps) {
    return (
        <Card className="group overflow-hidden flex flex-col h-full border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="font-semibold bg-background/90 hover:bg-background text-foreground">
                        {program.category}
                    </Badge>
                </div>
            </div>
            <CardHeader className="flex-none p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {program.duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <BarChart className="w-3.5 h-3.5" />
                        {program.level}
                    </div>
                </div>
                <CardTitle className="font-playfair text-xl leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/programs/${program.id}`}>
                        {program.title}
                    </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2 text-sm">
                    {program.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-5 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Mentor: <span className="font-medium text-foreground">{program.mentor}</span></span>
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex items-center justify-between border-t bg-muted/20 mt-auto">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Course Fee</span>
                    <span className="font-bold text-lg text-primary">{program.price}</span>
                </div>
                <Button size="sm" className="gap-2" asChild>
                    <Link href={`/programs/${program.id}`}>
                        View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
