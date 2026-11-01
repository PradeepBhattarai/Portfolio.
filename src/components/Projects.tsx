import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { ArrowUpRight } from 'lucide-react';

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const projects = useAppSelector((state) => state.portfolio.projects);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="eyebrow">Projects</span>
            <h2 className="mt-4 text-foreground">Selected work</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  filter === category
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-secondary mb-5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-background/90 backdrop-blur border border-border text-foreground">
                    {project.category}
                  </span>
                  <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full bg-foreground text-background">
                    {project.status}
                  </span>
                </div>

                {/* Body */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-foreground group-hover:underline underline-offset-4 decoration-1">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      className="text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                    />
                  </div>
                  {project.subtitle && (
                    <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="tabular-nums">{project.year}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{project.technologies.slice(0, 3).join(' · ')}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
