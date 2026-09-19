import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang, t } from '../../i18n/LangContext'
import Footer from '../../components/Footer'
import styles from './AdalineCaseStudy.module.css'

const GITHUB_URL = 'https://github.com/evolutionexit/Adaline'

const buildStages = [
  {
    stageFr: 'Prototype',
    stageEn: 'Prototype',
    descFr: "Parti d'un concept façon USB Rubber Ducky : un microcontrôleur se faisant passer pour un clavier, rejouant un script de frappes fixe. Pas de réseau, pas de retour — juste prouver que l'émulation HID pouvait piloter un assistant d'installation.",
    descEn: 'Started as a USB Rubber Ducky-style proof of concept: a microcontroller pretending to be a keyboard, replaying a fixed script of keystrokes. No network, no feedback loop — just proving HID emulation could drive an install wizard.',
  },
  {
    stageFr: 'Firmware C',
    stageEn: 'C firmware',
    descFr: "Tout réécrit proprement sur un Raspberry Pi Pico W : de vrais descripteurs HID via TinyUSB, une pile réseau lwIP, et une file de frappes au lieu d'un script codé en dur.",
    descEn: 'Rewrote it properly on a Raspberry Pi Pico W: real HID descriptors over TinyUSB, an lwIP network stack, and a keystroke queue instead of a hardcoded script.',
  },
  {
    stageFr: 'Pont MQTT',
    stageEn: 'MQTT bridge',
    descFr: "Ajout d'un Raspberry Pi 5 faisant tourner Mosquitto comme broker entre le Pico et l'extérieur, parlant UDP en aval et MQTT en amont.",
    descEn: 'Added a Raspberry Pi 5 running Mosquitto as the broker between the Pico and the outside world, speaking UDP downstream and MQTT upstream.',
  },
  {
    stageFr: 'Dashboard React',
    stageEn: 'React dashboard',
    descFr: "Construction d'un dashboard React/TypeScript pour taper depuis un navigateur, parlant au broker via MQTT sur WebSocket plutôt qu'une socket brute.",
    descEn: 'Built a React/TypeScript dashboard to type from, talking to the broker over MQTT-over-WebSocket instead of a raw socket, so it works from any browser.',
  },
  {
    stageFr: 'Déploiement cloud',
    stageEn: 'Cloud deployment',
    descFr: "Mis un Cloudflare Tunnel devant le Pi pour que le dashboard puisse l'atteindre depuis n'importe où sans ouvrir de port chez moi, et déployé le dashboard sur Cloudflare Pages.",
    descEn: 'Put a Cloudflare Tunnel in front of the Pi so the dashboard can reach it from anywhere without opening a port on my home network, and deployed the dashboard itself to Cloudflare Pages.',
  },
]

const problems = [
  {
    titleFr: 'Les 14 % qui disparaissaient',
    titleEn: 'The 14% that went missing',
    textFr: "Au début, environ 14 % des frappes n'arrivaient tout simplement jamais sur la machine cible — assez pour corrompre tout script d'installation de plus de quelques lignes. La cause était une logique de déduplication sur le Pico censée ignorer les paquets UDP répétés lors d'une réémission, mais qui comparait avec un numéro de séquence obsolète, resté d'une session précédente. Elle supprimait donc silencieusement des frappes légitimes qui réutilisaient par hasard une vieille valeur de séquence. La correction : réinitialiser proprement l'état de séquence à la reconnexion, pas seulement au démarrage.",
    textEn: "Early on, about 14% of keystrokes just never arrived at the target machine — enough to corrupt any install script longer than a few lines. The cause was deduplication logic on the Pico meant to drop repeated UDP packets on retry, but it was comparing against a stale sequence number left over from a previous session. It silently dropped legitimate keystrokes that happened to reuse an old sequence value. Fixing it meant properly resetting sequence state on reconnect, not just on boot.",
  },
  {
    titleFr: "Ce qu'une relecture de code a vraiment trouvé",
    titleEn: 'What a code review actually caught',
    textFr: "Demander une relecture sur le chemin de réception UDP a révélé un vrai bug de correction : la vérification de longueur du paquet se faisait après la lecture du buffer, pas avant, donc un paquet tronqué pouvait lire au-delà de ses propres limites. La même relecture a aussi signalé que la connexion MQTT du dashboard n'avait aucune authentification — quiconque trouvait l'adresse du broker pouvait publier des frappes dans la file. Les deux ont été corrigés : la vérification des limites passe désormais avant la lecture, et la connexion MQTT exige des identifiants.",
    textEn: "Asking for a review on the UDP receive path turned up a genuine correctness bug: the packet-length check happened after the buffer was already read, not before, so a truncated packet could read past its own bounds. The same pass flagged that the dashboard's MQTT connection had no authentication at all — anyone who found the broker's address could publish keystrokes to the queue. Both got fixed: bounds-checking now happens before the read, and the MQTT connection requires credentials.",
  },
  {
    titleFr: "Le Pi qui n'attendait pas le réseau",
    titleEn: "The Pi that wouldn't wait for the network",
    textFr: "Le Raspberry Pi 5 démarrait souvent avec Mosquitto déjà en échec de bind, car systemd le lançait avant que l'interface réseau soit réellement disponible. La correction : faire dépendre le service de network-online.target plutôt que du network.target par défaut, qui garantit seulement que l'interface existe, pas qu'elle soit utilisable. En creusant les problèmes de démarrage, j'en ai profité pour migrer le système sur NVMe plutôt que carte SD, et configuré Mosquitto avec des listeners TLS et WebSocket pour une connexion sécurisée via le tunnel public.",
    textEn: "The Raspberry Pi 5 kept coming up with Mosquitto already failed to bind, because systemd started it before the network interface was actually up. The fix was making the service depend on network-online.target instead of the default network.target, which only guarantees the interface exists, not that it's usable. While chasing boot issues I also moved the system onto NVMe instead of SD card for boot reliability, and set up Mosquitto with TLS and WebSocket listeners so the dashboard could connect securely over the public tunnel.",
  },
]

const nowItems = [
  {
    pain: false,
    textFr: "J'explore une configuration en point d'accès direct sur le Pi 5 pour que le Pico puisse lui parler sans passer par mon routeur — supprimer un saut devrait réduire et stabiliser la latence sur le tronçon UDP.",
    textEn: 'Exploring a direct Pi 5 access-point setup so the Pico can talk to it without going through my home router — cutting a hop should mean lower, more consistent latency on the UDP leg.',
  },
  {
    pain: false,
    textFr: "J'étudie un modèle de « commande de chargement » — envoyer une instruction compacte que le Pico développe localement — plutôt que de transmettre chaque frappe individuellement sur le réseau.",
    textEn: "Investigating a 'loader command' pattern — sending one compact instruction the Pico expands locally — instead of streaming every keystroke individually over the network.",
  },
  {
    pain: true,
    textFr: "Pas encore de découverte automatique entre le Pico et le Pi — j'échange encore les adresses IP à la main au début de chaque session.",
    textEn: 'No automatic discovery yet between the Pico and the Pi — I still exchange IP addresses by hand at the start of every session.',
  },
]

type ReplayLineType = 'sent' | 'recv' | 'info' | 'warn' | 'success'
interface ReplayLine { type: ReplayLineType; text: string }

const REPLAY_SCRIPT: ReplayLine[] = [
  { type: 'info', text: '$ adaline connect 192.168.1.42:8420' },
  { type: 'info', text: 'session opened, awaiting handshake...' },
  { type: 'sent', text: '→ HELLO seq=0' },
  { type: 'recv', text: '← ACK seq=0' },
  { type: 'sent', text: "→ KEY 'D' seq=1" },
  { type: 'recv', text: '← ACK seq=1' },
  { type: 'sent', text: "→ KEY 'i' seq=2" },
  { type: 'warn', text: '… no ACK for seq=2, retrying' },
  { type: 'sent', text: "→ KEY 'i' seq=2 [retry]" },
  { type: 'recv', text: '← ACK seq=2' },
  { type: 'sent', text: "→ KEY 's' seq=3" },
  { type: 'recv', text: '← ACK seq=3' },
  { type: 'sent', text: "→ KEY 'k' seq=4" },
  { type: 'recv', text: '← ACK seq=4' },
  { type: 'success', text: '✓ 47 keystrokes delivered, 1 retried, 0 dropped' },
]

function ProtocolReplay() {
  const { lang } = useLang()
  const [visible, setVisible] = useState(0)
  const timerRef = useRef<number | null>(null)

  const startTicking = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setVisible(v => {
        const next = v + 1
        if (next >= REPLAY_SCRIPT.length && timerRef.current) {
          window.clearInterval(timerRef.current)
        }
        return next
      })
    }, 420)
  }, [])

  const replay = useCallback(() => {
    setVisible(0)
    startTicking()
  }, [startTicking])

  useEffect(() => {
    startTicking()
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
  }, [startTicking])

  const lineClass: Record<ReplayLineType, string> = {
    sent: styles.replaySent,
    recv: styles.replayRecv,
    info: styles.replayInfo,
    warn: styles.replayWarn,
    success: styles.replaySuccess,
  }

  const done = visible >= REPLAY_SCRIPT.length

  return (
    <div className={styles.replay}>
      <div className={styles.replayHeader}>
        <span className={styles.replayLabel}>adaline — udp session · {t('rejeu simulé', 'simulated replay', lang)}</span>
        <button className={styles.replayBtn} onClick={replay}>{t('▶ rejouer', '▶ replay', lang)}</button>
      </div>
      <div className={styles.replayBody}>
        {REPLAY_SCRIPT.slice(0, visible).map((line, i) => (
          <div key={i} className={`${styles.replayLine} ${lineClass[line.type]}`}>{line.text}</div>
        ))}
        {!done && <span className={styles.replayCaret} />}
      </div>
    </div>
  )
}

function ArchitectureDiagram() {
  const boxes = [
    { x: 10, title: 'Dashboard', subtitle: 'React · TS' },
    { x: 204, title: 'Cloudflare Tunnel', subtitle: 'public ingress' },
    { x: 398, title: 'RPi 5', subtitle: 'Python · Mosquitto' },
    { x: 592, title: 'Pico W', subtitle: 'C · TinyUSB · lwIP' },
    { x: 786, title: 'Target machine', subtitle: 'bare install' },
  ]
  const arrows = [
    { from: 160, to: 204, label: 'MQTT / WebSocket', accent: false },
    { from: 354, to: 398, label: 'tunnel', accent: false },
    { from: 548, to: 592, label: 'UDP · ACK + seq', accent: true },
    { from: 742, to: 786, label: 'HID USB', accent: false },
  ]

  return (
    <svg viewBox="0 0 940 150" style={{ width: '100%', minWidth: 720, height: 'auto', display: 'block' }}>
      <defs>
        <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" style={{ fill: 'var(--border-2)' }} />
        </marker>
        <marker id="arrowheadAccent" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" style={{ fill: 'var(--accent)' }} />
        </marker>
      </defs>

      {arrows.map((a, i) => (
        <g key={i}>
          <line
            x1={a.from} y1={77} x2={a.to - 8} y2={77}
            style={{ stroke: a.accent ? 'var(--accent)' : 'var(--border-2)', strokeWidth: 1.5 }}
            markerEnd={a.accent ? 'url(#arrowheadAccent)' : 'url(#arrowhead)'}
          />
          <text x={(a.from + a.to) / 2} y={66} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 10, fill: a.accent ? 'var(--accent)' : 'var(--ink-3)' }}>
            {a.label}
          </text>
        </g>
      ))}

      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={40} width={150} height={74} rx={6} style={{ fill: 'var(--bg-2)', stroke: 'var(--border)', strokeWidth: 1 }} />
          <text x={b.x + 75} y={72} textAnchor="middle" style={{ fontFamily: 'var(--display)', fontSize: 13, fontWeight: 500, fill: 'var(--ink)' }}>
            {b.title}
          </text>
          <text x={b.x + 75} y={90} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 10, fill: 'var(--ink-3)' }}>
            {b.subtitle}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function AdalineCaseStudy() {
  const { lang } = useLang()

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Link to="/projects" className={`${styles.backLink} fade-up`} style={{ animationDelay: '0.02s' }}>
          {t('← tous les projets', '← all projects', lang)}
        </Link>

        <div className={`${styles.header} fade-up`} style={{ animationDelay: '0.06s' }}>
          <p className={styles.eyebrow}>// {t('étude de cas', 'case study', lang)}</p>
          <h1 className={styles.title}>Adaline</h1>
        </div>

        <div className={`${styles.statusRow} fade-up`} style={{ animationDelay: '0.1s' }}>
          <span className={styles.status}>{t('en cours', 'active', lang)}</span>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className={styles.statusLink}>
            github.com/evolutionexit/Adaline ↗
          </a>
        </div>

        <p className={`${styles.lede} fade-up`} style={{ animationDelay: '0.14s' }}>
          {t(
            "Adaline permet d'installer un système d'exploitation sur une machine totalement vierge — sans OS, sans pilotes, sans rien — en émulant un clavier USB à distance. On branche un microcontrôleur à quelques dollars, et un dashboard à l'autre bout d'internet peut taper l'intégralité d'une installation, touche par touche, à travers une chaîne matérielle et logicielle que j'ai construite de bout en bout.",
            "Adaline installs an operating system on a completely bare machine — no OS, no drivers, nothing — by emulating a USB keyboard from across the network. Plug in a few-dollar microcontroller, and a dashboard on the other side of the internet can type an entire install, keystroke by keystroke, through a chain of hardware and software I built end to end.",
            lang
          )}
        </p>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.18s' }}>
          <div className={styles.sectionTitle}>{t('architecture', 'architecture', lang)}</div>
          <div className={styles.diagramWrap}>
            <ArchitectureDiagram />
          </div>
          <p className={styles.diagramCaption}>
            {t(
              "Chaque frappe voyage du dashboard jusqu'à la machine cible à travers cinq étapes. Le tronçon UDP entre le Pi et le Pico est celui qui doit vraiment être fiable — c'est le seul lien sans TCP en dessous, donc Adaline gère elle-même l'accusé de réception et les réémissions.",
              "Every keystroke travels from the dashboard down to the target machine through five hops. The UDP leg between the Pi and the Pico is the one that actually has to be reliable — it's the only link without TCP underneath it, so Adaline handles acknowledgement and retry itself.",
              lang
            )}
          </p>
        </div>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.22s' }}>
          <div className={styles.sectionTitle}>{t('voir le protocole', 'see it in action', lang)}</div>
          <ProtocolReplay />
        </div>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.26s' }}>
          <div className={styles.sectionTitle}>{t("comment ça s'est construit", 'how it got built', lang)}</div>
          <div className={styles.timeline}>
            {buildStages.map((s, i) => (
              <div key={i} className={styles.tlItem}>
                <div className={styles.tlStage}>{t(s.stageFr, s.stageEn, lang)}</div>
                <div className={styles.tlDesc}>{t(s.descFr, s.descEn, lang)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.3s' }}>
          <div className={styles.sectionTitle}>{t('problèmes réels', 'real problems', lang)}</div>
          {problems.map((p, i) => (
            <div key={i} className={styles.problem}>
              <div className={styles.problemTitle}>{t(p.titleFr, p.titleEn, lang)}</div>
              <p className={styles.problemText}>{t(p.textFr, p.textEn, lang)}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.34s' }}>
          <div className={styles.sectionTitle}>{t('en ce moment', 'right now', lang)}</div>
          <div className={styles.nowList}>
            {nowItems.map((item, i) => (
              <div key={i} className={styles.nowItem}>
                <span className={styles.nowDot} data-pain={item.pain ? 'true' : 'false'} />
                <div className={styles.nowText}>{t(item.textFr, item.textEn, lang)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.section} fade-up`} style={{ animationDelay: '0.38s' }}>
          <div className={styles.companion}>
            {lang === 'fr' ? (
              <>En parallèle d'Adaline, ce même Pi 5 fait tourner un petit projet annexe : un <strong>bot Telegram</strong> qui lit ma messagerie Gmail via OAuth2, résume les nouveaux messages et rédige des brouillons de réponse avec Gemini — packagé en service systemd pour survivre aux redémarrages sans surveillance.</>
            ) : (
              <>Alongside Adaline, the same Pi 5 also runs a small side project: a <strong>Telegram bot</strong> that reads my Gmail via OAuth2, summarizes new mail, and drafts replies with Gemini — packaged as a systemd service so it survives reboots without babysitting.</>
            )}
          </div>
        </div>

        <div className={`${styles.ctaRow} fade-up`} style={{ animationDelay: '0.42s' }}>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className={styles.ctaPrimary}>
            {t('voir sur GitHub', 'view on GitHub', lang)} →
          </a>
          <Link to="/projects" className={styles.ctaSecondary}>
            {t('← tous les projets', '← all projects', lang)}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
