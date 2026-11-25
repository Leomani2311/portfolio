import { motion } from 'framer-motion'
import { FaArrowRight, FaEnvelope, FaLinkedin, FaPhone, FaWhatsapp } from 'react-icons/fa6'
import { profile } from '../data/resume'

export default function Contact() {
  const links = [
    {
      href: `mailto:${profile.email}`,
      Icon: FaEnvelope,
      label: 'Email',
      value: profile.email,
    },
    {
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      Icon: FaPhone,
      label: 'Phone',
      value: profile.phone,
    },
    {
      href: profile.linkedin,
      Icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/manikandan-leo2311',
      external: true,
    },
  ]

  return (
    <section className="section contact" id="contact">
      <div className="section__inner">
        <motion.div
          className="contact__panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact__copy">
            <p className="eyebrow">Contact</p>
            <h2>Let’s build the next system together.</h2>
            <p className="lede">
              Open to full-stack roles, React-focused product work, and migration
              challenges. Reach out anytime.
            </p>
            <a
              className="btn btn--light"
              href={`https://wa.me/${profile.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                'Hi Manikandan, I saw your portfolio and would like to connect.',
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp aria-hidden />
              Say hello
              <FaArrowRight className="btn__arrow" aria-hidden />
            </a>
          </div>
          <div className="contact__links">
            {links.map(({ href, Icon, label, value, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="contact__icon" aria-hidden>
                  <Icon />
                </span>
                <span className="contact__text">
                  <small>{label}</small>
                  {value}
                </span>
                <FaArrowRight className="contact__go" aria-hidden />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
