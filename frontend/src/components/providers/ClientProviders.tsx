"use client";

import { DataProvider } from "@/context/DataContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <DataProvider>
            {children}
        </DataProvider>
    );
}
