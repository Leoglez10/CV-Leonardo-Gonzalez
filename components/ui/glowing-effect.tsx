"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    variant?: "default" | "white";
    glow?: boolean;
    className?: string;
    disabled?: boolean;
    movementDuration?: number;
    borderWidth?: number;
}

export const GlowingEffect = memo(
    ({
        blur = 0,
        inactiveZone = 0.7,
        proximity = 0,
        spread = 20,
        variant = "default",
        glow = false,
        className,
        movementDuration = 2,
        borderWidth = 1,
        disabled = false,
    }: GlowingEffectProps) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [position, setPosition] = useState<{ x: number; y: number }>({
            x: 0,
            y: 0,
        });
        const [opacity, setOpacity] = useState(0);

        const handleMouseMove = useCallback(
            (e: MouseEvent) => {
                if (!containerRef.current || disabled) return;

                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (
                    x < -proximity ||
                    x > rect.width + proximity ||
                    y < -proximity ||
                    y > rect.height + proximity
                ) {
                    setOpacity(0);
                    return;
                }

                setPosition({ x, y });
                setOpacity(1);
            },
            [proximity, disabled]
        );

        useEffect(() => {
            // Track mouse globally or on window to ensure smooth tracking even near edges
            window.addEventListener("mousemove", handleMouseMove);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, [handleMouseMove]);

        return (
            <div
                ref={containerRef}
                className={cn(
                    "pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300",
                    glow && "opacity-100",
                    className
                )}
                style={{
                    opacity: glow ? 1 : opacity,
                }}
            >
                {/* Glow Layer */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-[inherit]",
                        variant === "white" && "bg-white",
                        variant === "default" && "bg-slate-100"
                    )}
                    style={{
                        background: `radial-gradient(${spread * 10}px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 100%)`
                    }}
                />
                {/* Border Layer (if intended as border glow) */}
            </div>
        );
    }
);

GlowingEffect.displayName = "GlowingEffect";
