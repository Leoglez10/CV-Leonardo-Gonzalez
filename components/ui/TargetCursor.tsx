
import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

interface TargetCursorProps {
    targetSelector?: string;
    spinDuration?: number;
    hideDefaultCursor?: boolean;
    hoverDuration?: number;
    parallaxOn?: boolean;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
    targetSelector = '.cursor-target',
    spinDuration = 2,
    hideDefaultCursor = true,
    hoverDuration = 0.2,
    parallaxOn = true
}) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
    const spinTl = useRef<gsap.core.Timeline | null>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    const isActiveRef = useRef(false);
    const targetCornerPositionsRef = useRef<{ x: number, y: number }[] | null>(null);
    const tickerFnRef = useRef<(() => void) | null>(null);
    const activeStrengthRef = useRef({ current: 0 });

    const isMobile = useMemo(() => {
        if (typeof window === 'undefined') return false;
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
        return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
    }, []);

    const constants = useMemo(
        () => ({
            borderWidth: 3,
            cornerSize: 12
        }),
        []
    );

    const moveCursor = useCallback((x: number, y: number) => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
            x,
            y,
            duration: 0.1,
            ease: 'power3.out'
        });
    }, []);

    useEffect(() => {
        if (isMobile || !cursorRef.current) return;

        const originalCursor = document.body.style.cursor;
        if (hideDefaultCursor) {
            document.body.style.cursor = 'none';
        }

        const cursor = cursorRef.current;
        cornersRef.current = cursor.querySelectorAll('.target-cursor-corner') as NodeListOf<HTMLDivElement>;

        // Initial setup for corners manually via GSAP since we removed CSS transforms 
        // to avoid conflicts.
        const corners = cornersRef.current;
        if (corners && corners.length === 4) {
            // TL
            gsap.set(corners[0], { xPercent: -150, yPercent: -150 });
            // TR
            gsap.set(corners[1], { xPercent: 50, yPercent: -150 });
            // BR
            gsap.set(corners[2], { xPercent: 50, yPercent: 50 });
            // BL
            gsap.set(corners[3], { xPercent: -150, yPercent: 50 });
        }

        let activeTarget: HTMLElement | null = null;
        let currentLeaveHandler: (() => void) | null = null;
        let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

        const cleanupTarget = (target: HTMLElement) => {
            if (currentLeaveHandler) {
                target.removeEventListener('mouseleave', currentLeaveHandler);
            }
            currentLeaveHandler = null;
        };

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        const createSpinTimeline = () => {
            if (spinTl.current) {
                spinTl.current.kill();
            }
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        };

        createSpinTimeline();

        const tickerFn = () => {
            if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
                return;
            }

            const strength = activeStrengthRef.current.current;
            if (strength === 0) return;

            const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
            const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;

            const corners = Array.from(cornersRef.current);
            corners.forEach((corner, i) => {
                const currentX = gsap.getProperty(corner, 'x') as number;
                const currentY = gsap.getProperty(corner, 'y') as number;

                if (!targetCornerPositionsRef.current || !targetCornerPositionsRef.current[i]) return;

                const targetX = targetCornerPositionsRef.current[i].x - cursorX;
                const targetY = targetCornerPositionsRef.current[i].y - cursorY;

                const finalX = currentX + (targetX - currentX) * strength;
                const finalY = currentY + (targetY - currentY) * strength;

                const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

                gsap.to(corner, {
                    x: finalX,
                    y: finalY,
                    duration: duration,
                    ease: duration === 0 ? 'none' : 'power1.out',
                    overwrite: 'auto'
                });
            });
        };

        tickerFnRef.current = tickerFn;

        const moveHandler = (e: MouseEvent) => {
            moveCursor(e.clientX, e.clientY);

            // Extra safety check: if we moved fast and left the target but missed mouseleave?
            // Use efficient check: contains.
            if (activeTarget && currentLeaveHandler) {
                const rect = activeTarget.getBoundingClientRect();
                const pad = 20; // Allow some buffer or exactly rect?
                // Simple rect check
                if (e.clientX < rect.left - pad || e.clientX > rect.right + pad ||
                    e.clientY < rect.top - pad || e.clientY > rect.bottom + pad) {
                    // We are outside. Force leave.
                    // But wait, user might be on a child element that is outside? No, closest check handles hierarchy.
                    // What if the target is weirdly shaped?
                    // elementFromPoint is safer but heavier.
                    // Let's rely on standard event propagation mostly, this is fallback.
                    // Actually, let's skip this for now if the visual glitch was CSS transform conflict.
                }
            }
        };
        window.addEventListener('mousemove', moveHandler);

        const scrollHandler = () => {
            if (!activeTarget || !cursorRef.current) return;
            const mouseX = gsap.getProperty(cursorRef.current, 'x') as number;
            const mouseY = gsap.getProperty(cursorRef.current, 'y') as number;
            const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);

            const isStillOverTarget =
                elementUnderMouse &&
                (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);

            if (!isStillOverTarget) {
                if (currentLeaveHandler) {
                    currentLeaveHandler();
                }
            }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

        const mouseDownHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
        };

        const mouseUpHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        const leaveHandler = () => {
            if (!tickerFnRef.current) return;
            gsap.ticker.remove(tickerFnRef.current);

            isActiveRef.current = false;
            targetCornerPositionsRef.current = null;
            gsap.set(activeStrengthRef.current, { current: 0 });

            if (cornersRef.current) {
                const corners = Array.from(cornersRef.current);
                gsap.killTweensOf(corners);

                const tl = gsap.timeline();
                corners.forEach((corner) => {
                    // Animate x/y to 0. 
                    // This resets them to the CSS-like position (governed by xPercent set in init)
                    tl.to(
                        corner,
                        {
                            x: 0,
                            y: 0,
                            duration: 0.3,
                            ease: 'power3.out'
                        },
                        0
                    );
                });
            }

            resumeTimeout = setTimeout(() => {
                if (!activeTarget && cursorRef.current && spinTl.current) {
                    const currentRotation = gsap.getProperty(cursorRef.current, 'rotation') as number;
                    const normalizedRotation = currentRotation % 360;
                    spinTl.current.kill();

                    spinTl.current = gsap
                        .timeline({ repeat: -1 })
                        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });

                    gsap.to(cursorRef.current, {
                        rotation: normalizedRotation + 360,
                        duration: spinDuration * (1 - normalizedRotation / 360),
                        ease: 'none',
                        onComplete: () => {
                            spinTl.current?.restart();
                        }
                    });
                }
                resumeTimeout = null;
            }, 50);
        };

        const enterHandler = (e: MouseEvent) => {
            const directTarget = e.target as HTMLElement;
            const target = directTarget.closest(targetSelector) as HTMLElement | null;

            if (!target || !cursorRef.current || !cornersRef.current) return;
            if (activeTarget === target) return;

            if (activeTarget) {
                cleanupTarget(activeTarget);
                // Implicitly we just switch targets.
            }

            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }

            activeTarget = target;
            const corners = Array.from(cornersRef.current);
            corners.forEach(corner => gsap.killTweensOf(corner));

            gsap.killTweensOf(cursorRef.current, 'rotation');
            spinTl.current?.pause();
            gsap.set(cursorRef.current, { rotation: 0 });

            const rect = target.getBoundingClientRect();
            const { borderWidth, cornerSize } = constants;
            const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
            const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;

            targetCornerPositionsRef.current = [
                { x: rect.left - borderWidth, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
                { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
            ];

            isActiveRef.current = true;
            if (tickerFnRef.current) {
                gsap.ticker.add(tickerFnRef.current);
            }

            gsap.to(activeStrengthRef.current, {
                current: 1,
                duration: hoverDuration,
                ease: 'power2.out'
            });

            const scopedLeave = () => {
                leaveHandler();
                cleanupTarget(target);
                // Also null activeTarget? 
                // In leaveHandler we check activeTarget in timeout.
                // We should clear it here to allow resume logic to work.
                activeTarget = null;
            };

            currentLeaveHandler = scopedLeave;
            target.addEventListener('mouseleave', scopedLeave);
        };

        window.addEventListener('mouseover', enterHandler, { passive: true });

        return () => {
            if (tickerFnRef.current) {
                gsap.ticker.remove(tickerFnRef.current);
            }

            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseover', enterHandler);
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);

            if (activeTarget) {
                cleanupTarget(activeTarget);
            }

            spinTl.current?.kill();
            document.body.style.cursor = originalCursor;

            isActiveRef.current = false;
            targetCornerPositionsRef.current = null;
        };
    }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

    if (isMobile) {
        return null;
    }

    return (
        <div ref={cursorRef} className="target-cursor-wrapper">
            <div ref={dotRef} className="target-cursor-dot" />
            <div className="target-cursor-corner corner-tl" />
            <div className="target-cursor-corner corner-tr" />
            <div className="target-cursor-corner corner-br" />
            <div className="target-cursor-corner corner-bl" />
        </div>
    );
};

export default TargetCursor;
