import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaCode, FaDatabase, FaServer, FaToolbox, FaVial } from 'react-icons/fa6'
import { skills } from '../data/resume'

const GROUP_META: Record<string, { Icon: IconType; blurb: string }> = {
  Frontend: { Icon: FaCode, blurb: 'Component-driven, fast, accessible interfaces.' },
  Backend: { Icon: FaServer, blurb: 'Secure, well-structured APIs and services.' },
  Database: { Icon: FaDatabase, blurb: 'Schemas and queries tuned for reporting.' },
  Testing: { Icon: FaVial, blurb: 'Confidence through unit and UI tests.' },
  Tools: { Icon: FaToolbox, blurb: 'Shipping and collaborating day to day.' },
}

export default function Skills() {
  return (
    <section className="section section--surface skills" id="skills">
      <div className="section__inner">
        <motion.div
          className="section__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Skills</p>
          <h2>A stack built for delivery and depth.</h2>
          <p className="lede">
            From component-driven UIs to JWT-secured APIs and query-tuned MySQL —
            tools I use to ship reliable product outcomes.
          </p>
        </motion.div>
        <div className="skills__grid">
          {Object.entries(skills).map(([group, items], index) => {
            const meta = GROUP_META[group]
            const Icon = meta?.Icon ?? FaCode
            return (
              <motion.div
                key={group}
                className={`card skills__card skills__card--${group.toLowerCase()}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="skills__head">
                  <span className="skills__icon" aria-hidden>
                    <Icon />
                  </span>
                  <div>
                    <h3>{group}</h3>
                    {meta && <p>{meta.blurb}</p>}
                  </div>
                  <span className="skills__count">{items.length}</span>
                </div>
                <ul className="chips">
                  {items.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
