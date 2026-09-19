import { NavLink } from 'react-router-dom'
import { useLang, t } from '../i18n/LangContext'
import styles from './Nav.module.css'

export default function Nav() {
  const { lang, setLang } = useLang()

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo}>MM</NavLink>

      <ul className={styles.links}>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>{t('Accueil', 'Home', lang)}</NavLink></li>
        <li><NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ''}>{t('Projets', 'Projects', lang)}</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>{t('À propos', 'About', lang)}</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink></li>
      </ul>

      <div className={styles.langToggle}>
        <button className={`${styles.langBtn} ${lang === 'fr' ? styles.langActive : ''}`} onClick={() => setLang('fr')}>FR</button>
        <button className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => setLang('en')}>EN</button>
      </div>
    </nav>
  )
}
