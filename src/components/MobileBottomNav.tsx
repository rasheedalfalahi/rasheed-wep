import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, LayoutGrid, Briefcase, MessageSquare } from 'lucide-react';

interface BottomNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  matchPrefix?: string;
}

const bottomNavItems: BottomNavItem[] = [
  {
    label: 'الرئيسية',
    href: '/',
    icon: Home,
  },
  {
    label: 'المشاريع',
    href: '/projects',
    icon: LayoutGrid,
    matchPrefix: '/project',
  },
  {
    label: 'الخدمات',
    href: '/services',
    icon: Briefcase,
  },
  {
    label: 'اتصل بي',
    href: '/contact',
    icon: MessageSquare,
  },
];

const MobileBottomNav: React.FC = () => {
  const { pathname } = useLocation();

  const isItemActive = (item: BottomNavItem) => {
    if (item.href === '/') {
      return pathname === '/';
    }
    if (item.matchPrefix && pathname.startsWith(item.matchPrefix)) {
      return true;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <nav
      aria-label="شريط التنقل السفلي للجوال"
      dir="rtl"
      className="fixed bottom-0 inset-x-0 z-[85] sm:hidden bg-[#032229]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.45)] pb-[env(safe-area-inset-bottom,0px)]"
      style={{ WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="grid grid-cols-4 items-center h-16 px-2">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center gap-1 h-full rounded-xl transition-colors duration-200 select-none ${
                active ? 'text-brand-primary' : 'text-text-muted hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mobile-bottom-nav-indicator"
                  className="absolute top-0 w-8 h-0.5 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(0,152,154,0.8)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                />
              )}

              <div
                className={`relative flex items-center justify-center w-9 h-7 rounded-lg transition-colors duration-200 ${
                  active ? 'bg-brand-primary/15 text-brand-primary' : 'text-current'
                }`}
              >
                <Icon size={18} className="shrink-0" />
              </div>

              <span
                className={`text-[11px] leading-none font-arabic whitespace-nowrap transition-all duration-200 ${
                  active ? 'font-black text-white' : 'font-bold text-text-muted'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
