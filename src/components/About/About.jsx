import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../common/SectionLabel';
import GradientText from '../common/GradientText';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: '+', label: 'YEARS', accent: 'var(--accent-red)' },
  { value: 4, suffix: '', label: 'COMPANIES', accent: 'var(--accent-gold)' },
  { value: 0, suffix: '→1', label: 'PRODUCTS', accent: 'var(--accent-green)' },
];

const pills = [
  { text: '📍 Bengaluru, India', accent: 'red' },
  { text: '🎓 B.Tech IT — JEC', accent: 'gold' },
  { text: '⭐ 4-Star CodeChef', accent: 'green' },
  { text: '🎯 GATE CSE Qualified', accent: 'red' },
];

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scroller = document.getElementById('scroll-container');

      gsap.from(`.${styles.photoCard}`, {
        x: -80,
        opacity: 0,
        rotation: -5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 80%',
        },
      });

      gsap.from(`.${styles.textContent} > *`, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 70%',
        },
      });

      stats.forEach((stat, i) => {
        const el = statsRef.current[i];
        if (!el || stat.value === 0) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: 'top 70%',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.bgAccent1} />
      <div className={styles.bgAccent2} />

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.photoCard}>
            <div className={styles.cornerTL} />
            <div className={styles.cornerBR} />
            <div className={styles.photoPlaceholder}>YOUR PHOTO</div>
          </div>

          <div className={styles.stats}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={styles.stat}>
                <div
                  className={styles.statValue}
                  ref={(el) => (statsRef.current[i] = el)}
                  style={{ color: stat.accent }}
                >
                  {stat.value === 0 ? `0${stat.suffix}` : '0'}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                {i < stats.length - 1 && <div className={styles.statDivider} />}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.textContent}>
          <SectionLabel number="01" text="ABOUT ME" accent="red" />

          <h2 className={styles.heading}>
            Crafting pixels into
            <br />
            <GradientText>meaningful experiences</GradientText>
          </h2>

          <p className={styles.paragraph}>
            Software Engineer 2 (Frontend) at <strong>Rippling</strong>, where I'm building
            zero-to-one products on the Billing team — powering variable compensation, contract
            flows, and the infrastructure behind massive ARR. I care about shipping things that
            scale.
          </p>

          <p className={styles.paragraph}>
            Before Rippling, I built coupon engines at <strong>Flipkart (Cleartrip)</strong>,
            shipped production components at <strong>Airbus</strong>, and developed SaaS products at{' '}
            <strong>Ascian Solutions</strong>. 5+ years of React, performance obsession, and a
            competitive coding background that keeps my problem-solving sharp.
          </p>

          <div className={styles.pills}>
            {pills.map((pill) => (
              <span key={pill.text} className={`${styles.pill} ${styles[`pill_${pill.accent}`]}`}>
                {pill.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
