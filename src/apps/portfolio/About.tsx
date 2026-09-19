import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './About.module.css'

export default function About() {
  const { lang } = useLang()

  const stats = [
    { labelFr: 'localisation', labelEn: 'location', valueFr: 'Haute-Savoie, FR', valueEn: 'Haute-Savoie, FR' },
    { labelFr: 'formation', labelEn: 'education', valueFr: 'UNIGE — Math, Info & Sciences du numérique', valueEn: 'UNIGE — Maths, CS & Digital Sciences' },
    { labelFr: 'objectif', labelEn: 'goal', valueFr: 'Bachelor Genève → Master EPFL / ETH', valueEn: 'Bachelor Geneva → Master EPFL / ETH' },
    { labelFr: 'langues', labelEn: 'languages', valueFr: 'FR · EN (C1) · DE', valueEn: 'FR · EN (C1) · DE' },
  ]

  const education = [
    { date: '2025 —', role: t('Bachelor — Mathématiques, Informatique & Sciences du numérique', 'Bachelor — Maths, CS & Digital Sciences', lang), org: 'UNIGE, Genève' },
    { date: '2022 – 2025', role: t('Terminale Générale — Maths & Physique-Chimie', 'Baccalauréat — Maths & Physics', lang), org: 'Lycée Don Bosco, Landser' },
    { date: '2022 · 3 sem.', role: t("Stage — Industrie pharmaceutique", 'Internship — Pharmaceutical industry', lang), org: 'Roche' },
    { date: '2024', role: t("Stage d'observation — Commerce", 'Observation Internship — Retail', lang), org: 'Intersport' },
  ]

  const achievements = [
    { date: '2025', role: 'Grand Oral — Mathématiques', org: t("Gradient & RL : Q-Learning vs PPO sur CartPole", 'Gradient & RL: Q-Learning vs PPO on CartPole', lang) },
    { date: '2024', role: t('Olympiades de NSI — projet classé', 'NSI Olympiad — ranked project', lang), org: t('Tour 3D du Louvre', '3D Louvre tour', lang) },
    { date: '2023 – 2024', role: t('Olympiades de Mathématiques', 'Mathematics Olympiad', lang), org: 'Lycée Don Bosco' },
    { date: '2023 – 2024', role: t('Rallye des Mathématiques', 'Mathematics Rally', lang), org: t('2 participations', '2 participations', lang) },
    { date: '2025', role: 'PSC1', org: t('Prévention et Secours Civiques', 'French First Aid Certificate', lang) },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.05s' }}>
          <p className={styles.eyebrow}>// {t('qui suis-je', 'who I am', lang)}</p>
          <h2 className={styles.title}>{t('à propos', 'about', lang)}</h2>
        </div>

        <div className={`${styles.statsGrid} fade-up`} style={{ animationDelay: '0.1s' }}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statBlock}>
              <div className={styles.statLabel}>{t(s.labelFr, s.labelEn, lang)}</div>
              <div className={styles.statValue}>{t(s.valueFr, s.valueEn, lang)}</div>
            </div>
          ))}
        </div>

        <p className={`${styles.bio} fade-up`} style={{ animationDelay: '0.18s' }}>
          {t(
            "Ce qui me motive, c'est de comprendre comment les choses fonctionnent — du firmware qui tourne sur un microcontrôleur jusqu'à l'interface qui s'affiche sur un écran. Je construis des systèmes complets, du hardware au cloud. Je joue aux échecs, je lis des manga, et j'aime les problèmes qui résistent.",
            "What drives me is understanding how things work — from firmware running on a microcontroller to the interface on a screen. I build end-to-end systems, from hardware to cloud. I play chess, read manga, and enjoy problems that push back.",
            lang
          )}
        </p>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.24s' }}>
          <div className={styles.sectionTitle}>{t('formation & expériences', 'education & experience', lang)}</div>
          {education.map((item, i) => (
            <div key={i} className={styles.tlItem}>
              <div className={styles.tlDate}>{item.date}</div>
              <div className={styles.tlRight}>
                <div className={styles.tlRole}>{item.role}</div>
                <div className={styles.tlOrg}>{item.org}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.30s' }}>
          <div className={styles.sectionTitle}>{t('distinctions', 'achievements', lang)}</div>
          {achievements.map((item, i) => (
            <div key={i} className={styles.tlItem}>
              <div className={styles.tlDate}>{item.date}</div>
              <div className={styles.tlRight}>
                <div className={styles.tlRole}>{item.role}</div>
                <div className={styles.tlOrg}>{item.org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
