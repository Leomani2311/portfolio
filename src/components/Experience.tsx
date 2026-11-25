import { motion } from 'framer-motion'
import { FaBriefcase, FaLocationDot } from 'react-icons/fa6'
import { experience } from '../data/resume'
import Metric from './Metric'

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="section__inner">
        <motion.div
          className="section__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Experience</p>
          <h2>Where the work happened.</h2>
          <p className="lede">
            Shipping ERP platforms, migrations, and quality systems across product
            and manufacturing teams.
          </p>
        </motion.div>
        <div className="timeline">
          {experience.map((job, index) => (
            <motion.article
              key={job.company}
              className="timeline__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <span className="timeline__dot" aria-hidden />
              <div className="card timeline__card">
                <div className="timeline__meta">
                  <span className="timeline__period">{job.period}</span>
                  <h3>{job.role}</h3>
                  <p className="timeline__company">
                    <FaBriefcase aria-hidden />
                    {job.company}
                  </p>
                  <p className="timeline__location">
                    <FaLocationDot aria-hidden />
                    {job.location}
                  </p>
                </div>
                <ul className="timeline__highlights">
                  {job.highlights.map((item) => (
                    <li key={item}>
                      <Metric text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
