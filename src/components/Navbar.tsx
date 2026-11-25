import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { profile } from '../data/resume'

type Theme = 'light' | 'dark'

// index.html sets data-theme before first paint; start from whatever it chose.
const initialTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#personal-projects', label: 'Personal Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState<Theme>(initialTheme)

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage unavailable (private mode) — theme still applies for this visit
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the link for the section in the middle of the viewport
  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <a className="nav__brand" href="#top">
        {profile.name}
      </a>
      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? 'is-active' : undefined}
            aria-current={active === link.href ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          className="nav__cta"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          LinkedIn
        </a>
      </nav>
      <button
        className="nav__theme"
        type="button"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}
      </button>
      <button
        className="nav__toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}
