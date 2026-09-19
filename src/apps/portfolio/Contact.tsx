import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './Contact.module.css'
import cvPdf from '../../../assets/cv.pdf' // Adjust path to where your PDF is stored

export default function Contact() {
  const { lang } = useLang()

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.05s' }}>
          <p className={styles.eyebrow}>// {t('me joindre', 'reach out', lang)}</p>
          <h2 className={styles.title}>contact</h2>
        </div>

        <div className={`fade-up`} style={{ animationDelay: '0.12s' }}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardLabel}>email</div>
              <a href="mailto:michel.moors2008@gmail.com" className={styles.cardValue}>michel.moors2008@gmail.com</a>
            </div>
            <div className={styles.card}>
              <div className={styles.cardLabel}>github</div>
              <a href="https://github.com/evolutionexit" target="_blank" rel="noopener" className={styles.cardValue}>github.com/evolutionexit</a>
            </div>
          </div>

          {/* Use the imported variable here */}
          <a href={cvPdf} className={styles.cvBtn} download="cv.pdf">
            <span>{t('↓ télécharger mon CV (PDF)', '↓ download CV (PDF)', lang)}</span>
            <span className={styles.arrow}>↓</span>
          </a>
        </div>

        <div className={`${styles.note} fade-up`} style={{ animationDelay: '0.2s' }}>
          {t(
            "// À la recherche d'un stage en systèmes embarqués, développement logiciel ou informatique. N'hésitez pas.",
            "// Open to internships in embedded systems, software development, or CS. Feel free to reach out.",
            lang
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}