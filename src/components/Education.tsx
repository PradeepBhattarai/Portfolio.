import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useAppSelector } from '@/store/hooks';

export const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const education = useAppSelector((state) => state.portfolio.education);

  return (
    <section id="education" className="py-20 md:py-32 bg-background">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            My academic journey and achievements
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-accent" />

              {/* Education Items */}
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative mb-8 pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-6 w-5 h-5 rounded-full bg-accent border-4 border-background" />

                  {/* Content */}
                  <div className="bg-card/30 backdrop-blur border border-border/50 rounded-lg p-6 hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                      <span className="text-accent font-medium text-sm whitespace-nowrap ml-4">{edu.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-2">{edu.institution}</p>
                    <span className="inline-block text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {edu.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
