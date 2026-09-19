import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2025 Michel Moors</span>
      <div className={styles.right}>
        <a href="https://github.com/evolutionexit" target="_blank" rel="noopener">github.com/evolutionexit</a>
        <span>mmoors.me</span>
      </div>
    </footer>
  )
}
