import { profile } from '../data/resume'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React.js &amp;
        Framer Motion.
      </p>
    </footer>
  )
}
