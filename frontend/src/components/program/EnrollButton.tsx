"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

interface EnrollButtonProps {
    courseId: string;
    courseTitle: string;
}

export function EnrollButton({ courseId, courseTitle }: EnrollButtonProps) {
    const { currentUser, enrollInCourse } = useData();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleEnroll = async () => {
        if (!currentUser) {
            // User is not logged in, redirect to login with callback
            const redirectUrl = encodeURIComponent(`/programs/${courseId}`);
            router.push(`/login?redirect=${redirectUrl}`);
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            enrollInCourse(courseId);
            setLoading(false);
            setShowSuccess(true);
        }, 1500);
    };

    return (
        <>
            <Button
                size="lg"
                className="rounded-full h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/20"
                onClick={handleEnroll}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enrolling...
                    </>
                ) : (
                    <>
                        Enroll Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                )}
            </Button>

            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center text-center p-6 space-y-4">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-playfair font-bold">Enrollment Successful!</DialogTitle>
                            <DialogDescription className="text-lg text-foreground">
                                You have successfully enrolled in:
                                <br />
                                <span className="font-semibold text-primary">{courseTitle}</span>
                            </DialogDescription>
                        </DialogHeader>
                        <p className="text-muted-foreground text-sm">
                            You can now access all course materials and start your journey.
                        </p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <Button asChild className="w-full sm:w-auto min-w-[150px]">
                            <Link href="/dashboard/learning">Go to My Courses</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
