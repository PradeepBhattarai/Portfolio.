import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveSection } from '@/store/portfolioSlice';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { generateCV } from '@/utils/generateCV';
import { toast } from 'sonner';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.portfolio.activeSection);
  const personalInfo = useAppSelector((state) => state.portfolio.personal_info);
  const education = useAppSelector((state) => state.portfolio.education);
  const experience = useAppSelector((state) => state.portfolio.experience);
  const skills = useAppSelector((state) => state.portfolio.skills);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      dispatch(setActiveSection(sectionId));
      setIsOpen(false);
    }
  };

  const handleDownloadCV = () => {
    const flat = {
      programming_languages: skills['Frontend'] ?? [],
      frameworks: skills['Backend'] ?? [],
      databases: skills['Database'] ?? [],
    };
    generateCV(personalInfo, education, experience, flat);
    toast.success('CV downloaded successfully!');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="section-container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / wordmark */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-base font-semibold tracking-tight text-foreground"
            aria-label="Home"
          >
            {personalInfo.first_name}
            <span className="text-muted-foreground">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={handleDownloadCV}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-4"
            >
              <Download size={14} className="mr-2" />
              Download CV
            </Button>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-secondary rounded-md transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-1 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={handleDownloadCV}
              className="w-full mt-3 bg-foreground text-background hover:bg-foreground/90 rounded-full"
            >
              <Download size={14} className="mr-2" />
              Download CV
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
