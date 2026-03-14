import React from 'react';
import data from './portfolioData.js';

const sectionIds = {
  about: 'about',
  experience: 'experience',
  skills: 'skills',
  achievements: 'achievements',
  eligibility: 'eligibility',
  education: 'education',
  contact: 'contact',
};

const navLinks = [
  { id: sectionIds.about, label: 'About' },
  { id: sectionIds.experience, label: 'Experience' },
  { id: sectionIds.skills, label: 'Skills' },
  { id: sectionIds.achievements, label: 'Achievements' },
  { id: sectionIds.eligibility, label: 'Eligibility' },
  { id: sectionIds.education, label: 'Education' },
  { id: sectionIds.contact, label: 'Contact' },
];

function useTheme() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = window.localStorage.getItem('portfolio-theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      window.localStorage.setItem('portfolio-theme', 'light');
      return false;
    } catch {
      return false;
    }
  });

  const toggleTheme = React.useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
      } catch (_) {}
      return next;
    });
  }, []);

  return [isDark, toggleTheme];
}

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg transition-colors focus:outline focus:ring-2 focus:ring-[var(--accent)]"
      style={{ color: 'var(--muted)' }}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
      {children}
    </span>
  );
}

function Portfolio() {
  const [isDark, toggleTheme] = useTheme();
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState(sectionIds.about);
  const [contactForm, setContactForm] = React.useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = React.useState('idle'); // idle | sending | success | error

  React.useEffect(() => {
    document.title = `${data.name} — Professional Portfolio`;
  }, []);

  React.useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const ids = Object.values(sectionIds);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('section-visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.portfolio-root section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactStatus('sending');
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token || '', 'Accept': 'application/json' },
      body: JSON.stringify(contactForm),
    })
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok && data && data.success) {
          setContactStatus('success');
          setContactForm({ name: '', email: '', message: '' });
        } else {
          setContactStatus('error');
        }
      })
      .catch(() => setContactStatus('error'));
  };

  return (
    <div
      className={`portfolio-root min-h-screen antialiased ${isDark ? 'theme-dark dark' : ''}`}
      style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-md theme-section" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <button
            type="button"
            onClick={() => scrollToSection(sectionIds.about)}
            className="text-lg font-semibold transition-colors focus:outline focus:ring-2 focus:ring-[var(--accent)] rounded"
            style={{ color: 'var(--heading)' }}
          >
            {data.name.split(' ')[0]} Portfolio
          </button>
          <div className="flex items-center gap-2">
            <nav className="hidden sm:block" aria-label="Main">
              <ul className="flex gap-1">
                {navLinks.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline focus:ring-2 focus:ring-[var(--accent)] ${activeSection === id ? 'font-semibold' : ''}`}
                      style={{ color: activeSection === id ? 'var(--accent)' : 'var(--body)' }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="sm:hidden p-2 rounded-lg transition-colors focus:outline focus:ring-2 focus:ring-[var(--accent)]"
              style={{ color: 'var(--heading)' }}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden print:hidden border-t theme-border py-4 px-6" style={{ borderColor: 'var(--border)' }}>
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus:outline focus:ring-2 focus:ring-[var(--accent)] ${activeSection === id ? 'font-semibold' : ''}`}
                    style={{ color: activeSection === id ? 'var(--accent)' : 'var(--body)' }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section
          id={sectionIds.about}
          className="relative overflow-hidden border-b theme-border transition-colors duration-200"
          style={{ background: 'var(--hero-bg)', borderColor: 'var(--border)' }}
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32 text-center">
            {data.photo && (
              <div className="flex justify-center mb-8">
                <img src={data.photo} alt="" className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 shadow-lg border-4 border-white/50" style={{ borderColor: 'var(--border)' }} />
              </div>
            )}
            <SectionLabel>About Me</SectionLabel>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: 'var(--heading)' }}>
              {data.name}
            </h1>
            <p className="mt-4 text-xl font-medium" style={{ color: 'var(--accent)' }}>
              {data.tagline}
            </p>
            <p className="mt-8 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--body)' }}>
              {data.about}
            </p>
          </div>
        </section>

        {/* Experience */}
        <section
          id={sectionIds.experience}
          className="theme-section border-b transition-colors duration-200"
          style={{ backgroundColor: 'var(--section-bg)', borderColor: 'var(--border)' }}
        >
          <div className="mx-auto max-w-3xl px-6 py-20">
            <SectionLabel>Professional Work Experience</SectionLabel>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--heading)' }}>Experience</h2>
            <div className="mt-12 space-y-16">
              {data.workExperience.map((job, i) => (
                <article
                  key={i}
                  className="timeline-item relative pl-8 before:absolute before:left-0 before:top-1.5 before:h-[calc(100%+2rem)] before:w-px after:absolute after:left-0 after:top-1.5 after:h-3 after:w-3 after:rounded-full after:ring-4"
                >
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>{job.role}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                    {job.company} · {job.period}
                  </p>
                  {job.bullets ? (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed" style={{ color: 'var(--body)' }}>
                      {job.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--timeline-dot)]" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--body)' }}>{job.description}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id={sectionIds.skills}
          className="theme-section-alt border-b transition-colors duration-200"
          style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--border)' }}
        >
          <div className="mx-auto max-w-3xl px-6 py-20">
            <SectionLabel>Special Skills</SectionLabel>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--heading)' }}>Skills</h2>
            <ul className="mt-10 flex flex-wrap gap-3">
              {data.skills.map((skill, i) => (
                <li key={i}>
                  <span className="theme-tag inline-flex items-center rounded-lg border px-4 py-2.5 text-sm font-medium shadow-sm transition-colors duration-200" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)', borderColor: 'var(--tag-border)' }}>
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Achievements */}
        <section
          id={sectionIds.achievements}
          className="theme-section border-b transition-colors duration-200"
          style={{ backgroundColor: 'var(--section-bg)', borderColor: 'var(--border)' }}
        >
          <div className="mx-auto max-w-3xl px-6 py-20">
            <SectionLabel>Awards & Recognition</SectionLabel>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--heading)' }}>Achievements</h2>
            <ul className="mt-10 space-y-6" role="list">
              {data.achievements.map((item, i) => (
                <li key={i} className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-medium" style={{ color: 'var(--heading)' }}>{item.title}</span>
                    {item.year && (
                      <span className="text-sm" style={{ color: 'var(--muted)' }}>{item.year}</span>
                    )}
                  </div>
                  {item.organization && (
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{item.organization}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Eligibility */}
        <section
          id={sectionIds.eligibility}
          className="theme-section border-b transition-colors duration-200"
          style={{ backgroundColor: 'var(--section-bg)', borderColor: 'var(--border)' }}
        >
          <div className="mx-auto max-w-3xl px-6 py-20">
            <SectionLabel>Eligibility</SectionLabel>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--heading)' }}>Eligibility</h2>
            <ul className="mt-10 space-y-4">
              {data.eligibility.map((item, i) => (
                <li key={i} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{item.title}</span>
                  {item.detail && <span className="text-sm theme-muted" style={{ color: 'var(--muted)' }}>{item.detail}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Education */}
        <section
          id={sectionIds.education}
          className="theme-section-alt border-b transition-colors duration-200"
          style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--border)' }}
        >
          <div className="mx-auto max-w-3xl px-6 py-20">
            <SectionLabel>Academic Background</SectionLabel>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--heading)' }}>Education</h2>
            <ul className="mt-10 space-y-8">
              {data.education.map((item, i) => (
                <li key={i}>
                  <h3 className="font-semibold" style={{ color: 'var(--heading)' }}>{item.school}</h3>
                  <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--accent)' }}>{item.degree}</p>
                  <p className="text-sm theme-muted" style={{ color: 'var(--muted)' }}>{item.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section
          id={sectionIds.contact}
          className="theme-section border-b transition-colors duration-200"
          style={{ backgroundColor: 'var(--section-bg)', borderColor: 'var(--border)' }}
        >
          <div className="mx-auto max-w-3xl px-6 py-20 pb-28">
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--heading)' }}>Contact</h2>
            <form onSubmit={handleContactSubmit} className="mt-10 space-y-4 max-w-md">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-1" style={{ color: 'var(--body)' }}>Name</label>
                <input id="contact-name" type="text" required maxLength={255} value={contactForm.name} onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border px-3 py-2 text-base focus:outline focus:ring-2 focus:ring-[var(--accent)]" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--border)', color: 'var(--heading)' }} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-1" style={{ color: 'var(--body)' }}>Email</label>
                <input id="contact-email" type="email" required value={contactForm.email} onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))} className="w-full rounded-lg border px-3 py-2 text-base focus:outline focus:ring-2 focus:ring-[var(--accent)]" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--border)', color: 'var(--heading)' }} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-1" style={{ color: 'var(--body)' }}>Message</label>
                <textarea id="contact-message" required maxLength={2000} rows={4} value={contactForm.message} onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))} className="w-full rounded-lg border px-3 py-2 text-base focus:outline focus:ring-2 focus:ring-[var(--accent)] resize-y" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--border)', color: 'var(--heading)' }} placeholder="Your message" />
              </div>
              {contactStatus === 'success' && <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>Thank you. Your message has been sent.</p>}
              {contactStatus === 'error' && <p className="text-sm font-medium" style={{ color: 'var(--error, #b91c1c)' }}>Something went wrong. Please try again.</p>}
              <button type="submit" disabled={contactStatus === 'sending'} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)] disabled:opacity-60" style={{ backgroundColor: 'var(--accent)' }}>{contactStatus === 'sending' ? 'Sending…' : 'Send message'}</button>
            </form>
            <p className="mt-8 text-sm theme-muted" style={{ color: 'var(--muted)' }}>Or reach out directly:</p>
            <ul className="mt-4 space-y-4 text-base">
              <li>
                <a href={`mailto:${data.contact.email}`} className="theme-accent font-medium underline underline-offset-2 focus:outline focus:ring-2 focus:ring-[var(--accent)] rounded" style={{ color: 'var(--accent)' }}>{data.contact.email}</a>
              </li>
              <li>
                <a href={`tel:${data.contact.phone.replace(/\s/g, '')}`} className="font-medium underline underline-offset-2 focus:outline focus:ring-2 focus:ring-[var(--accent)] rounded" style={{ color: 'var(--accent)' }}>{data.contact.phone}</a>
              </li>
              <li>
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2 focus:outline focus:ring-2 focus:ring-[var(--accent)] rounded" style={{ color: 'var(--accent)' }}>LinkedIn →</a>
              </li>
              {data.contact.other && (
                <li>
                  <a href={data.contact.other} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2 focus:outline focus:ring-2 focus:ring-[var(--accent)] rounded" style={{ color: 'var(--accent)' }}>More →</a>
                </li>
              )}
            </ul>
          </div>
        </section>
      </main>

      <footer className="theme-section-alt border-t py-8 transition-colors duration-200" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-3xl px-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm theme-muted" style={{ color: 'var(--muted)' }}>{data.name} · Professional Portfolio</p>
          <button type="button" onClick={toggleTheme} className="text-sm font-medium focus:outline focus:ring-2 focus:ring-[var(--accent)] rounded" style={{ color: 'var(--muted)' }}>
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </footer>

      {/* Floating scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 focus:outline focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          style={{ backgroundColor: 'var(--accent)', color: 'white', boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.4)' }}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Portfolio;
