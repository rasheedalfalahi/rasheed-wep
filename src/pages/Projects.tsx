import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import { ArrowUpLeft, LayoutGrid, Palette, Layers, PenTool, BookOpen, LucideIcon } from 'lucide-react';
import SkeletonImage from '../components/SkeletonImage';
import { getLenis } from '../lib/lenis';

export const getCategoryArabicLabel = (cat: string): string => {
  switch (cat) {
    case 'All':
      return 'الكل';
    case 'Brand Identity':
      return 'هوية بصرية';
    case 'Social Media':
      return 'سوشيال ميديا';
    case 'Editorial Design':
      return 'إخراج فني';
    case 'Carousel design':
      return 'تصميم كاروسيل';
    case 'Information layout':
      return 'إنفوجرافيك وتنسيق';
    case 'Digital design':
      return 'تصميم رقمي';
    case 'Publications design':
      return 'تصميم مطبوعات';
    default:
      return cat;
  }
};

interface FilterGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  matchCategories: string[];
}

const filterGroups: FilterGroup[] = [
  {
    id: 'all',
    label: 'الكل',
    icon: LayoutGrid,
    matchCategories: [],
  },
  {
    id: 'branding',
    label: 'هوية بصرية',
    icon: Palette,
    matchCategories: ['Brand Identity'],
  },
  {
    id: 'social',
    label: 'سوشيال ميديا وكاروسيل',
    icon: Layers,
    matchCategories: ['Social Media', 'Carousel design'],
  },
  {
    id: 'graphic',
    label: 'تصميم جرافيك ورقمي',
    icon: PenTool,
    matchCategories: ['Digital design', 'Information layout'],
  },
  {
    id: 'editorial',
    label: 'مطبوعات وإخراج فني',
    icon: BookOpen,
    matchCategories: ['Editorial Design', 'Publications design'],
  },
];

export default function Projects() {
  const shouldRestoreOnMount = useMemo(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('projects_restore') === 'true';
  }, []);

  const [activeFilter, setActiveFilter] = useState(() => {
    if (shouldRestoreOnMount) {
      const saved = sessionStorage.getItem('projects_active_category');
      if (saved && filterGroups.some((g) => g.id === saved)) {
        return saved;
      }
    }
    return 'all';
  });

  useEffect(() => {
    sessionStorage.setItem('projects_active_category', activeFilter);
  }, [activeFilter]);

  const filteredProjects = useMemo(() => {
    const group = filterGroups.find((g) => g.id === activeFilter);
    if (!group || group.id === 'all') return projects;
    const lowerMatches = group.matchCategories.map((c) => c.toLowerCase());
    return projects.filter((project) =>
      lowerMatches.includes(project.category.toLowerCase())
    );
  }, [activeFilter]);

  useLayoutEffect(() => {
    if (!shouldRestoreOnMount) return;

    const savedScrollY = parseFloat(sessionStorage.getItem('projects_scroll_y') || '0');
    const clickedId = sessionStorage.getItem('projects_clicked_id');
    const currentId = sessionStorage.getItem('projects_current_id') || clickedId;

    sessionStorage.removeItem('projects_restore');

    const applyScrollRestore = () => {
      const lenis = getLenis();
      if (currentId && clickedId && currentId !== clickedId) {
        const cardEl = document.getElementById(`project-card-${currentId}`);
        if (cardEl) {
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(cardEl, { offset: -120, immediate: true, force: true });
          } else {
            cardEl.scrollIntoView({ block: 'center' });
          }
          return;
        }
      }

      if (savedScrollY > 0) {
        window.scrollTo(0, savedScrollY);
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(savedScrollY, { immediate: true, force: true });
        }
      }
    };

    applyScrollRestore();
    const rafId = requestAnimationFrame(applyScrollRestore);
    const timer1 = setTimeout(applyScrollRestore, 60);
    const timer2 = setTimeout(applyScrollRestore, 180);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [shouldRestoreOnMount]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-bg overflow-hidden"
      dir="rtl"
    >
      {/* Elegant Dark Header with Integrated Top Filter Bar */}
      <section className="pt-28 xs:pt-32 sm:pt-40 lg:pt-44 pb-8 sm:pb-12 bg-bg relative">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-bold text-brand-primary font-arabic"
            >
              معرض الأعمال المختارة
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[clamp(1.85rem,5.5vw,3.5rem)] font-black leading-[1.25] text-[#f1f5f9] font-arabic"
            >
              المشاريع <span className="text-brand-primary">البصرية</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-text-muted/90 leading-[1.85] font-arabic"
            >
              مجموعة مختارة من الأعمال الإبداعية المصممة بعناية لتعكس هوية كل مشروع بأسلوب بصري واضح وأنيق.
            </motion.p>
          </div>

          {/* Top Filter Bar - Sleek, Centered, Instant Filtering */}
          <div className="flex justify-center mt-2 sm:mt-4 px-1">
            <nav
              aria-label="تصنيف المشاريع"
              className="inline-flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md max-w-full"
            >
              {filterGroups.map((group) => {
                const isActive = activeFilter === group.id;
                const Icon = group.icon;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveFilter(group.id)}
                    className={`relative inline-flex items-center justify-center px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold font-arabic whitespace-nowrap transition-colors duration-300 cursor-pointer select-none ${
                      isActive
                        ? 'text-white'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="projects-top-filter-pill"
                        className="absolute inset-0 bg-brand-primary rounded-xl shadow-[0_6px_20px_-4px_rgba(0,152,154,0.45)]"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center justify-center gap-2.5 sm:gap-3 leading-none">
                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-brand-primary/85'
                        }`}
                      />
                      <span className="leading-normal">{group.label}</span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* Clean Light Projects Gallery Grid */}
      <section className="py-10 sm:py-16 bg-[#f8fafc] border-y border-slate-200/80 relative">
        <div className="container max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  initial={shouldRestoreOnMount ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="group h-full"
                >
                  <Link
                    to={`/project/${project.id}`}
                    onClick={() => {
                      sessionStorage.setItem('projects_scroll_y', String(window.scrollY));
                      sessionStorage.setItem('projects_clicked_id', project.id);
                      sessionStorage.setItem('projects_current_id', project.id);
                      sessionStorage.setItem('projects_active_category', activeFilter);
                      sessionStorage.setItem('projects_restore', 'true');
                    }}
                    className="flex flex-col h-full rounded-2xl sm:rounded-[1.75rem] bg-white border border-slate-200/90 hover:border-brand-primary/45 overflow-hidden shadow-[0_12px_35px_-15px_rgba(3,42,51,0.07)] hover:shadow-[0_22px_50px_-15px_rgba(0,152,154,0.18)] transition-all duration-500"
                  >
                    {/* Image Canvas */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <SkeletonImage 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#032a33]/20 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Minimal & Clean Title Bar */}
                    <div className="p-5 sm:p-6 flex items-center justify-between gap-4 flex-1 bg-white border-t border-slate-100 group-hover:bg-[#f0f9fa]/60 transition-colors duration-500">
                      <div className="text-start space-y-1">
                        <span className="inline-block text-[11px] sm:text-xs font-bold text-brand-primary font-arabic">
                          {getCategoryArabicLabel(project.category)}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#032a33] group-hover:text-brand-primary transition-colors leading-[1.5] font-arabic">
                          {project.title}
                        </h3>
                      </div>

                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border border-slate-200/80 group-hover:bg-brand-primary group-hover:border-brand-primary flex items-center justify-center text-[#032a33] group-hover:text-white transition-all duration-300 shrink-0">
                        <ArrowUpLeft size={18} className="group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}