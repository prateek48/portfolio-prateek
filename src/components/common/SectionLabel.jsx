import styles from './common.module.css';

const accentColors = {
  red: 'var(--accent-red)',
  gold: 'var(--accent-gold)',
  green: 'var(--accent-green)',
};

export default function SectionLabel({ number, text, accent = 'red' }) {
  return (
    <div className={styles.sectionLabel} style={{ color: accentColors[accent] }}>
      {number} &mdash; {text}
    </div>
  );
}
