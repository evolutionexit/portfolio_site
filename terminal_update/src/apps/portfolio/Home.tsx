import { useNavigate } from 'react-router-dom'
import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import Terminal from './Terminal'
import styles from './Home.module.css'

const tags = ['C / Embedded', 'Python', 'React', 'TypeScript', 'MQTT', 'Raspberry Pi', 'Linux', 'TinyUSB']

export default function Home() {
  const { lang } = useLang()
  const nav = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>

        <div className={styles.left}>
          <div className={`${styles.prompt} fade-up`} style={{ animationDelay: '0.05s' }}>
            <span className={styles.ps1}>mmoors@debian</span>
            <span className={styles.cmd}>:~$</span>
            <span>whoami</span>
          </div>

          <h1 className={`${styles.name} fade-up`} style={{ animationDelay: '0.12s' }}>
            Michel
          </h1>
          <div className={`${styles.nameLine2} fade-up`} style={{ animationDelay: '0.18s' }}>
            Moors<span className={styles.cursor} />
          </div>

          <p className={`${styles.desc} fade-up`} style={{ animationDelay: '0.26s' }}>
            {t(
              "Développeur embarqué & web. Je construis des systèmes qui relient le matériel et le logiciel — du firmware en C sur microcontrôleur jusqu'au dashboard React. Bientôt à l'UNIGE, en route vers l'EPFL.",
              "Embedded & web developer. I build systems that bridge hardware and software — from C firmware on microcontrollers to React dashboards. Incoming UNIGE, heading toward EPFL.",
              lang
            )}
          </p>

          <div className={`${styles.tags} fade-up`} style={{ animationDelay: '0.32s' }}>
            {tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
          </div>

          <div className={`${styles.cta} fade-up`} style={{ animationDelay: '0.38s' }}>
            <button className={styles.btnPrimary} onClick={() => nav('/projects')}>
              {t('→ voir mes projets', '→ view projects', lang)}
            </button>
            <button className={styles.btnSecondary} onClick={() => nav('/contact')}>
              {t('me contacter', 'get in touch', lang)}
            </button>
          </div>
        </div>

        <div className={`${styles.right} fade-up`} style={{ animationDelay: '0.28s' }}>
          <Terminal />
        </div>

      </div>
      <Footer />
    </div>
  )
}
