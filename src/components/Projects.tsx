import { motion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'
import { projects } from '../data/resume'
import Metric from './Metric'

export default function Projects() {
  return (
    <section className="section section--surface projects" id="projects">
      <div className="section__inner">
        <motion.div
          className="section__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Projects</p>
          <h2>Selected work with measurable impact.</h2>
          <p className="lede">
            Migrations, compliance platforms, and integration services that cut
            latency, errors, and operational friction.
          </p>
        </motion.div>
        <div className="projects__grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              className={`card project${index === 0 ? ' project--featured' : ''}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
            >
              {index === 0 && (
                <div className="project__top">
                  <span className="project__badge">Featured</span>
                </div>
              )}
              <h3>{project.name}</h3>
              <p className="project__desc">{project.description}</p>
              <ul className="chips chips--accent" aria-label="Stack">
                {project.stack.split(' · ').map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
              <ul className="project__outcomes">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <FaCircleCheck aria-hidden />
                    <span>
                      <Metric text={outcome} />
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
