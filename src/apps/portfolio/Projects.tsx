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
  link?: string
}

const projects: Project[] = [
  {
    year: '2024 —',
    titleFr: 'Adaline — Contrôle clavier USB sans fil',
    titleEn: 'Adaline — Wireless USB Keyboard Control',
    descFr: "Système permettant d'installer un OS à distance sur une machine vierge via émulation clavier USB. Chaîne complète : dashboard React → MQTT/WebSocket → Cloudflare Tunnel → RPi 5 → UDP → Pico W → HID USB → machine cible. Firmware en C avec TinyUSB et lwIP.",
    descEn: "System for remotely installing an OS on a bare machine via USB keyboard emulation. Full chain: React dashboard → MQTT/WebSocket → Cloudflare Tunnel → RPi 5 → UDP → Pico W → HID USB → target machine. Firmware in C with TinyUSB and lwIP.",
    tags: ['C / TinyUSB', 'lwIP', 'Python', 'MQTT', 'Raspberry Pi', 'React', 'TypeScript', 'Cloudflare'],
    status: 'active',
    statusFr: 'en cours',
    statusEn: 'active',
    link: 'https://github.com/evolutionexit/Adaline',
  },
  {
    year: '2025',
    titleFr: 'mmoors.me — Site personnel',
    titleEn: 'mmoors.me — Personal website',
    descFr: "Ce site. React + Vite + TypeScript, système i18n FR/EN maison, déployé sur Cloudflare Pages avec DNS sur Cloudflare.",
    descEn: "This site. React + Vite + TypeScript, custom FR/EN i18n system, deployed to Cloudflare Pages with Cloudflare DNS.",
    tags: ['React', 'Vite', 'TypeScript', 'CSS Modules', 'Cloudflare'],
    status: 'live',
    statusFr: 'en ligne',
    statusEn: 'live',
    link: 'https://mmoors.me',
  },
  {
    year: '2025',
    titleFr: 'CartPole — Q-Learning & PPO',
    titleEn: 'CartPole — Q-Learning & PPO',
    descFr: "Implémentation et comparaison de Q-Learning et PPO (Proximal Policy Optimization) sur l'environnement CartPole de Gymnasium. PyTorch, réseaux actor-critic, visualisations matplotlib. Présenté au Grand Oral de terminale.",
    descEn: "Implementation and comparison of Q-Learning and PPO (Proximal Policy Optimization) on Gymnasium's CartPole environment. PyTorch, actor-critic networks, matplotlib visualisations. Presented for the Grand Oral exam.",
    tags: ['Python', 'PyTorch', 'RL', 'Gymnasium', 'PPO'],
    status: 'done',
    statusFr: 'terminé',
    statusEn: 'done',
  },
  {
    year: '2024',
    titleFr: 'Tour virtuelle 3D du Louvre',
    titleEn: '3D Virtual Tour of the Louvre',
    descFr: "Moteur 3D reconstituant les salles emblématiques du Louvre, développé en équipe pour les Olympiades de NSI. Projet classé au niveau académique.",
    descEn: "3D engine recreating iconic rooms of the Louvre, developed as a team for the NSI Olympiad. Ranked at the academic level.",
    tags: ['Python', 'OpenGL', '3D'],
    status: 'done',
    statusFr: 'terminé',
    statusEn: 'done',
  },
]

export default function Projects() {
  const { lang } = useLang()

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.05s' }}>
          <p className={styles.eyebrow}>// {t('réalisations', 'work', lang)}</p>
          <h2 className={styles.title}>{t('projets', 'projects', lang)}</h2>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} className={`${styles.card} fade-up`} style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
              <div className={styles.meta}>
                <span className={styles.year}>{p.year}</span>
                <span className={`${styles.status} ${styles[p.status]}`}>
                  {t(p.statusFr, p.statusEn, lang)}
                </span>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener" style={{ marginLeft: 'auto', fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.04em', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}>
                    ↗ {p.link.replace('https://', '')}
                  </a>
                )}
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
