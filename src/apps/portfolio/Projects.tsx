import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './Projects.module.css'

interface Project {
  year: string
  titleFr: string
  titleEn: string
  descFr: string
  descEn: string
  tags: string[]
  status: 'active' | 'done' | 'live'
  statusFr: string
  statusEn: string
}

const projects: Project[] = [
  {
    year: '2024 —',
    titleFr: 'Système de contrôle clavier USB sans fil',
    titleEn: 'Wireless USB Keyboard Control System',
    descFr: "Système permettant de contrôler à distance n'importe quel ordinateur via émulation clavier USB, piloté depuis un smartphone. Basé sur un Raspberry Pi 5 et un Pico W, avec une infrastructure MQTT/TLS complète et un broker Mosquitto.",
    descEn: "A system for remotely controlling any computer via USB keyboard emulation, operated from a smartphone. Built on a Raspberry Pi 5 and Pico W, with a full MQTT/TLS infrastructure and Mosquitto broker.",
    tags: ['C / TinyUSB', 'Python', 'MQTT', 'Raspberry Pi', 'Linux', 'TLS', 'lwIP'],
    status: 'active',
    statusFr: 'En cours',
    statusEn: 'Active',
  },
  {
    year: '2024',
    titleFr: 'Tour virtuelle 3D du Louvre',
    titleEn: '3D Virtual Tour of the Louvre',
    descFr: "Moteur 3D reconstituant les salles emblématiques du Louvre, développé en équipe dans le cadre des Olympiades de NSI. Projet classé au niveau académique.",
    descEn: "3D engine recreating iconic rooms of the Louvre, developed as a team for the NSI Olympiad. Ranked at the academic level.",
    tags: ['Python', 'OpenGL', '3D'],
    status: 'done',
    statusFr: 'Terminé',
    statusEn: 'Done',
  },
  {
    year: '2024',
    titleFr: 'mmoors.me — Site personnel',
    titleEn: 'mmoors.me — Personal website',
    descFr: "Application React / Vite / TypeScript déployée sur Cloudflare Pages, avec DNS géré via Cloudflare et domaine hébergé sur amen.fr.",
    descEn: "React / Vite / TypeScript application deployed on Cloudflare Pages, with DNS managed via Cloudflare.",
    tags: ['React', 'Vite', 'TypeScript', 'Cloudflare'],
    status: 'live',
    statusFr: 'En ligne',
    statusEn: 'Live',
  },
]

export default function Projects() {
  const { lang } = useLang()

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.05s' }}>
          <p className={styles.eyebrow}>{t('Réalisations', 'Work', lang)}</p>
          <h2 className={styles.title}>{t('Projets', 'Projects', lang)}</h2>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} className={`${styles.card} fade-up`} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <div className={styles.meta}>
                <span className={styles.year}>{p.year}</span>
                <span className={`${styles.status} ${styles[p.status]}`}>
                  {t(p.statusFr, p.statusEn, lang)}
                </span>
              </div>
              <div className={styles.cardTitle}>{t(p.titleFr, p.titleEn, lang)}</div>
              <p className={styles.desc}>{t(p.descFr, p.descEn, lang)}</p>
              <div className={styles.tags}>
                {p.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
