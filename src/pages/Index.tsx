import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setActiveSection } from '@/store/portfolioSlice';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StarryBackground } from '@/components/StarryBackground';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            dispatch(setActiveSection(section));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <StarryBackground />
      <ScrollProgress />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
