export interface Entry {
  date: string
  tag: string
  titleFr: string
  titleEn: string
  bodyFr: string[]
  bodyEn: string[]
}

export const entries: Entry[] = [
  {
    date: '2026-08-14',
    tag: 'adaline',
    titleFr: "Penser à sortir le routeur de la boucle",
    titleEn: 'Thinking about cutting the router out of the loop',
    bodyFr: [
      "Le maillon faible d'Adaline en ce moment, c'est le saut UDP entre le Pi et le Pico — il traverse mon routeur domestique deux fois (une fois en entrant depuis le tunnel, une fois pour atteindre le Pico en Wi-Fi), et j'ai mesuré assez de gigue sur ce tronçon pour que les réémissions soient plus fréquentes que je ne le voudrais.",
      "L'idée que je creuse, c'est de transformer le Pi 5 en son propre point d'accès et de faire en sorte que le Pico s'y connecte directement plutôt qu'au Wi-Fi de la maison. Ça supprime un saut entièrement — pas de NAT du routeur, pas de congestion 2,4 GHz partagée avec tous les autres appareils. Ça devrait raccourcir les allers-retours séquence-ACK et, surtout, les rendre plus réguliers, ce qui compte plus que la vitesse brute pour un protocole qui réémet déjà en cas de perte.",
      "Le compromis que je n'ai pas encore totalement résolu : le Pi a toujours besoin de sa propre liaison internet pour le Cloudflare Tunnel, il lui faudrait donc deux interfaces faisant deux métiers en même temps — une en point d'accès pour le Pico, une en client pour le reste. Je n'ai pas encore touché à la config, je cartographie juste si ça vaut la complexité ajoutée avant de m'y engager.",
    ],
    bodyEn: [
      "Adaline's weakest link right now is the UDP hop between the Pi and the Pico — it goes through my home router twice (once on the way in from the tunnel, once again to reach the Pico on Wi-Fi), and I've measured enough jitter on that leg to make retries more common than I'd like.",
      "The idea I'm circling is turning the Pi 5 into its own access point and having the Pico associate directly with it instead of the household Wi-Fi. That removes a hop entirely — no router NAT, no shared 2.4GHz congestion with every other device in the house. It should make sequence-ACK round trips shorter and, more importantly, more consistent, which matters more than raw speed for a protocol that already retries on packet loss.",
      "The tradeoff I haven't fully worked out yet: the Pi still needs its own uplink to the internet for the Cloudflare Tunnel, so it'd need two interfaces doing two different jobs at once — one as an AP for the Pico, one as a client for everything else. Haven't touched the config yet, just mapping out whether it's worth the added complexity before I commit to it.",
    ],
  },
  {
    date: '2026-07-02',
    tag: 'adaline',
    titleFr: 'Une commande de chargement plutôt que taper chaque caractère',
    titleEn: 'A loader command instead of typing every character',
    bodyFr: [
      "En ce moment, chaque frappe qu'Adaline envoie devient son propre paquet UDP : HELLO, puis un paquet KEY par caractère, chacun attendant son propre ACK avant que le suivant parte. Ça fonctionne, mais ça veut dire qu'un script d'installation de 2000 caractères, ce sont 2000 allers-retours, et chacun est une occasion d'avoir besoin d'une réémission.",
      "Je dessine plutôt un modèle de « commande de chargement » : le dashboard envoie une instruction compacte — quelque chose comme un bloc encodé en base64 — et le Pico le développe localement en séquence de frappes, en accusant réception du bloc entier une seule fois au lieu d'une fois par caractère. Ça échange un peu de complexité côté firmware contre beaucoup moins de paquets sur un lien qui est déjà la partie fragile de la chaîne.",
      "Ce qu'il me reste à réfléchir, c'est comment garder ça débogable — en ce moment, voir passer les paquets KEY un par un est vraiment utile pour repérer les bugs de timing. Si je regroupe tout en blocs opaques, je perds cette visibilité à moins de construire un genre de rapport de progression par bloc vers le dashboard.",
    ],
    bodyEn: [
      "Right now, every single keystroke Adaline sends becomes its own UDP packet: HELLO, then one KEY packet per character, each waiting on its own ACK before the next one goes out. It works, but it means a 2,000-character install script is 2,000 round trips, and every one of them is a chance to need a retry.",
      "I've been sketching a 'loader command' pattern instead: the dashboard sends one compact instruction — something like a base64-encoded chunk — and the Pico expands it locally into the keystroke sequence, ACKing the whole chunk once instead of once per character. That trades a bit of firmware complexity for a lot fewer packets on a link that's already the fragile part of the chain.",
      "The part I still need to think through is how to keep it debuggable — right now, watching KEY packets go by one at a time is genuinely useful for catching timing bugs. If I collapse it into opaque chunks, I lose that visibility unless I build some kind of chunk-level progress reporting back to the dashboard.",
    ],
  },
  {
    date: '2026-05-20',
    tag: 'adaline',
    titleFr: 'Les 14 % qui m’ont fait douter de ma propre logique de dédup',
    titleEn: 'The 14% that made me distrust my own dedup logic',
    bodyFr: [
      "Passé une soirée frustrante à fixer un log de frappes où environ une lettre sur sept n'apparaissait tout simplement jamais sur la machine cible — pas d'erreur, pas de crash, elles n'étaient juste pas là. Pénible à déboguer car ce n'était pas cohérent : le même script perdait des caractères différents à chaque exécution.",
      "La logique de déduplication sur le Pico était censée protéger contre le retraitement d'un paquet UDP que le Pi avait réémis après un timeout — comparer le numéro de séquence entrant avec le dernier vu, et l'ignorer si ce n'était pas nouveau. Sauf que « le dernier vu » était suivi depuis le dernier démarrage du Pico, pas depuis la session en cours. Se reconnecter sans cycle d'alimentation, et le Pico se souvenait encore des numéros de séquence de la session précédente.",
      "Une fois que j'ai vraiment affiché l'état de séquence à chaque reconnexion, c'était évident en cinq minutes. La correction était petite — réinitialiser le suivi de séquence au démarrage de session, pas seulement au boot — mais la trouver a demandé de ne pas supposer que « reconnexion » et « première connexion » empruntaient le même chemin de code.",
    ],
    bodyEn: [
      "Spent a frustrating evening staring at a keystroke log where roughly one in seven characters just never showed up on the target machine — no error, no crash, they just weren't there. Painful to debug because it wasn't consistent: the same script would drop different characters on different runs.",
      "The dedup logic on the Pico was supposed to protect against re-processing a UDP packet the Pi resent after a timeout — compare the incoming sequence number against the last one it saw, and drop it if it wasn't new. Except 'the last one it saw' was being tracked from whenever the Pico last booted, not from the current session. Reconnect without a power cycle, and the Pico still remembered sequence numbers from the previous session.",
      "Once I actually printed the sequence state on every reconnect it was obvious in about five minutes. The fix was small — reset sequence tracking on session start, not just on boot — but finding it meant not trusting that 'reconnect' and 'first connect' were the same code path.",
    ],
  },
  {
    date: '2026-03-11',
    tag: 'infra',
    titleFr: 'Faire enfin attendre le réseau au Pi',
    titleEn: 'Making the Pi actually wait for its own network',
    bodyFr: [
      "Eu une série de matins où le Pi 5 d'Adaline démarrait avec Mosquitto déjà mort — vérifié les logs, il avait échoué à bind car systemd le lançait avant que l'interface réseau existe. Bug d'ordonnancement classique : network.target ne promet que l'interface est enregistrée, pas qu'elle ait une adresse ou une route.",
      "Basculé la dépendance de l'unité vers network-online.target, qui attend vraiment une connexion fonctionnelle, et ça s'est arrêté. Tant que j'étais dedans à corriger l'ordre de démarrage, j'en ai profité pour migrer tout le système de la carte SD vers du NVMe, et configuré Mosquitto avec TLS et un listener WebSocket pour que le dashboard puisse lui parler en sécurité via le tunnel public plutôt qu'en clair.",
      "Rien de glorieux là-dedans, mais un broker peu fiable rend tout ce qui est en aval peu fiable aussi, donc ça valait le coup de le faire proprement plutôt que de contourner le problème.",
    ],
    bodyEn: [
      "Had a run of mornings where Adaline's Pi 5 would boot up with Mosquitto already dead — checked the logs, and it had failed to bind because systemd started it before the network interface existed. Classic ordering bug: network.target only promises the interface is registered, not that it has an address or a route yet.",
      "Switched the unit's dependency to network-online.target, which actually waits for a working connection, and it stopped happening. While I was in there fixing boot order anyway, I moved the whole system off the SD card and onto NVMe, and set up Mosquitto with TLS and a WebSocket listener so the dashboard could talk to it securely over the public tunnel instead of a plaintext connection.",
      "None of this is glamorous work, but an unreliable broker makes everything downstream of it unreliable too, so it felt worth doing properly rather than working around it.",
    ],
  },
]
