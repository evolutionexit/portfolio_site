import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './Contact.module.css'

export default function Contact() {
  const { lang } = useLang()

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.05s' }}>
          <p className={styles.eyebrow}>{t('Me joindre', 'Reach out', lang)}</p>
          <h2 className={styles.title}>Contact</h2>
        </div>

        <div className={`${styles.grid} fade-up`} style={{ animationDelay: '0.12s' }}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Email</div>
            <a href="mailto:michel.moors2008@gmail.com" className={styles.cardValue}>michel.moors2008@gmail.com</a>
          </div>
          <div className={styles.card}>
            <div className={styles.cardLabel}>{t('Site web', 'Website', lang)}</div>
            <a href="https://mmoors.me" className={styles.cardValue}>mmoors.me</a>
          </div>
        </div>

        <a
          href="/cv.pdf"
          className={`${styles.cvBtn} fade-up`}
          style={{ animationDelay: '0.2s' }}
          download
        >
          <span>{t('Télécharger mon CV (PDF)', 'Download my CV (PDF)', lang)}</span>
          <span className={styles.arrow}>↓</span>
        </a>

        <div className={`${styles.note} fade-up`} style={{ animationDelay: '0.28s' }}>
          {t(
            "Je suis à la recherche d'un stage en informatique, systèmes embarqués ou développement logiciel. N'hésitez pas à me contacter pour toute opportunité.",
            "I am looking for an internship in computer science, embedded systems, or software development. Feel free to reach out for any opportunity.",
            lang
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
