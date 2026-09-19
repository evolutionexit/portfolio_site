import { NavLink } from 'react-router-dom'
import { useLang, t } from '../i18n/LangContext'
import styles from './Nav.module.css'

export default function Nav() {
  const { lang, setLang } = useLang()

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo}>
        Michel Moors
      </NavLink>

      <ul className={styles.links}>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>{t('accueil', 'home', lang)}</NavLink></li>
        <li><NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ''}>{t('projets', 'projects', lang)}</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>{t('à propos', 'about', lang)}</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''}>contact</NavLink></li>
      </ul>

      <div className={styles.langToggle}>
        <button className={`${styles.langBtn} ${lang === 'fr' ? styles.langActive : ''}`} onClick={() => setLang('fr')}>FR</button>
        <button className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => setLang('en')}>EN</button>
      </div>
    </nav>
  )
}
