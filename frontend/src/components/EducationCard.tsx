// frontend/src/components/EducationCard.tsx

import { motion, useReducedMotion } from 'framer-motion';
import type { EducationEntry } from '../data/education';

const springy = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

const hoverSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 22,
};

const themes = {
  blue: {
    photo:
      'bg-gradient-to-br from-sky-100/40 via-white/25 to-blue-300/20 border-white/50',
    panel:
      'bg-gradient-to-br from-white/55 via-sky-100/30 to-blue-200/20 border-white/50',
    badge:
      'bg-gradient-to-r from-sky-100/70 to-blue-100/50 border-sky-200/70 text-sky-800',
    accent: 'text-sky-700',
    ring: 'ring-sky-300/50',
    glow: 'bg-sky-300/40',
    underline: 'bg-sky-400/70',
    sheen: 'via-sky-100/80',
  },

  red: {
    photo:
      'bg-gradient-to-br from-rose-100/40 via-white/25 to-pink-300/20 border-white/50',
    panel:
      'bg-gradient-to-br from-white/55 via-rose-100/30 to-pink-200/20 border-white/50',
    badge:
      'bg-gradient-to-r from-rose-100/70 to-pink-100/50 border-rose-200/70 text-rose-800',
    accent: 'text-rose-700',
    ring: 'ring-rose-300/50',
    glow: 'bg-rose-300/40',
    underline: 'bg-rose-400/70',
    sheen: 'via-rose-100/80',
  },
};

export default function EducationCard({
  entry,
  index = 0,
}: {
  entry: EducationEntry;
  index?: number;
}) {
  const theme = themes[entry.theme];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -8, transition: hoverSpring }
      }
      transition={{ ...springy, delay: index * 0.08 }}
      className="group flex w-full max-w-xs flex-col items-center"
    >
      {/* Level */}
      <p className={`mb-10 text-sm font-semibold tracking-widest uppercase ${theme.accent}`}>
        {entry.level}
      </p>

      {/* Photo */}
      <div className="relative w-full">
        {/* Floating Logo */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <div className="relative flex h-16 w-16 items-center justify-center">

            {/* Ambient breathing glow */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-xl ${theme.glow}`}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3,
                    }
              }
            />

            <div
              className={`
                relative
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border
                border-white/70
                bg-white/90
                backdrop-blur-xl
                shadow-[0_15px_35px_rgba(0,0,0,0.18)]
                ring-4
                ring-white/40
                transition-all
                duration-300
                group-hover:ring-8
                group-hover:${theme.ring}
              `}
            >
              <img
                src={entry.logo}
                alt={entry.school}
                className="h-10 w-10 rounded-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div
        className={`
          mt-12
          w-full
          rounded-[1.75rem]
          border
          px-6
          py-6
          text-center
          backdrop-blur-3xl
          shadow-[0_15px_45px_rgba(0,0,0,0.12)]
          ring-1
          ring-white/30
          transition-all
          duration-300
          group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.16)]
          ${theme.panel}
        `}
      >
        <h3 className="text-lg font-bold leading-tight text-slate-900">
          {entry.degree}
        </h3>

        <p className={`mt-3 inline-block text-sm font-semibold ${theme.accent}`}>
          {entry.school}
          <span
            className={`
              block
              h-[2px]
              w-0
              rounded-full
              transition-all
              duration-300
              ease-out
              group-hover:w-full
              ${theme.underline}
            `}
          />
        </p>
      </div>

      {/* Date Badge */}
      <div
        className={`
          relative
          mt-5
          inline-flex
          overflow-hidden
          rounded-full
          border
          px-5
          py-2
          text-sm
          font-semibold
          tracking-wide
          backdrop-blur-xl
          shadow-lg
          transition-transform
          duration-300
          group-hover:scale-105
          ${theme.badge}
        `}
      >
        <span className="relative z-10">{entry.dateRange}</span>

        {/* Sheen sweep on hover */}
        <span
          className={`
            pointer-events-none
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            ${theme.sheen}
            to-transparent
            transition-transform
            duration-700
            ease-out
            group-hover:translate-x-full
          `}
        />
      </div>
    </motion.div>
  );
}