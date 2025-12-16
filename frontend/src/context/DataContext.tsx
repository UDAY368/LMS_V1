"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PROGRAMS, MENTORS } from '@/lib/mock-data';

// --- Types ---
export type Role = 'learner' | 'mentor' | 'admin';
export type CourseStatus = 'Draft' | 'Pending' | 'Published' | 'Rejected';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    joinedDate: string;
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'quiz' | 'text';
    isCompleted?: boolean; // Per user context, but simple for now
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    mentorId: string;
    mentorName: string;
    level: string;
    category: string;
    image: string;
    status: CourseStatus;
    modules: Module[];
    studentsEnrolled: number;
    rating: number;
    totalDuration?: string;
}

export interface Enrollment {
    courseId: string;
    studentId: string;
    progress: number; // 0-100
    completedLessons: string[];
    lastAccessed: string;
}

export interface AppState {
    currentUser: User | null; // Simulating logged-in user
    users: User[];
    courses: Course[];
    enrollments: Enrollment[];
}

export interface DataContextType extends AppState {
    // Actions
    // Actions
    login: (user: User) => void;
    logout: () => void;
    addCourse: (course: Omit<Course, 'id' | 'status' | 'studentsEnrolled' | 'rating'>) => void;
    updateCourseStatus: (courseId: string, status: CourseStatus) => void;
    enrollInCourse: (courseId: string) => void;
    updateProgress: (courseId: string, progress: number) => void;

    // Derived Stats Helpers
    getMentorStats: (mentorId: string) => { totalStudents: number; activeCourses: number; pendingReviews: number; averageRating: number; revenue: number };
    getAdminStats: () => { totalRevenue: number; totalUsers: number; totalMentors: number; pendingCourses: number };
    getLearnerStats: (studentId: string) => { inProgress: number; completed: number; hours: number; streak: number };
}

// --- Initial Mock State ---
const INITIAL_USERS: User[] = [
    { id: 'u1', name: 'Uday Learner', email: 'uday@example.com', role: 'learner', joinedDate: '2024-01-15' },
    { id: 'm1', name: 'Guru Vasishta', email: 'guru@example.com', role: 'mentor', joinedDate: '2023-11-20' },
    { id: 'a1', name: 'Admin User', email: 'admin@portal.com', role: 'admin', joinedDate: '2023-01-01' }
];

const INITIAL_COURSES: Course[] = PROGRAMS.map((p: any) => {
    const mentor = MENTORS.find((m: any) => m.name === p.mentor);
    return {
        id: p.id,
        title: p.title,
        description: p.description,
        mentorId: mentor ? mentor.id : 'm1',
        mentorName: p.mentor,
        level: p.level,
        category: p.category,
        image: p.image,
        status: 'Published',
        studentsEnrolled: p.enrolledCount,
        rating: p.rating,
        totalDuration: p.duration,
        modules: p.modules.map((m: any, mIdx: number) => ({
            id: `m${p.id}-${mIdx}`,
            title: m.title,
            lessons: m.subModules.map((sm: any, lIdx: number) => ({
                id: `l${p.id}-${mIdx}-${lIdx}`,
                title: sm.title,
                duration: sm.duration,
                type: 'video', // Default
                isCompleted: false
            }))
        }))
    };
});

const INITIAL_ENROLLMENTS: Enrollment[] = [
    { courseId: 'p1', studentId: 'u1', progress: 35, completedLessons: ['l1', 'l2'], lastAccessed: '2 hours ago' }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
    const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS);

    // Load from LocalStorage
    useEffect(() => {
        const DATA_VERSION = 'v1.1'; // Increment when critical data structure changes
        const storedVersion = localStorage.getItem('data_version');

        if (storedVersion !== DATA_VERSION) {
            // Version mismatch - Clear stale data to force re-initialization
            console.log('Data version mismatch. Clearing stale data.');
            localStorage.removeItem('courses');
            localStorage.removeItem('enrollments');
            // We keep 'currentUser' effectively keeping them logged in, 
            // but we could clear that too if needed. For now, let's keep it convenience.
            localStorage.setItem('data_version', DATA_VERSION);

            // Re-save initial state to storage so it's fresh
            // Actually, we don't need to save INITIAL_... to storage immediately, 
            // the state `courses` is already initialized to INITIAL_COURSES.
            // We just let the next effect cycle or action update storage.
            return;
        }

        // Version match - Load data
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }

        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            setCourses(JSON.parse(storedCourses));
        }

        const storedEnrollments = localStorage.getItem('enrollments');
        if (storedEnrollments) {
            setEnrollments(JSON.parse(storedEnrollments));
        }
    }, []);

    // --- Actions ---
    const login = (user: User) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };
    const addCourse = (newCourseData: Omit<Course, 'id' | 'status' | 'studentsEnrolled' | 'rating'>) => {
        const newCourse: Course = {
            ...newCourseData,
            id: `c${Date.now()}`,
            status: 'Pending',
            studentsEnrolled: 0,
            rating: 0,
        };
        setCourses(prev => {
            const updated = [newCourse, ...prev];
            localStorage.setItem('courses', JSON.stringify(updated));
            return updated;
        });
    };

    const updateCourseStatus = (courseId: string, status: CourseStatus) => {
        setCourses(prev => {
            const updated = prev.map(c => c.id === courseId ? { ...c, status } : c);
            localStorage.setItem('courses', JSON.stringify(updated));
            return updated;
        });
    };

    const enrollInCourse = (courseId: string) => {
        if (!currentUser) return;
        const exists = enrollments.find(e => e.courseId === courseId && e.studentId === currentUser.id);
        if (exists) return;

        setEnrollments(prev => {
            const updated = [...prev, {
                courseId,
                studentId: currentUser.id,
                progress: 0,
                completedLessons: [],
                lastAccessed: 'Just now'
            }];
            localStorage.setItem('enrollments', JSON.stringify(updated));
            return updated;
        });

        // Update student count
        setCourses(prev => {
            const updated = prev.map(c => c.id === courseId ? { ...c, studentsEnrolled: c.studentsEnrolled + 1 } : c);
            localStorage.setItem('courses', JSON.stringify(updated));
            return updated;
        });
    };

    const updateProgress = (courseId: string, progress: number) => {
        if (!currentUser) return;
        setEnrollments(prev => {
            const updated = prev.map(e =>
                (e.courseId === courseId && e.studentId === currentUser.id)
                    ? { ...e, progress, lastAccessed: 'Just now' }
                    : e
            );
            localStorage.setItem('enrollments', JSON.stringify(updated));
            return updated;
        });
    };

    // --- Helpers ---
    const getMentorStats = (mentorId: string) => {
        const myCourses = courses.filter(c => c.mentorId === mentorId);
        const totalStudents = myCourses.reduce((acc, curr) => acc + curr.studentsEnrolled, 0);
        const activeCourses = myCourses.filter(c => c.status === 'Published').length;

        return {
            totalStudents,
            activeCourses,
            pendingReviews: 5, // Mock
            averageRating: 4.8, // Mock
            revenue: totalStudents * 1000 // Mock revenue: 1000 per student
        };
    };

    const getAdminStats = () => {
        // Platform wide
        const totalRevenue = 1542000; // Mocked Total Donations
        const pendingCourses = courses.filter(c => c.status === 'Pending').length;
        return {
            totalRevenue,
            totalUsers: users.length + 8500, // + Mock base
            totalMentors: users.filter(u => u.role === 'mentor').length + 140, // + Mock base
            pendingCourses
        };
    };

    const getLearnerStats = (studentId: string) => {
        const myEnrollments = enrollments.filter(e => e.studentId === studentId);
        const completed = myEnrollments.filter(e => e.progress === 100).length;
        const inProgress = myEnrollments.filter(e => e.progress < 100).length;

        return {
            inProgress,
            completed,
            hours: 12.5, // Mock
            streak: 5
        };
    };

    return (
        <DataContext.Provider value={{
            currentUser,
            users,
            courses,
            enrollments,
            login,
            logout,
            addCourse,
            updateCourseStatus,
            enrollInCourse,
            updateProgress,
            getMentorStats,
            getAdminStats,
            getLearnerStats
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
