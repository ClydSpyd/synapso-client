import React from 'react';

export interface StaggerContainerProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    staggerDelay?: number;
    randomFactor?: number;
    className?: string;
}