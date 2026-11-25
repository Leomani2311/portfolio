import { motion } from 'framer-motion'
import { FaArrowUpRightFromSquare, FaCircleCheck, FaGithub } from 'react-icons/fa6'
import { personalProjects } from '../data/resume'

export default function PersonalProjects() {
  return (
    <section className="section personal-projects" id="personal-projects">
      <div className="section__inner">
        <motion.div
          className="section__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Personal Projects</p>
          <h2>Products I’m building on my own.</h2>
          <p className="lede">
            Full-stack side projects where I own everything — architecture, APIs,
            UI, and deployment.
          </p>
        </motion.div>
        <div className="projects__grid">
          {personalProjects.map((project, index) => (
            <motion.article
              key={project.name}
              className="card project"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
            >
              <div className="project__top">
                <span className="project__type">{project.type}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project__desc">{project.description}</p>
              <div className="project__idea">
                <small>Core idea</small>
                <ul>
                  {project.coreIdea.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <ul className="chips chips--accent" aria-label="Stack">
                {project.stack.split(' · ').map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
              <ul className="project__outcomes">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <FaCircleCheck aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {(project.github || project.live) && (
                <div className="project__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FaGithub aria-hidden /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <FaArrowUpRightFromSquare aria-hidden /> Live demo
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
