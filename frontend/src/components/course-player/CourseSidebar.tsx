"use client";

import { CheckCircle, Circle, PlayCircle, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Mock Curriculum
const CURRICULUM = [
    {
        id: "module-1",
        title: "Module 1: Foundations of Breath",
        lessons: [
            { id: "l1", title: "Introduction to Prana", duration: "10:00", status: "completed", type: "video" },
            { id: "l2", title: "Anatomy of Breathing", duration: "15:30", status: "completed", type: "video" },
            { id: "l3", title: "Practice: 3-Part Breath", duration: "20:00", status: "in-progress", type: "video" },
            { id: "q1", title: "Module 1 Quiz", duration: "10 min", status: "locked", type: "quiz" },
        ]
    },
    {
        id: "module-2",
        title: "Module 2: The Mind-Body Connection",
        lessons: [
            { id: "l4", title: "Understanding Stress", duration: "12:45", status: "locked", type: "video" },
            { id: "l5", title: "Neuroscience of Meditation", duration: "18:20", status: "locked", type: "video" },
        ]
    }
];

export function CourseSidebar() {
    return (
        <div className="h-full border-l bg-card flex flex-col w-full lg:w-96">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Course Content</h3>
                <div className="text-xs text-muted-foreground mt-1">35% Completed</div>
            </div>
            <ScrollArea className="flex-1">
                <Accordion type="multiple" defaultValue={["module-1"]} className="w-full">
                    {CURRICULUM.map((module) => (
                        <AccordionItem key={module.id} value={module.id}>
                            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 text-sm font-semibold">
                                {module.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col">
                                    {module.lessons.map(lesson => (
                                        <button
                                            key={lesson.id}
                                            className={cn(
                                                "flex items-start gap-3 px-6 py-3 text-left hover:bg-muted/50 transition-colors border-l-2 border-transparent",
                                                lesson.status === 'in-progress' && "bg-primary/5 border-primary text-primary"
                                            )}
                                        >
                                            <div className="mt-0.5">
                                                {lesson.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500 fill-green-100" />}
                                                {lesson.status === 'in-progress' && <PlayCircle className="w-4 h-4" />}
                                                {lesson.status === 'locked' && <Lock className="w-4 h-4 text-muted-foreground" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium leading-tight">{lesson.title}</div>
                                                <div className="text-xs text-muted-foreground mt-1">{lesson.duration}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </div>
    );
}
