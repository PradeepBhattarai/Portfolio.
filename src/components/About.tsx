import { motion, useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const personalInfo = useAppSelector((state) => state.portfolio.personal_info);
  const skills = useAppSelector((state) => state.portfolio.skills);

  const categories = useMemo(() => Object.keys(skills), [skills]);
  const [activeTab, setActiveTab] = useState<string>(categories[0] ?? 'Frontend');

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">About</span>
            <h2 className="mt-4 mb-6 text-foreground">
              Designing thoughtful, performant interfaces.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Tech stack */}
          <div className="border-t border-border pt-14">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <span className="eyebrow">Toolkit</span>
                <h3 className="mt-3 text-foreground">Tech stack</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Filter by category
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    activeTab === cat
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tech grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            >
              {(skills[activeTab] ?? []).map((skill) => (
                <div
                  key={skill.name}
                  className="flat-card px-4 py-4 flex flex-col gap-2"
                >
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-foreground"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
