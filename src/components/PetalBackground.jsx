import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function PetalBackground({ count = 18 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      xStart: Math.random() * 100,
      xEnd: (Math.random() * 100) + (Math.random() * 20 - 10),
      size: Math.random() * 14 + 10,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      color: i % 3 === 0 ? 'rgba(247, 220, 213, 0.75)' : i % 3 === 1 ? 'rgba(238, 194, 183, 0.65)' : 'rgba(255, 240, 240, 0.85)',
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            width: petal.size,
            height: petal.size * 1.35,
            borderRadius: '50% 10% 50% 50%',
            backgroundColor: petal.color,
            boxShadow: '0 2px 8px rgba(224, 158, 144, 0.2)',
            filter: 'blur(0.5px)',
          }}
          initial={{
            top: '-5%',
            left: `${petal.xStart}%`,
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            top: '105%',
            left: `${petal.xEnd}%`,
            rotate: petal.rotation + 360,
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
