import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import { entries } from './notesData'
import styles from './Notes.module.css'

export default function Notes() {
  const { lang } = useLang()

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.05s' }}>
          <p className={styles.eyebrow}>// {t('journal', 'log', lang)}</p>
          <h2 className={styles.title}>notes</h2>
        </div>

        <p className={`${styles.intro} fade-up`} style={{ animationDelay: '0.1s' }}>
          {t(
            "Notes courtes sur des problèmes réels rencontrés en construisant, surtout Adaline. Pas de relecture éditoriale, juste ce qui s'est passé.",
            "Short notes on real problems hit while building things, mostly Adaline. No editorial polish, just what happened.",
            lang
          )}
        </p>

        <div className={styles.list}>
          {entries.map((entry, i) => (
            <div key={entry.date} className={`${styles.entry} fade-up`} style={{ animationDelay: `${0.14 + i * 0.06}s` }}>
              <div className={styles.entryMeta}>
                <span className={styles.entryDate}>{entry.date}</span>
                <span className={styles.entryTag}>{entry.tag}</span>
              </div>
              <div className={styles.entryTitle}>{t(entry.titleFr, entry.titleEn, lang)}</div>
              <div className={styles.entryBody}>
                {(lang === 'fr' ? entry.bodyFr : entry.bodyEn).map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
