import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import { MapPin, Calendar } from 'lucide-react';

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const experience = useAppSelector((state) => state.portfolio.experience);

  return (
    <section id="experience" className="py-24 md:py-32 border-t border-border">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">Experience</span>
            <h2 className="mt-4 text-foreground">Where I've worked</h2>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l border-border last:pb-0"
              >
                {/* Dot */}
                <span className="absolute left-0 top-1 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground border-4 border-background" />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-foreground">{exp.position}</h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider px-2 py-0.5 rounded-full border border-border">
                    {exp.type}
                  </span>
                </div>

                <p className="text-foreground/80 font-medium mb-3">{exp.company}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  {exp.description}
                </p>

                <ul className="space-y-1.5 mb-4 max-w-2xl">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-foreground">—</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
