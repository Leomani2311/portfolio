import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa6'
import { education } from '../data/resume'

export default function Education() {
  return (
    <section className="section education" id="education">
      <div className="section__inner">
        <motion.div
          className="section__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Education</p>
          <h2>Foundations in electronics and engineering.</h2>
        </motion.div>
        <div className="education__list">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              className="card education__item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <span className="education__icon" aria-hidden>
                <FaGraduationCap />
              </span>
              <div>
                <span className="education__year">{item.year}</span>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
