import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories, coreStack } from '../../data/skills';
import SectionLabel from '../common/SectionLabel';
import GradientText from '../common/GradientText';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const accentMap = {
  red: {
    bg: 'var(--accent-red-bg)',
    border: 'var(--accent-red-border)',
    color: 'var(--accent-red)',
  },
  gold: {
    bg: 'var(--accent-gold-bg)',
    border: 'var(--accent-gold-border)',
    color: 'var(--accent-gold)',
  },
  green: {
    bg: 'var(--accent-green-bg)',
    border: 'var(--accent-green-border)',
    color: 'var(--accent-green)',
  },
};

export default function Skills() {
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scroller = document.getElementById('scroll-container');

      gsap.from(`.${styles.card}`, {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 70%',
        },
      });

      gsap.from(`.${styles.skillPill}`, {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 60%',
        },
      });

      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className={styles.bgAccent1} />
      <div className={styles.bgAccent2} />

      <div className={styles.content}>
        <SectionLabel number="02" text="SKILLS" accent="green" />

        <h2 className={styles.heading}>
          <GradientText from="var(--accent-green)" to="var(--accent-gold)">
            My Tech Arsenal
          </GradientText>
        </h2>

        <div className={styles.grid}>
          {skillCategories.map((cat) => {
            const accent = accentMap[cat.accent];
            return (
              <div
                key={cat.id}
                className={styles.card}
                style={{
                  background: accent.bg,
                  borderColor: accent.border,
                }}
              >
                <div className={styles.cardHeader}>
                  <span
                    className={styles.dot}
                    style={{
                      background: accent.color,
                      boxShadow: `0 0 8px ${accent.color}`,
                    }}
                  />
                  <span className={styles.cardLabel} style={{ color: accent.color }}>
                    {cat.label}
                  </span>
                </div>

                <div className={styles.skillList}>
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={styles.skillPill}
                      style={{
                        '--pill-color': accent.color,
                        '--pill-bg': accent.bg,
                        '--pill-border': accent.border,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.orbit}>
          <div className={styles.orbitRing} ref={orbitRef}>
            {coreStack.map((item, i) => {
              const angle = (i / coreStack.length) * 360;
              const radiusX = 140;
              const radiusY = 50;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radiusX;
              const y = Math.sin(rad) * radiusY;

              return (
                <span
                  key={item}
                  className={styles.orbitItem}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${-angle}deg)`,
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
