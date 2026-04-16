import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import useMouseParallax from '../../hooks/useMouseParallax';
import styles from './Hero.module.css';

const subtitles = ['BEAUTIFUL INTERFACES', 'SCALABLE APPS', 'GREAT EXPERIENCES'];

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const subtitleIndex = useRef(0);
  const mouse = useMouseParallax(0.02);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
    }, sectionRef);

    const interval = setInterval(() => {
      subtitleIndex.current = (subtitleIndex.current + 1) % subtitles.length;
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            if (subtitleRef.current) {
              subtitleRef.current.textContent = subtitles[subtitleIndex.current];
              gsap.fromTo(subtitleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
          },
        });
      }
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const nameWords = ['PRATEEK', 'AGRAWAL'];

  const socialLinks = [
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/prateekagrawal1999/', label: 'LinkedIn' },
    { icon: <FiGithub />, href: 'https://github.com/prateek48', label: 'GitHub' },
    { icon: <FiMail />, href: 'mailto:prateekag1999@gmail.com', label: 'Email' },
  ];

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <div className={styles.background} style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        <div className={styles.grid} />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={styles.orb}
            style={{
              top: `${15 + i * 14}%`,
              left: `${18 + ((i * 17) % 70)}%`,
              animationDelay: `${i * 0.5}s`,
              background: [
                'var(--accent-red)',
                'var(--accent-gold)',
                'var(--accent-green)',
              ][i % 3],
              boxShadow: `0 0 12px 3px ${
                ['rgba(255,107,107,0.3)', 'rgba(255,217,61,0.3)', 'rgba(107,203,119,0.3)'][i % 3]
              }`,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.greeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          HELLO, I'M
        </motion.div>

        <div className={styles.name} ref={nameRef}>
          {nameWords.map((word, wi) => (
            <span key={wi} className={styles.word}>
              {word.split('').map((letter, li) => (
                <span key={`${wi}-${li}`} className={styles.letter}>
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </div>

        <div className={styles.underline} />

        <div className={styles.subtitle}>
          I BUILD{' '}
          <span ref={subtitleRef} className={styles.rotatingText}>
            {subtitles[0]}
          </span>
        </div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          UI Engineer at Rippling with 5+ years crafting performant,
          <br />
          user-centric web experiences with React & modern JavaScript.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <a href="#projects" className={styles.ctaPrimary}>
            VIEW MY WORK
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            GET IN TOUCH
          </a>
        </motion.div>

        <motion.div
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
