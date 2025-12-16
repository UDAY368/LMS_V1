"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    price: string;
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
    setCurrentUser: (user: User | null) => void;
    addCourse: (course: Omit<Course, 'id' | 'status' | 'studentsEnrolled' | 'rating'>) => void;
    updateCourseStatus: (courseId: string, status: CourseStatus) => void;
    enrollInCourse: (courseId: string) => void;
    updateProgress: (courseId: string, progress: number) => void;

    // Derived Stats Helpers
    getMentorStats: (mentorId: string) => { students: number; revenue: number; courses: number; rating: number };
    getAdminStats: () => { totalRevenue: number; totalUsers: number; totalMentors: number; pendingCourses: number };
    getLearnerStats: (studentId: string) => { inProgress: number; completed: number; hours: number; streak: number };
}

// --- Initial Mock State ---
const INITIAL_USERS: User[] = [
    { id: 'u1', name: 'Uday Learner', email: 'uday@example.com', role: 'learner', joinedDate: '2024-01-15' },
    { id: 'm1', name: 'Guru Vasishta', email: 'guru@example.com', role: 'mentor', joinedDate: '2023-11-20' },
    { id: 'a1', name: 'Admin User', email: 'admin@portal.com', role: 'admin', joinedDate: '2023-01-01' }
];

const INITIAL_COURSES: Course[] = [
    {
        id: 'c1',
        title: "Certified Meditation Teacher Training (Level 1)",
        description: "Comprehensive guide to becoming a certified meditation teacher.",
        price: "15000",
        mentorId: 'm1',
        mentorName: "Guru Vasishta",
        level: "Beginner",
        category: "Meditation",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        status: "Published",
        studentsEnrolled: 850,
        rating: 4.8,
        modules: []
    },
    {
        id: 'c2',
        title: "Advanced Breathwork Techniques",
        description: "Mastering the art of Pranayama.",
        price: "12000",
        mentorId: 'm1',
        mentorName: "Guru Vasishta",
        level: "Advanced",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        status: "Draft",
        studentsEnrolled: 0,
        rating: 0,
        modules: []
    },
    {
        id: 'c3',
        title: "Chakra Balancing Workshop",
        description: "Align your energy centers.",
        price: "5000",
        mentorId: 'm1',
        mentorName: "Guru Vasishta",
        level: "Intermediate",
        category: "Spiritual",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        status: "Pending", // For admin demo
        studentsEnrolled: 0,
        rating: 0,
        modules: []
    }
];

const INITIAL_ENROLLMENTS: Enrollment[] = [
    { courseId: 'c1', studentId: 'u1', progress: 35, completedLessons: ['l1', 'l2'], lastAccessed: '2 hours ago' }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // Default to Uday
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
    const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS);

    // --- Actions ---
    const addCourse = (newCourseData: Omit<Course, 'id' | 'status' | 'studentsEnrolled' | 'rating'>) => {
        const newCourse: Course = {
            ...newCourseData,
            id: `c${Date.now()}`,
            status: 'Pending',
            studentsEnrolled: 0,
            rating: 0,
        };
        setCourses(prev => [newCourse, ...prev]);
    };

    const updateCourseStatus = (courseId: string, status: CourseStatus) => {
        setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status } : c));
    };

    const enrollInCourse = (courseId: string) => {
        if (!currentUser) return;
        const exists = enrollments.find(e => e.courseId === courseId && e.studentId === currentUser.id);
        if (exists) return;

        setEnrollments(prev => [...prev, {
            courseId,
            studentId: currentUser.id,
            progress: 0,
            completedLessons: [],
            lastAccessed: 'Just now'
        }]);

        // Update student count
        setCourses(prev => prev.map(c => c.id === courseId ? { ...c, studentsEnrolled: c.studentsEnrolled + 1 } : c));
    };

    const updateProgress = (courseId: string, progress: number) => {
        if (!currentUser) return;
        setEnrollments(prev => prev.map(e =>
            (e.courseId === courseId && e.studentId === currentUser.id)
                ? { ...e, progress, lastAccessed: 'Just now' }
                : e
        ));
    };

    // --- Helpers ---
    const getMentorStats = (mentorId: string) => {
        const myCourses = courses.filter(c => c.mentorId === mentorId);
        const totalStudents = myCourses.reduce((sum, c) => sum + c.studentsEnrolled, 0);
        // Mock revenue logic: students * price (simplified)
        const totalRevenue = myCourses.reduce((sum, c) => sum + (c.studentsEnrolled * parseInt(c.price || '0', 10)), 0);

        return {
            courses: myCourses.length,
            students: totalStudents,
            revenue: totalRevenue,
            rating: 4.8 // Mocked average
        };
    };

    const getAdminStats = () => {
        // Platform wide
        const totalRevenue = courses.reduce((sum, c) => sum + (c.studentsEnrolled * parseInt(c.price || '0', 10)), 0);
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
        const inProgress = myEnrollments.filter(e => e.progress < 100 && e.progress > 0).length;

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
            setCurrentUser,
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
