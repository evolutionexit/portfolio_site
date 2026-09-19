import { useNavigate } from 'react-router-dom'
import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './Home.module.css'

const tags = ['C / Embedded', 'Python', 'React', 'TypeScript', 'MQTT', 'Raspberry Pi', 'Linux', 'TinyUSB']

const currently = [
  {
    titleFr: 'Adaline',
    titleEn: 'Adaline',
    descFr: "Contrôle clavier USB sans fil — installation d'OS à distance sur une chaîne C → React complète.",
    descEn: 'Wireless USB keyboard control — remote OS install over a full C → React chain.',
  },
  {
    titleFr: 'Bachelor, UNIGE',
    titleEn: 'Bachelor, UNIGE',
    descFr: 'Mathématiques, Informatique & Sciences du numérique — en route vers l’EPFL / ETH.',
    descEn: 'Mathematics, CS & Digital Sciences — on the way to EPFL / ETH.',
  },
  {
    titleFr: 'Ouvert aux stages',
    titleEn: 'Open to internships',
    descFr: 'Systèmes embarqués, développement logiciel, informatique.',
    descEn: 'Embedded systems, software development, CS.',
  },
]

export default function Home() {
  const { lang } = useLang()
  const nav = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>

        <div className={styles.left}>
          <div className={`${styles.eyebrow} fade-up`} style={{ animationDelay: '0.05s' }}>
            {t('développeur embarqué & web', 'embedded & web developer', lang)}
          </div>

          <h1 className={`${styles.name} fade-up`} style={{ animationDelay: '0.12s' }}>
            Michel<br /><span className={styles.nameDim}>Moors.</span>
          </h1>

          <p className={`${styles.desc} fade-up`} style={{ animationDelay: '0.2s' }}>
            {t(
              "Je construis des systèmes qui relient le matériel et le logiciel — du firmware en C sur microcontrôleur jusqu'au dashboard React. Bientôt à l'UNIGE, en route vers l'EPFL.",
              'I build systems that bridge hardware and software — from C firmware on microcontrollers to React dashboards. Incoming UNIGE, heading toward EPFL.',
              lang
            )}
          </p>

          <div className={`${styles.tags} fade-up`} style={{ animationDelay: '0.28s' }}>
            {tags.map((tag, i) => (
              <span key={tag} className={styles.tag}>
                {tag}
                {i < tags.length - 1 && <span className={styles.dot}>·</span>}
              </span>
            ))}
          </div>

          <div className={`${styles.cta} fade-up`} style={{ animationDelay: '0.36s' }}>
            <button className={styles.btnPrimary} onClick={() => nav('/projects')}>
              {t('voir mes projets', 'view projects', lang)} →
            </button>
            <button className={styles.btnSecondary} onClick={() => nav('/contact')}>
              {t('me contacter', 'get in touch', lang)}
            </button>
          </div>
        </div>

        <div className={`${styles.right} fade-up`} style={{ animationDelay: '0.24s' }}>
          <div className={styles.panel}>
            <div className={styles.panelLabel}>{t('en ce moment', 'currently', lang)}</div>
            <div className={styles.panelList}>
              {currently.map((item, i) => (
                <div key={i}>
                  <div className={styles.panelItem}>
                    <div className={styles.panelTitle}>{t(item.titleFr, item.titleEn, lang)}</div>
                    <div className={styles.panelDesc}>{t(item.descFr, item.descEn, lang)}</div>
                  </div>
                  {i < currently.length - 1 && <div className={styles.panelDivider} />}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
