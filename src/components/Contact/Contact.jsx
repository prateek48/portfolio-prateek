import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiLinkedin, FiGithub, FiPhone } from 'react-icons/fi';
import SectionLabel from '../common/SectionLabel';
import GradientText from '../common/GradientText';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'prateekag1999@gmail.com',
    href: 'mailto:prateekag1999@gmail.com',
    accent: 'red',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: '/prateekagrawal1999',
    href: 'https://www.linkedin.com/in/prateekagrawal1999/',
    accent: 'gold',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: '/prateek48',
    href: 'https://github.com/prateek48',
    accent: 'green',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91 9009422473',
    href: 'tel:+919009422473',
    accent: 'red',
  },
];

const accentVars = {
  red: { color: 'var(--accent-red)', bg: 'var(--accent-red-bg)', border: 'var(--accent-red-border)' },
  gold: { color: 'var(--accent-gold)', bg: 'var(--accent-gold-bg)', border: 'var(--accent-gold-border)' },
  green: { color: 'var(--accent-green)', bg: 'var(--accent-green-bg)', border: 'var(--accent-green-border)' },
};

function ContactCard({ icon: Icon, label, value, href, accent }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  const av = accentVars[accent];
  const isExternal = href.startsWith('http');

  return (
    <a
      ref={cardRef}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-accent': av.color, '--card-accent-bg': av.bg, '--card-accent-border': av.border }}
    >
      <div className={styles.iconBox}>
        <Icon />
      </div>
      <span className={styles.cardLabel}>{label}</span>
      <span className={styles.cardValue}>{value}</span>
    </a>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const scroller = document.getElementById('scroll-container');

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.card}`, {
        y: 60,
        opacity: 0,
        rotateX: 15,
        stagger: 0.12,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 60%',
        },
      });

      gsap.from(`.${styles.headingWord}`, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.content}>
        <SectionLabel number="05" text="CONTACT" accent="green" />

        <h2 className={styles.heading}>
          <span className={styles.headingWord}>Let&apos;s Build Something</span>
          <br />
          <span className={styles.headingWord}>
            <GradientText from="var(--accent-red)" to="var(--accent-green)">
              Together
            </GradientText>
          </span>
        </h2>

        <p className={styles.subtitle}>
          Got a project in mind or just want to say hello? I&apos;d love to hear from you.
        </p>

        <div className={styles.cards}>
          {contacts.map((c) => (
            <ContactCard key={c.label} {...c} />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLine} />
        <span className={styles.footerText}>DESIGNED &amp; BUILT BY PRATEEK AGRAWAL · 2026</span>
      </footer>
    </section>
  );
}
