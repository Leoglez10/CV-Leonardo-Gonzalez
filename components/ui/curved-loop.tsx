
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CurvedLoopProps {
    marqueeText: string;
    speed?: number;
    curveAmount?: number; // Height of the curve
    direction?: 'left' | 'right';
    interactive?: boolean;
    className?: string;
}

export const CurvedLoop: React.FC<CurvedLoopProps> = ({
    marqueeText,
    speed = 3, // speed factor
    curveAmount = 50,
    direction = 'left',
    interactive = false,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<SVGTextElement>(null);
    const textPathRef = useRef<SVGTextPathElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [unitWidth, setUnitWidth] = useState(0);

    // Animation state refs (mutable, no re-renders)
    const requestRef = useRef<number>();
    const currentOffsetString = useRef<number>(0);
    const isDragging = useRef<boolean>(false);
    const lastX = useRef<number>(0);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: Math.max(100, Math.abs(curveAmount) * 2 + 60)
                });
            }
            if (textRef.current) {
                setUnitWidth(textRef.current.getComputedTextLength());
            }
        };

        // Initial measurement
        updateDimensions();

        // Wait for font load potentially?
        const timeout = setTimeout(updateDimensions, 100);

        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timeout);
        };
    }, [curveAmount, marqueeText]);

    // Animation Loop
    const animate = useCallback(() => {
        if (!textPathRef.current || unitWidth === 0) {
            requestRef.current = requestAnimationFrame(animate);
            return;
        }

        // Calculate movement
        let moveStep = 0;

        if (isDragging.current) {
            // No auto movement while dragging
            moveStep = 0;
        } else {
            // Auto scroll speed
            moveStep = speed * 0.5;
        }

        // Update Offset
        if (direction === 'left') {
            currentOffsetString.current -= moveStep;
        } else {
            currentOffsetString.current += moveStep;
        }

        // Wrap logic
        if (currentOffsetString.current <= -unitWidth) {
            currentOffsetString.current += unitWidth;
        }
        if (currentOffsetString.current > 0) {
            currentOffsetString.current -= unitWidth;
        }

        // Apply to DOM
        textPathRef.current.setAttribute('startOffset', `${currentOffsetString.current}px`);

        requestRef.current = requestAnimationFrame(animate);
    }, [unitWidth, speed, direction]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [animate]);

    // Drag Handlers
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        if (!interactive) return;
        isDragging.current = true;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        lastX.current = clientX;
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging.current || !interactive) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const delta = clientX - lastX.current;
        lastX.current = clientX;

        // Apply drag delta directly to offset
        currentOffsetString.current += delta;

        // Check bounds immediately during drag
        if (currentOffsetString.current <= -unitWidth) {
            currentOffsetString.current += unitWidth;
        }
        if (currentOffsetString.current > 0) {
            currentOffsetString.current -= unitWidth;
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const pathId = `curved-text-path-${React.useId()}`;
    const width = dimensions.width;
    const height = dimensions.height;
    const centerY = height / 2;
    const pathData = `M 0 ${centerY} Q ${width / 2} ${centerY + curveAmount} ${width} ${centerY}`;

    // Need minimal copies to cover width + 1 unit.
    const copies = unitWidth > 0 ? Math.ceil(width / unitWidth) + 2 : 4;
    const repeatedText = new Array(copies).fill(marqueeText).join(' ');

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full overflow-visible select-none",
                interactive ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
                className
            )}
            style={{ height: height }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchEnd={handleMouseUp}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                overflow="visible"
            >
                <path
                    id={pathId}
                    d={pathData}
                    fill="none"
                    stroke="transparent"
                />

                {/* Hidden text for measurement */}
                <text
                    ref={textRef}
                    className={cn("invisible", className)}
                    aria-hidden="true"
                    style={{ fontSize: 'clamp(1rem, 5vw, 2rem)' }}
                >
                    {marqueeText}
                </text>

                <text
                    width={width}
                    className={cn(
                        "uppercase font-bold tracking-widest fill-current",
                    )}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    style={{
                        fontSize: 'clamp(1rem, 5vw, 2rem)',
                    }}
                >
                    <textPath
                        ref={textPathRef}
                        href={`#${pathId}`}
                        startOffset="0px"
                        className=""
                    >
                        {repeatedText}
                        {/* No <animate> tag - controlled via JS */}
                    </textPath>
                </text>
            </svg>
        </div>
    );
};

export default CurvedLoop;
