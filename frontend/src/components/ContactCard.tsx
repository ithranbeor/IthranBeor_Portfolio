// frontend/src/components/ContactCard.tsx
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiIndeed } from 'react-icons/si';
import { FaGithub, FaYahoo, FaApple } from 'react-icons/fa6';
import { FiChevronLeft, FiChevronRight, FiCheck, FiFileText, FiDownload, FiArrowLeft } from 'react-icons/fi';
import type { CSSProperties } from 'react';

import gmailIcon from '../assets/icons/gmail.png';
import linkedinIcon from '../assets/icons/linkedin.png';

const springy = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

interface ContactCardData {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
  copyValue?: string;
  download?: string;
  image?: string;
  Icon?: React.ComponentType<{ size?: number; style?: CSSProperties }>;
  iconColor?: string;
  gradient: string; // tailwind gradient classes
}

const GMAIL_ADDRESS = 'ithranbeorturno07@gmail.com';
const ICLOUD_ADDRESS = 'ithranbeor.turno@icloud.com';
const YAHOO_ADDRESS = 'ithranbeorturno07@gmail.com';

const baseCards: ContactCardData[] = [
  {
    id: 'gmail',
    title: 'Gmail',
    subtitle: GMAIL_ADDRESS,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_ADDRESS}`,
    image: gmailIcon,
    gradient: 'from-[#4285F4] via-[#34A853] to-[#FBBC05]',
  },
  {
    id: 'icloud',
    title: 'iCloud',
    subtitle: ICLOUD_ADDRESS,
    copyValue: ICLOUD_ADDRESS,
    Icon: FaApple,
    iconColor: '#ffffff',
    gradient: 'from-[#3A3A3C] via-[#8E8E93] to-[#D1D1D6]',
  },
  {
    id: 'yahoo',
    title: 'Yahoo Mail',
    subtitle: YAHOO_ADDRESS,
    href: `https://compose.mail.yahoo.com/?to=${YAHOO_ADDRESS}`,
    Icon: FaYahoo,
    iconColor: '#ffffff',
    gradient: 'from-[#430297] via-[#6001D2] to-[#7B2BE2]',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: '@ithran-beor-turno',
    href: 'https://www.linkedin.com/in/ithran-beor-turno-95b869414/',
    image: linkedinIcon,
    gradient: 'from-[#004182] via-[#0A66C2] to-[#0077B5]',
  },
  {
    id: 'github',
    title: 'GitHub',
    subtitle: '@ithranbeor',
    href: 'https://github.com/ithranbeor',
    Icon: FaGithub,
    iconColor: '#ffffff',
    gradient: 'from-[#0D1117] via-[#24292F] to-[#57606A]',
  },
  {
    id: 'indeed',
    title: 'Indeed',
    subtitle: 'View my profile',
    href: 'https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-homepage',
    Icon: SiIndeed,
    iconColor: '#ffffff',
    gradient: 'from-[#163B65] via-[#2557A7] to-[#2164F3]',
  },
];

type ViewMode = 'carousel' | 'grid';

export default function ContactCard({ resumeUrl = '/IthranBeorTurnoResume.pdf' }: { resumeUrl?: string }) {
  const cards: ContactCardData[] = useMemo(
    () => [
      ...baseCards,
      {
        id: 'resume',
        title: 'Resume',
        subtitle: 'Tap to download',
        download: resumeUrl,
        Icon: FiFileText,
        iconColor: '#ffffff',
        gradient: 'from-[#0F766E] via-[#059669] to-[#10B981]',
      },
    ],
    [resumeUrl],
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('carousel');

  const active = cards[index];

  const go = (delta: number) => {
    setDirection(delta);
    setCopiedId(null);
    setIndex((current) => (current + delta + cards.length) % cards.length);
  };

  const goTo = (targetIndex: number) => {
    setDirection(targetIndex > index ? 1 : -1);
    setCopiedId(null);
    setIndex(targetIndex);
  };

  const activate = async (card: ContactCardData) => {
    if (card.download) {
      const link = document.createElement('a');
      link.href = card.download;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    if (card.href) {
      window.open(card.href, '_blank', 'noreferrer');
      return;
    }
    if (card.copyValue) {
      try {
        await navigator.clipboard.writeText(card.copyValue);
        setCopiedId(card.id);
        setTimeout(() => setCopiedId((current) => (current === card.id ? null : current)), 1600);
      } catch {
        // clipboard not available — fail silently
      }
    }
  };

  const Icon = active.Icon;

  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      <AnimatePresence mode="wait" initial={false}>
        {view === 'carousel' ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={springy}
            className="flex w-full flex-col items-center"
          >
            <div className="flex w-full items-center justify-center gap-10">
              {/* Prev */}
              <motion.button
                type="button"
                onClick={() => go(-1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={springy}
                aria-label="Previous contact"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/30 text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white/50"
              >
                <FiChevronLeft size={18} />
              </motion.button>

              {/* Card */}
              <div className="relative h-56 w-full">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.button
                    key={active.id}
                    type="button"
                    onClick={() => activate(active)}
                    custom={direction}
                    initial={{ x: direction >= 0 ? 60 : -60, opacity: 0, scale: 0.96 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: direction >= 0 ? -60 : 60, opacity: 0, scale: 0.96 }}
                    transition={springy}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`absolute inset-0 flex w-full flex-col justify-between rounded-3xl bg-linear-to-br ${active.gradient} p-6 text-left text-white shadow-xl`}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                        Ithran Beor
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                        {active.image ? (
                          <img src={active.image} alt="" className="h-5 w-5 object-contain" />
                        ) : (
                          Icon && <Icon size={18} style={{ color: active.iconColor }} />
                        )}
                      </span>
                    </div>

                    {/* Bottom row */}
                    <div>
                      <p className="text-2xl font-semibold leading-tight">{active.title}</p>
                      <AnimatePresence mode="wait" initial={false}>
                        {copiedId === active.id ? (
                          <motion.p
                            key="copied"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-1 flex items-center gap-1 text-sm font-medium text-emerald-300"
                          >
                            <FiCheck size={14} /> Copied to clipboard
                          </motion.p>
                        ) : (
                          <motion.p
                            key="subtitle"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-1 truncate text-sm text-white/80"
                          >
                            {active.subtitle}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                </AnimatePresence>
              </div>

              {/* Next */}
              <motion.button
                type="button"
                onClick={() => go(1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={springy}
                aria-label="Next contact"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/30 text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white/50"
              >
                <FiChevronRight size={18} />
              </motion.button>
            </div>

            {/* Dots + See all */}
            <div className="mt-4 flex w-full items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                {cards.map((card, i) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${card.title}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? 'w-5 bg-gray-700' : 'w-1.5 bg-gray-400/60 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setView('grid')}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-700 transition hover:text-gray-900"
              >
                See all cards
              </button>
            </div>

            {/* Resume — kept visible directly, not just tucked inside the carousel */}
            <motion.a
              href={resumeUrl}
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springy}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-gray-500/50 px-6 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition hover:bg-gray-500/85"
            >
              <FiDownload size={14} />
              Download Resume
            </motion.a>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={springy}
            className="w-full"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">All cards</h3>
              <button
                type="button"
                onClick={() => setView('carousel')}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-700 transition hover:text-gray-900"
              >
                <FiArrowLeft size={13} />
                Back
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cards.map((card, i) => {
                const CardIcon = card.Icon;
                return (
                  <motion.button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      goTo(i);
                      activate(card);
                    }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springy}
                    className={`flex h-28 flex-col justify-between rounded-2xl bg-linear-to-br ${card.gradient} p-3.5 text-left text-white shadow-md`}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                      {card.image ? (
                        <img src={card.image} alt="" className="h-4 w-4 object-contain" />
                      ) : (
                        CardIcon && <CardIcon size={14} style={{ color: card.iconColor }} />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{card.title}</p>
                      <p className="mt-0.5 truncate text-[10px] text-white/75">
                        {copiedId === card.id ? 'Copied!' : card.subtitle}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}