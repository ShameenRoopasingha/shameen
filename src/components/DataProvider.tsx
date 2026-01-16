'use client';

import React, { createContext, useContext } from 'react';
import { Profile, Experience, Project, Skill, Reference, Feedback } from '@/lib/data';

type DataContextType = {
    profile: Profile;
    experience: Experience[];
    projects: Project[];
    skills: Skill[];
    references: Reference[];
    feedbacks: Feedback[];
};

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({
    children,
    data
}: {
    children: React.ReactNode;
    data: DataContextType;
}) {
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}

export function usePortfolioData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('usePortfolioData must be used within a DataProvider');
    }
    return context;
}
