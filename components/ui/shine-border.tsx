"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps {
    borderRadius?: number;
    borderWidth?: number;
    duration?: number;
    color?: TColorProp;
    className?: string;
    children: React.ReactNode;
}

/**
 * @name Shine Border
 * @description An animated background border effect.
 * @component
 * @param {number} [borderRadius=8] - The radius of the border.
 * @param {number} [borderWidth=1] - The width of the border.
 * @param {number} [duration=14] - The duration of the animation in seconds.
 * @param {string|string[]} [color="#000000"] - The color(s) of the border.
 * @param {string} [className] - The class name of the component.
 * @param {React.ReactNode} children - The children of the component.
 * @returns {JSX.Element} The Shine Border component.
 */
export function ShineBorder({
    borderRadius = 8,
    borderWidth = 1,
    duration = 14,
    color = "#000000",
    className,
    children,
}: ShineBorderProps) {
    return (
        <div
            style={
                {
                    "--border-radius": `${borderRadius}px`,
                } as React.CSSProperties
            }
            className={cn(
                "relative min-h-[60px] w-full rounded-[--border-radius] bg-white text-black dark:bg-black dark:text-white p-[1px]",
                className,
            )}
        >
            <div
                style={
                    {
                        "--border-width": `${borderWidth}px`,
                        "--border-radius": `${borderRadius}px`,
                        "--duration": `${duration}s`,
                        "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                        "--background-radial-gradient": `radial-gradient(transparent,transparent, ${Array.isArray(color) ? color.join(",") : color
                            }, transparent, transparent)`,
                    } as React.CSSProperties
                }
                className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine`}
            ></div>
            {children}
        </div>
    );
}
