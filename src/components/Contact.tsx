import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const personalInfo = useAppSelector((state) => state.portfolio.personal_info);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Pradeep,\n\n${formData.message}\n\nBest regards,\n${formData.name}\nEmail: ${formData.email}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    toast.success(`Opening your email client to send message to ${personalInfo.email}`);
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.social.twitter, label: 'Twitter / X' },
  ];

  const inputClass =
    'bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:border-foreground focus-visible:ring-0 placeholder:text-muted-foreground/60';

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 mb-6 text-foreground">Let's work together.</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Have a project in mind, or just want to say hello? I'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact info */}
            <div>
              <div className="space-y-6 mb-12">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-start gap-4 group"
                >
                  <Mail className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <p className="text-foreground group-hover:underline underline-offset-4 break-all">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-foreground">{personalInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                    <p className="text-foreground">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Elsewhere</p>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 border-b border-border text-foreground hover:border-foreground transition-colors group"
                    >
                      <span className="flex items-center gap-3">
                        <link.icon size={16} className="text-muted-foreground" />
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Name
                </label>
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your project…"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} min-h-[120px] resize-none`}
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-7"
              >
                <Send className="w-4 h-4 mr-2" />
                Send message
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="section-container mt-24 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {personalInfo.name}.</p>
          <p className="font-mono text-xs">Built with care.</p>
        </div>
      </footer>
    </section>
  );
};
