import { useEffect, useState } from "react";
import { HERO, NAV, OPINION, SECTIONS, TRENDING, SITE } from "./data";

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header({ active, onNav }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-block">
          <div className="masthead">{SITE.masthead}</div>
          <p className="tagline">{SITE.tagline}</p>
        </div>
        <nav className="main-nav" aria-label="Main">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active === item.id ? "active" : ""}
              onClick={() => onNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="header-date">{formatDate()} · {SITE.domain}</div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-content">
        <span className="hero-label">{HERO.label}</span>
        <h1>{HERO.title}</h1>
        <p className="hero-deck">{HERO.deck}</p>
        <div className="hero-meta">
          <span>By {HERO.author}</span>
          <span className="dot" aria-hidden="true" />
          <span>Updated today</span>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "24/7", label: "Coverage" },
    { value: "Opt-in", label: "Alerts only" },
    { value: "1-click", label: "Unsubscribe" },
  ];
  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function StoryCard({ title, excerpt, time, index }) {
  return (
    <article className="story-card" style={{ "--i": index }}>
      <div className="story-thumb" aria-hidden="true" />
      <div className="story-body">
        <time>{time}</time>
        <h3>{title}</h3>
        <p>{excerpt}</p>
      </div>
    </article>
  );
}

function NewsGrid() {
  return (
    <section className="news-section" id="news">
      <div className="section-head">
        <h2>Latest coverage</h2>
        <p>Curated headlines across world, local, and business desks.</p>
      </div>
      {SECTIONS.map((section) => (
        <div className="news-block" key={section.id} id={section.id}>
          <h3 className="news-block-title">{section.title}</h3>
          <div className="story-grid">
            {section.stories.map((story, i) => (
              <StoryCard key={story.title} {...story} index={i} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-card trending">
        <h2>Trending on {SITE.brand}</h2>
        <ol className="trending-list">
          {TRENDING.map((item, i) => (
            <li key={item}>
              <span className="rank">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
      <div className="sidebar-card newsletter">
        <h2>{SITE.brand} Alerts</h2>
        <p>
          Breaking headlines and daily briefings for subscribers who opt in through{" "}
          {SITE.domain}. Unsubscribe anytime.
        </p>
        <button type="button" className="newsletter-btn" onClick={() => scrollTo("about")}>
          How to subscribe
        </button>
      </div>
    </aside>
  );
}

function Opinion() {
  return (
    <section className="opinion" id="opinion">
      <div className="section-head center">
        <h2>Opinion</h2>
        <p>Perspective from our editorial team and contributors.</p>
      </div>
      <div className="opinion-grid">
        {OPINION.map((item) => (
          <article className="opinion-card" key={item.title}>
            <span className="quote-mark" aria-hidden="true">"</span>
            <p className="opinion-author">{item.author}</p>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div className="about-copy">
          <h2>About {SITE.brand}</h2>
          <p>
            <strong>{SITE.brand}</strong> is an independent digital news platform at{" "}
            <strong>{SITE.domain}</strong>. We publish daily updates, curated briefings, and
            transactional reader alerts for subscribers who opt in through our platform.
          </p>
          <p>
            Our editorial team focuses on accuracy, local relevance, and responsible
            communication. We never send unsolicited email.
          </p>
        </div>
        <ul className="about-features">
          <li>Breaking news and regional coverage</li>
          <li>Opt-in subscriber alerts and daily briefings</li>
          <li>One-click unsubscribe on every message</li>
          <li>Privacy-first reader practices</li>
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="legal">
      <div className="footer-inner">
        <p className="footer-brand">
          <strong>{SITE.masthead}</strong> © {new Date().getFullYear()} {SITE.domain}
        </p>
        <p className="legal">
          {SITE.brand} sends transactional and subscriber emails from {SITE.noreply} to opted-in
          readers only. <a href="/unsubscribe.html">Unsubscribe</a> from alerts at any time.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id) => {
    setActive(id);
    scrollTo(id);
  };

  return (
    <div className="app-shell">
      <Header active={active} onNav={handleNav} />
      <main className="content">
        <Hero />
        <StatsBar />
        <div className="main-layout">
          <NewsGrid />
          <Sidebar />
        </div>
        <Opinion />
        <About />
      </main>
      <Footer />
    </div>
  );
}
