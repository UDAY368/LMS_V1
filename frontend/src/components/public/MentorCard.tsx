import Link from "next/link";
import Image from "next/image";
import { Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MentorProps {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    expertise: string[];
    rating: number;
    students: number;
}

interface MentorCardProps {
    mentor: MentorProps;
}

export function MentorCard({ mentor }: MentorCardProps) {
    return (
        <Card className="overflow-hidden border-none shadow-none bg-transparent">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl mb-4 bg-muted">
                <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="space-y-2 text-center">
                <h3 className="font-playfair text-xl font-bold">{mentor.name}</h3>
                <p className="text-sm font-medium text-primary uppercase tracking-wide">{mentor.role}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-secondary text-secondary" />
                        <span>{mentor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{mentor.students}+ Students</span>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {mentor.expertise.slice(0, 2).map((exp, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-background">
                            {exp}
                        </Badge>
                    ))}
                </div>
            </div>
        </Card>
    );
}
