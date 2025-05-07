import React, { ReactNode } from 'react';

export interface StepProps {
    children: ReactNode | ReactNode[];
}

export const Step = ({children}: StepProps) => {
    return <>{children}</>;
};

