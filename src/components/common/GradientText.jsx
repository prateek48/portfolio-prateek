import styles from './common.module.css';

export default function GradientText({ children, from = 'var(--accent-red)', to = 'var(--accent-gold)' }) {
  return (
    <span
      className={styles.gradientText}
      style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}
    >
      {children}
    </span>
  );
}
