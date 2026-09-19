import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './About.module.css'

export default function About() {
  const { lang } = useLang()

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.05s' }}>
          <p className={styles.eyebrow}>{t('Qui suis-je', 'Who I am', lang)}</p>
          <h2 className={styles.title}>{t('À propos', 'About', lang)}</h2>
        </div>

        <div className={`${styles.statsGrid} fade-up`} style={{ animationDelay: '0.1s' }}>
          {[
            { labelFr: 'Localisation', labelEn: 'Location', valueFr: 'Landser, Alsace', valueEn: 'Landser, Alsace' },
            { labelFr: 'Niveau', labelEn: 'Level', valueFr: 'Terminale Générale', valueEn: 'Final year (Bac Général)' },
            { labelFr: 'Objectif', labelEn: 'Goal', valueFr: 'Bachelor Genève → EPFL / ETH', valueEn: 'Bachelor Geneva → EPFL / ETH' },
            { labelFr: 'Langues', labelEn: 'Languages', valueFr: 'FR · EN (C1) · DE', valueEn: 'FR · EN (C1) · DE' },
          ].map((s, i) => (
            <div key={i} className={styles.statBlock}>
              <div className={styles.statLabel}>{t(s.labelFr, s.labelEn, lang)}</div>
              <div className={styles.statValue}>{t(s.valueFr, s.valueEn, lang)}</div>
            </div>
          ))}
        </div>

        <p className={`${styles.bio} fade-up`} style={{ animationDelay: '0.18s' }}>
          {t(
            "Je suis étudiant en Terminale au Lycée Don Bosco de Landser, avec des spécialités en Mathématiques et Physique-Chimie. Ce qui me motive, c'est de comprendre comment les choses fonctionnent — du firmware qui tourne sur un microcontrôleur jusqu'à l'interface qui s'affiche sur un écran. Je pratique le football en compétition et j'aime les jeux de logique.",
            "I'm a final-year student at Lycée Don Bosco in Landser, specialising in Mathematics and Physics-Chemistry. What drives me is understanding how things work — from firmware running on a microcontroller to the interface displayed on a screen. I play football competitively and enjoy logic games.",
            lang
          )}
        </p>

        <div className={`${styles.timeline} fade-up`} style={{ animationDelay: '0.26s' }}>

          <div className={styles.tlSectionTitle}>{t('Formation & Expériences', 'Education & Experience', lang)}</div>

          <div className={styles.tlItem}>
            <div className={styles.tlDate}>2022 — 2025</div>
            <div className={styles.tlRole}>{t('Terminale Générale — Maths & Physique-Chimie', 'Baccalauréat Général — Maths & Physics', lang)}</div>
            <div className={styles.tlOrg}>Lycée Don Bosco, Landser</div>
          </div>

          <div className={styles.tlItem}>
            <div className={styles.tlDate}>2024</div>
            <div className={styles.tlRole}>{t("Stage d'observation — Commerce & Distribution", 'Observation Internship — Retail', lang)}</div>
            <div className={styles.tlOrg}>Intersport, Alsace</div>
          </div>

          <div className={styles.tlItem}>
            <div className={styles.tlDate}>{t('2022 · 3 semaines', '2022 · 3 weeks', lang)}</div>
            <div className={styles.tlRole}>{t('Stage — Industrie pharmaceutique', 'Internship — Pharmaceutical industry', lang)}</div>
            <div className={styles.tlOrg}>Roche</div>
          </div>

          <div className={styles.tlSectionTitle} style={{ marginTop: '32px' }}>{t('Distinctions', 'Achievements', lang)}</div>

          <div className={styles.tlItem}>
            <div className={styles.tlDate}>2025</div>
            <div className={styles.tlRole}>PSC1</div>
            <div className={styles.tlOrg}>{t('Prévention et Secours Civiques de niveau 1', 'French First Aid Certificate', lang)}</div>
          </div>

          <div className={styles.tlItem}>
            <div className={styles.tlDate}>2023 — 2024</div>
            <div className={styles.tlRole}>{t('Rallye des Mathématiques', 'Mathematics Rally', lang)}</div>
            <div className={styles.tlOrg}>{t('2 participations', '2 participations', lang)}</div>
          </div>

          <div className={styles.tlItem}>
            <div className={styles.tlDate}>2024</div>
            <div className={styles.tlRole}>{t('Olympiades de NSI — projet classé', 'NSI Olympiad — ranked project', lang)}</div>
            <div className={styles.tlOrg}>{t('Tour 3D du Louvre', '3D Louvre tour', lang)}</div>
          </div>

          <div className={styles.tlItem}>
            <div className={styles.tlDate}>2023 — 2024</div>
            <div className={styles.tlRole}>{t('Olympiades de Mathématiques', 'Mathematics Olympiad', lang)}</div>
            <div className={styles.tlOrg}>{t('Lycée Don Bosco', 'Lycée Don Bosco', lang)}</div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
