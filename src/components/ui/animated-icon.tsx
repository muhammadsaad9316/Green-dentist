"use client";

import React, { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
    animationData: Record<string, unknown>;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
}

export const AnimatedIcon = ({
    animationData,
    className,
    loop = true,
    autoplay = true
}: AnimatedIconProps) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    if (!animationData) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={loop}
                autoplay={autoplay}
                className="w-full h-full"
            />
        </div>
    );
};
