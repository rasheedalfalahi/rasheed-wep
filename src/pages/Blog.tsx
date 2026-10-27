import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  ArrowUpLeft,
  Calendar,
  Clock,
} from 'lucide-react';
import { blogPosts } from '../data/blog';
import SkeletonImage from '../components/SkeletonImage';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return blogPosts;
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(trimmed) ||
        post.excerpt.toLowerCase().includes(trimmed)
    );
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-bg overflow-hidden"
      dir="rtl"
    >
      {/* Elegant Dark Header with Quick Search Bar */}
      <section className="pt-28 xs:pt-32 sm:pt-40 lg:pt-44 pb-8 sm:pb-12 bg-bg relative">
        <div className="container max-w-7xl mx-auto">
          {/* Attractive Title & Short Intro */}
          <div className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs sm:text-sm font-bold text-brand-primary font-arabic"
            >
              المدونة الإبداعية والمعرفية
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-[clamp(1.85rem,5.5vw,3.5rem)] font-black leading-[1.25] text-[#f1f5f9] font-arabic"
            >
              مدونة <span className="text-brand-primary">التصميم والهوية</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-text-muted/90 leading-[1.85] font-arabic"
            >
              مساحة معرفية نشارك فيها خلاصة التجارب في بناء الهويات البصرية، فلسفة التصميم الجرافيكي، وأسرار صناعة المحتوى البصري المؤثر.
            </motion.p>
          </div>

          {/* Quick Search Bar */}
          <div className="max-w-xl mx-auto px-1">
            <div className="relative flex items-center">
              <Search
                size={18}
                className="absolute right-4 text-brand-primary pointer-events-none shrink-0"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مقال أو موضوع..."
                aria-label="البحث في المقالات"
                className="w-full ps-11 pe-11 py-3 sm:py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-brand-primary/60 text-sm sm:text-base text-white placeholder:text-text-muted/65 outline-none transition-colors duration-200 font-arabic backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="مسح البحث"
                  className="absolute left-3.5 w-7 h-7 rounded-lg bg-white/10 hover:bg-brand-primary text-text-muted hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Light Articles Grid Section */}
      <section className="py-10 sm:py-16 bg-[#f8fafc] border-y border-slate-200/80 relative">
        <div className="container max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key={searchQuery}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
              >
                {filteredPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group h-full"
                  >
                    <Link
                      to={`/blog/${post.id}`}
                      className="flex flex-col h-full rounded-2xl sm:rounded-[1.75rem] bg-white border border-slate-200/90 hover:border-brand-primary/45 overflow-hidden shadow-[0_12px_35px_-15px_rgba(3,42,51,0.07)] hover:shadow-[0_22px_50px_-15px_rgba(0,152,154,0.18)] transition-all duration-500"
                    >
                      {/* Cover Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <SkeletonImage
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#032a33]/25 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white border-t border-slate-100 text-start">
                        <div className="space-y-3">
                          {/* Publication Date */}
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-arabic">
                            <Calendar size={13} className="text-brand-primary shrink-0" />
                            <span>{post.date}</span>
                          </div>

                          {/* Article Title */}
                          <h2 className="text-base sm:text-lg font-bold text-[#032a33] group-hover:text-brand-primary transition-colors leading-[1.55] font-arabic">
                            {post.title}
                          </h2>

                          {/* 2-Line Summary */}
                          <p className="text-xs sm:text-sm text-slate-600 leading-[1.85] font-arabic line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-arabic">
                            <Clock size={13} className="text-brand-primary shrink-0" />
                            <span>{post.readTime}</span>
                          </span>

                          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#032a33] group-hover:text-brand-primary transition-colors font-arabic">
                            <span>قراءة المقال</span>
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 border border-slate-200/80 group-hover:bg-brand-primary group-hover:border-brand-primary flex items-center justify-center text-[#032a33] group-hover:text-white transition-all duration-300 shrink-0">
                              <ArrowUpLeft
                                size={16}
                                className="group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty-blog-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto py-16 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/25 text-brand-primary flex items-center justify-center mx-auto">
                  <Search size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#032a33] font-arabic">
                  لا توجد مقالات مطابقة لبحثك
                </h3>
                <p className="text-sm text-slate-600 font-arabic leading-relaxed">
                  جرّب البحث بكلمات أخرى لاستعراض المقالات المتاحة.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-bold font-arabic hover:bg-[#045063] transition-colors cursor-pointer"
                >
                  عرض جميع المقالات
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
