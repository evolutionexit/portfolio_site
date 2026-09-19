import { useNavigate } from 'react-router-dom'
import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './Home.module.css'

const tags = ['Python', 'C / Embedded', 'React', 'MQTT', 'Raspberry Pi', 'Linux', 'TypeScript']

export default function Home() {
  const { lang } = useLang()
  const nav = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <p className={`${styles.eyebrow} fade-up`} style={{ animationDelay: '0.05s' }}>
          {t('Étudiant · Développeur · Alsace', 'Student · Developer · Alsace', lang)}
        </p>
        <h1 className={`${styles.name} fade-up`} style={{ animationDelay: '0.15s' }}>
          Michel<br /><em>Moors</em>
        </h1>
        <p className={`${styles.desc} fade-up`} style={{ animationDelay: '0.25s' }}>
          {t(
            "Passionné par les systèmes embarqués, le développement logiciel et les mathématiques. En Terminale au Lycée Don Bosco, je construis des projets qui relient le matériel et le logiciel.",
            "Passionate about embedded systems, software development, and mathematics. Final-year student at Lycée Don Bosco, building projects that bridge hardware and software.",
            lang
          )}
        </p>
        <div className={`${styles.tags} fade-up`} style={{ animationDelay: '0.35s' }}>
          {tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
        <div className={`${styles.cta} fade-up`} style={{ animationDelay: '0.45s' }}>
          <button className={styles.btnPrimary} onClick={() => nav('/projects')}>
            {t('Voir mes projets', 'View my projects', lang)}
          </button>
          <button className={styles.btnSecondary} onClick={() => nav('/contact')}>
            {t('Me contacter', 'Get in touch', lang)}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
