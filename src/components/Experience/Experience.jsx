import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../../data/experience';
import SectionLabel from '../common/SectionLabel';
import GradientText from '../common/GradientText';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const accentMap = {
  red: {
    color: 'var(--accent-red)',
    bg: 'var(--accent-red-bg)',
    border: 'var(--accent-red-border)',
  },
  gold: {
    color: 'var(--accent-gold)',
    bg: 'var(--accent-gold-bg)',
    border: 'var(--accent-gold-border)',
  },
  green: {
    color: 'var(--accent-green)',
    bg: 'var(--accent-green-bg)',
    border: 'var(--accent-green-border)',
  },
};

const ROAD_HEIGHT = 420;
const STOP_COUNT = experiences.length;

function buildRoadPath() {
  const points = [];
  const segH = ROAD_HEIGHT / (STOP_COUNT - 1);
  for (let i = 0; i < STOP_COUNT; i++) {
    const y = i * segH;
    const x = 30 + Math.sin(i * 1.2) * 14;
    points.push({ x, y });
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midY = (curr.y + next.y) / 2;
    d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
  }
  return d;
}

export default function Experience() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const travelerRef = useRef(null);

  const roadPath = buildRoadPath();

  useEffect(() => {
    const pathEl = pathRef.current;
    const travelerEl = travelerRef.current;
    if (!pathEl) return;

    const totalLength = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = totalLength;
    pathEl.style.strokeDashoffset = totalLength;

    const scroller = document.getElementById('scroll-container');

    const ctx = gsap.context(() => {
      gsap.to(pathEl, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      if (travelerEl) {
        gsap.to(travelerEl, {
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5],
          },
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }

      gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
        gsap.to(card, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: `top ${70 - i * 8}%`,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <div className={styles.bgAccent1} />
      <div className={styles.bgAccent2} />

      <div className={styles.content}>
        <SectionLabel number="03" text="CAREER PATH" accent="gold" />
        <h2 className={styles.heading}>
          <GradientText from="var(--accent-gold)" to="var(--accent-red)">
            The Road So Far
          </GradientText>
        </h2>

        <div className={styles.roadLayout}>
          <div className={styles.road}>
            <svg
              width="60"
              height={ROAD_HEIGHT}
              viewBox={`0 0 60 ${ROAD_HEIGHT}`}
              fill="none"
            >
              <defs>
                <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="25%" stopColor="#ffd93d" />
                  <stop offset="50%" stopColor="#6bcb77" />
                  <stop offset="75%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#ffd93d" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d={roadPath}
                stroke="url(#roadGrad)"
                strokeWidth="3"
                strokeDasharray="8 6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div ref={travelerRef} className={styles.traveler} />
          </div>

          <div className={styles.stops}>
            {experiences.map((exp) => {
              const accent = accentMap[exp.accent];
              return (
                <div key={exp.id} className={styles.stop}>
                  <span
                    className={`${styles.node} ${exp.badge === 'CURRENT' ? styles.nodePulse : ''}`}
                    style={{ color: accent.color, background: accent.color }}
                  />
                  <div
                    className={styles.card}
                    style={{
                      borderColor: accent.border,
                    }}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.company} style={{ color: accent.color }}>
                        {exp.company}
                      </span>
                      {exp.badge && (
                        <span
                          className={`${styles.badge} ${exp.badge === 'CURRENT' ? styles.badgeCurrent : ''}`}
                        >
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <div className={styles.role}>{exp.role}</div>
                    <div className={styles.period}>{exp.period}</div>
                    <div className={styles.description}>{exp.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
