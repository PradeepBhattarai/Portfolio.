import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const personalInfo = useAppSelector((state) => state.portfolio.personal_info);
  const skills = useAppSelector((state) => state.portfolio.skills);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Flatten all skill names for the marquee
  const techStack = Object.values(skills).flat().map((s) => s.name);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative pt-28 pb-16"
    >
      <div className="section-container relative z-10">
        <div className="max-w-4xl">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pill-badge mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            {personalInfo.availability}
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-muted-foreground text-sm md:text-base mb-4 font-mono"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground leading-[1.05] mb-6"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6 font-mono"
          >
            — {personalInfo.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <Button
              size="lg"
              onClick={() => scrollTo('projects')}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-7 group"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('contact')}
              className="border-border bg-transparent hover:bg-secondary text-foreground px-7 rounded-full"
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Inline stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-10 mb-14 pt-8 border-t border-border"
          >
            <div>
              <div className="text-3xl font-semibold text-foreground">
                {personalInfo.stats.years_experience}
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase mt-1">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-foreground">
                {personalInfo.stats.live_projects}
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase mt-1">
                Live Projects
              </div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-foreground">
                {techStack.length}+
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase mt-1">
                Technologies
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="marquee-container py-2"
        >
          <div className="marquee-content">
            {[...techStack, ...techStack].map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
};
