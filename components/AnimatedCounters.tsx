import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Code, FolderOpen, Award, Coffee } from 'lucide-react';

interface CounterItem {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
}

/**
 * Componente AnimatedCounters
 * Muestra estadísticas animadas que cuentan hacia arriba al entrar al viewport.
 */
const AnimatedCounters: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const counters: CounterItem[] = [
        { icon: <FolderOpen size={28} />, value: 10, suffix: "+", label: "Proyectos Completados" },
        { icon: <Code size={28} />, value: 10, suffix: "+", label: "Tecnologías Dominadas" },
        { icon: <Award size={28} />, value: 2, suffix: "", label: "Años de Experiencia" },
        { icon: <Coffee size={28} />, value: 500, suffix: "+", label: "Tazas de Café" },
    ];

    return (
        <div ref={ref} className="py-16 bg-transparent">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {counters.map((counter, index) => (
                        <motion.div
                            key={counter.label}
                            className="text-center flex flex-col items-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <div className="mb-3 text-primary-500">{counter.icon}</div>
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tabular-nums">
                                {isInView ? (
                                    <AnimatedNumber value={counter.value} suffix={counter.suffix} />
                                ) : (
                                    <span>0{counter.suffix}</span>
                                )}
                            </div>
                            <span className="text-sm text-zinc-400 font-medium">{counter.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/**
 * Sub-componente que anima un numero de 0 al valor final.
 */
const AnimatedNumber: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        });
        return () => controls.stop();
    }, [value]);

    return <span>{displayValue}{suffix}</span>;
};

export default AnimatedCounters;
