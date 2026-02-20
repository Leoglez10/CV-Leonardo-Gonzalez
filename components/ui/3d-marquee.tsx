"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ThreeDMarquee = ({
    className,
    images,
    duration = 20,
}: {
    className?: string;
    images: string[];
    duration?: number;
}) => {
    // Dividir las imágenes en 3 columnas para el efecto de "muro"
    const [columns, setColumns] = useState<string[][]>([[], [], []]);

    useEffect(() => {
        const cols: string[][] = [[], [], []];
        images.forEach((img, i) => {
            cols[i % 3].push(img);
        });
        setColumns(cols);
    }, [images]);

    return (
        <div
            className={cn(
                "relative flex h-full w-full overflow-hidden bg-transparent perspective-[1000px]",
                className
            )}
        >
            <div className="flex w-full h-full items-center justify-center gap-10 [transform-style:preserve-3d] [transform:rotateX(20deg)_rotateY(-10deg)_rotateZ(20deg)_scale(1.3)]">
                {columns.map((colImages, colIndex) => (
                    <MarqueeColumn
                        key={colIndex}
                        images={colImages}
                        duration={duration + colIndex * 5} // Duraciones variadas para efecto orgánico
                        reverse={colIndex % 2 === 1} // Alternar dirección
                    />
                ))}
            </div>

            {/* Overlay de degradado para suavizar bordes si es necesario */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-20 pointer-events-none z-10" />
        </div>
    );
};

const MarqueeColumn = ({
    images,
    duration,
    reverse,
}: {
    images: string[];
    duration: number;
    reverse?: boolean;
}) => {
    return (
        <div className="flex flex-col gap-8 relative h-[200%] w-60 overflow-hidden">
            <motion.div
                initial={{ y: reverse ? -1000 : 0 }}
                animate={{ y: reverse ? 0 : -1000 }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-8 pb-8"
            >
                {/* Duplicamos las imágenes varias veces para asegurar el loop infinito sin espacios */}
                {[...images, ...images, ...images, ...images].map((src, idx) => (
                    <div
                        key={idx}
                        className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200/20 bg-slate-900/5 shadow-xl"
                    >
                        <img
                            src={src}
                            alt="Project preview"
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
