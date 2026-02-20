"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundLines = ({
    children,
    className,
    svgOptions,
}: {
    children?: React.ReactNode;
    className?: string;
    svgOptions?: {
        duration?: number;
    };
}) => {
    return (
        <div
            className={cn(
                "relative h-full w-full overflow-hidden bg-transparent",
                className
            )}
        >
            <SVG svgOptions={svgOptions} />
            <div className="relative z-10 w-full">{children}</div>
        </div>
    );
};

const SVG = ({
    svgOptions,
}: {
    svgOptions?: {
        duration?: number;
    };
}) => {
    const paths = [
        // Curvas suaves simulando flujo
        "M-200 200 C 200 -100, 800 600, 1600 200",
        "M-200 400 C 400 100, 900 800, 1600 400",
        "M-200 600 C 600 300, 1000 900, 1600 600",
        "M-200 800 C 800 500, 1200 1000, 1600 800",
        "M-100 0 C 100 200, 500 400, 900 200 C 1300 0, 1500 200, 1700 400",
        "M-100 1000 C 300 800, 700 600, 1100 800 C 1500 1000, 1700 800, 1900 600",
    ];

    const colors = [
        "#3B82F6", // blue-500
        "#8B5CF6", // violet-500
        "#10B981", // emerald-500
        "#EC4899", // pink-500
        "#6366F1", // indigo-500
    ];

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <svg
                className="w-full h-full opacity-40"
                viewBox="0 0 1440 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                {paths.map((path, idx) => (
                    <motion.path
                        key={idx}
                        d={path}
                        stroke={colors[idx % colors.length]}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: 1,
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: svgOptions?.duration || 10 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: idx * 0.8,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};
