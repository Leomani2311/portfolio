import { motion } from 'framer-motion'
import { profile } from '../data/resume'
import HeroCharacter from './HeroCharacter'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__layout">
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroCharacter />
        </motion.div>

        <div className="hero__content">
          <motion.p
            className="hero__role"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.title}
          </motion.p>

          <motion.p
            className="hero__brand"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {profile.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Building scalable systems that move business forward.
          </motion.h1>

          <motion.p
            className="hero__support"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Full Stack Developer with 6 years delivering React, Node, and Nest.js
            platforms — from ERP migrations to GST and Tally integrations.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
          >
            <a className="btn btn--primary" href="#projects">
              View projects
              <span className="btn__arrow" aria-hidden>
                →
              </span>
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
            <a
              className="btn btn--ghost"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </motion.div>

          <motion.ul
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42, duration: 0.6 }}
          >
            <li>{profile.location}</li>
            <li>6+ years experience</li>
            <li>React · Node · Nest.js</li>
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
