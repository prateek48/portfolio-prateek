import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects } from '../../data/projects';
import SectionLabel from '../common/SectionLabel';
import GradientText from '../common/GradientText';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const accentColors = {
  red: 'var(--accent-red)',
  gold: 'var(--accent-gold)',
  green: 'var(--accent-green)',
};

function DrawingToolPreview() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" className={styles.previewContent}>
      <rect x="10" y="15" width="40" height="30" rx="4" stroke="#ff6b6b" strokeWidth="1.5" opacity="0.6" />
      <circle cx="85" cy="35" r="18" stroke="#ffd93d" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M20 75 Q45 50 70 75 Q95 100 110 70"
        stroke="#6bcb77"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <line x1="55" y1="20" x2="75" y2="55" stroke="#ff6b6b" strokeWidth="1" opacity="0.35" />
      <circle cx="30" cy="60" r="6" stroke="#ffd93d" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

function CrownClothingPreview() {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#ff6b6b', '#6bcb77', '#ffd93d'];
  return (
    <div
      className={styles.previewContent}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 28px)', gap: '6px' }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: color,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
}

const previewMap = {
  'drawing-tool': DrawingToolPreview,
  'crown-clothing': CrownClothingPreview,
};

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const scroller = document.getElementById('scroll-container');

    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateX: 12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: `top ${65 - i * 10}%`,
          },
        });
      });

      gsap.from(`.${styles.techPill}`, {
        x: 20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 55%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.bgAccent} />

      <div className={styles.content}>
        <SectionLabel number="04" text="PROJECTS" accent="red" />
        <h2 className={styles.heading}>
          <GradientText from="var(--accent-red)" to="var(--accent-green)">
            Things I&apos;ve Built
          </GradientText>
        </h2>

        <div className={styles.grid}>
          {projects.map((project) => {
            const Preview = previewMap[project.id];
            return (
              <div key={project.id} className={styles.card} style={{ perspective: '800px' }}>
                <div className={styles.preview}>
                  {Preview && <Preview />}
                  <div className={styles.techPills}>
                    {project.tech.map((t, i) => (
                      <span
                        key={t}
                        className={styles.techPill}
                        style={{ color: accentColors[project.techAccents[i]] }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.info}>
                  <div className={styles.infoHeader}>
                    <h3>{project.title}</h3>
                    <div className={styles.links}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconButton}
                          aria-label={`${project.title} live site`}
                        >
                          <FiExternalLink />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconButton}
                          aria-label={`${project.title} GitHub`}
                        >
                          <FiGithub />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className={styles.description}>{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
