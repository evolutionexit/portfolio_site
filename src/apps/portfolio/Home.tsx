import { useNavigate, Link } from 'react-router-dom'
import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import { entries as notesEntries } from './notesData'
import styles from './Home.module.css'

const tags = ['C / Embedded', 'Python', 'React', 'TypeScript', 'MQTT', 'Raspberry Pi', 'Linux', 'TinyUSB']

const latestNote = notesEntries[0]

const selectedWork = [
  {
    year: '2024 —',
    status: 'active' as const,
    statusFr: 'en cours',
    statusEn: 'active',
    titleFr: 'Adaline',
    titleEn: 'Adaline',
    descFr: "Installation d'OS à distance par émulation clavier USB — du Pico W au dashboard React, de bout en bout.",
    descEn: 'Remote OS install via USB keyboard emulation — Pico W to React dashboard, end to end.',
    to: '/projects/adaline',
  },
  {
    year: '2025',
    status: 'live' as const,
    statusFr: 'en ligne',
    statusEn: 'live',
    titleFr: 'mmoors.me',
    titleEn: 'mmoors.me',
    descFr: 'Ce site. React, Vite, TypeScript, système i18n FR/EN maison.',
    descEn: 'This site. React, Vite, TypeScript, a hand-rolled FR/EN i18n system.',
    to: '/projects',
  },
  {
    year: '2025',
    status: 'done' as const,
    statusFr: 'terminé',
    statusEn: 'done',
    titleFr: 'CartPole — Q-Learning & PPO',
    titleEn: 'CartPole — Q-Learning & PPO',
    descFr: "Q-Learning contre PPO sur l'environnement CartPole de Gymnasium, en PyTorch.",
    descEn: "Q-Learning vs PPO on Gymnasium's CartPole environment, in PyTorch.",
    to: '/projects',
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
              "Je construis des systèmes qui relient matériel et logiciel, du firmware en C aux dashboards React — bientôt à l'UNIGE, en route vers l'EPFL.",
              'I build systems that bridge hardware and software, from C firmware to React dashboards — incoming UNIGE, headed for EPFL.',
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
            <div className={styles.panelLabel}>{t('en ce moment', 'right now', lang)}</div>
            <div className={styles.panelList}>

              <div className={styles.panelItem}>
                <Link to="/notes" className={styles.panelTitleLink}>
                  <div className={styles.panelTitle}>{t(latestNote.titleFr, latestNote.titleEn, lang)}</div>
                </Link>
                <div className={styles.panelDesc}>{t('dernière entrée du journal →', 'latest log entry →', lang)}</div>
              </div>
              <div className={styles.panelDivider} />

              <div className={styles.panelItem}>
                <div className={styles.panelTitle}>Adaline v2</div>
                <div className={styles.panelDesc}>
                  {t('point d’accès direct sur le Pi pour réduire la latence UDP.', 'direct Pi access point to cut UDP latency.', lang)}
                </div>
              </div>
              <div className={styles.panelDivider} />

              <div className={styles.panelItem}>
                <div className={styles.panelTitle}>{t('ouvert aux stages', 'open to internships', lang)}</div>
                <div className={styles.panelDesc}>
                  {t('systèmes embarqués, développement logiciel, informatique.', 'embedded systems, software development, CS.', lang)}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div className={styles.work}>
        <div className={`${styles.workHeader} fade-up`} style={{ animationDelay: '0.1s' }}>
          {t('travaux sélectionnés', 'selected work', lang)}
        </div>
        <div className={styles.workGrid}>
          {selectedWork.map((w, i) => (
            <Link key={i} to={w.to} className={`${styles.workCard} fade-up`} style={{ animationDelay: `${0.16 + i * 0.06}s` }}>
              <div className={styles.workMeta}>
                <span className={styles.workYear}>{w.year}</span>
                <span className={`${styles.workStatus} ${styles[w.status]}`}>{t(w.statusFr, w.statusEn, lang)}</span>
              </div>
              <div className={styles.workTitle}>{t(w.titleFr, w.titleEn, lang)}</div>
              <p className={styles.workDesc}>{t(w.descFr, w.descEn, lang)}</p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
