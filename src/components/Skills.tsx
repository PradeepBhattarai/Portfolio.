import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

type TabKey = 'programming_languages' | 'frameworks' | 'databases';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'programming_languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'databases', label: 'Databases' },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const skills = useAppSelector((state) => state.portfolio.skills);
  const [activeTab, setActiveTab] = useState<TabKey>('programming_languages');

  const currentSkills = skills[activeTab] || [];
  const totalSkills = Object.values(skills).reduce((acc, arr) => acc + (arr?.length || 0), 0);
  const totalCategories = Object.keys(skills).length;

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-muted-foreground text-sm uppercase tracking-wider">My Tech Stack</span>
            <h2 className="mt-2">
              <span className="text-foreground">Technologies I</span>
              <span className="gradient-text-animated ml-3">work with</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-sm font-bold text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center gap-12 mt-16"
          >
            <div className="text-center">
              <span className="text-4xl font-bold text-primary">
                {totalSkills}
              </span>
              <p className="text-sm text-muted-foreground mt-1">Technologies</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-accent">{totalCategories}</span>
              <p className="text-sm text-muted-foreground mt-1">Categories</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
