import { MainLayout } from "@/components/layout/MainLayout";
import { MentorCard } from "@/components/public/MentorCard";
import { MENTORS } from "@/lib/mock-data";

export default function MentorsPage() {
    return (
        <MainLayout>
            <div className="bg-muted/30 py-12 border-b">
                <div className="container px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Our Faculty</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Learn from world-renowned spiritual masters, scientists, and wellness experts dedicated to your growth.
                    </p>
                </div>
            </div>

            <div className="container px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {MENTORS.map(mentor => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                    {MENTORS.map(mentor => (
                        <MentorCard key={`${mentor.id}-dup`} mentor={{ ...mentor, id: `${mentor.id}-dup` }} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
