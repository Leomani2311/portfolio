import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/resume'

export default function About() {
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <section className="section about" id="about">
      <div className="section__inner">
        <div className="about__layout">
          <motion.div
            className="about__photo-wrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            {photoOk ? (
              <img
                className="about__photo"
                src={profile.photo}
                alt={profile.name}
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <div className="about__photo about__photo--placeholder" aria-hidden="true">
                {profile.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </div>
            )}
          </motion.div>

          <div className="about__copy">
            <motion.div
              className="section__intro"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <p className="eyebrow">About</p>
              <h2>Engineering clarity into complex systems.</h2>
              <p className="lede">{profile.summary}</p>
            </motion.div>
            <motion.ul
              className="about__facts"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <li>
                <strong>6+</strong>
                <span>Years experience</span>
              </li>
              <li>
                <strong>45%</strong>
                <span>Faster page loads</span>
              </li>
              <li>
                <strong>50%</strong>
                <span>Quicker DB queries</span>
              </li>
              <li className="about__fact--text">
                <strong>{profile.location.split(',')[0]}</strong>
                <span>Based in {profile.location.split(',')[1]?.trim() ?? ''}</span>
              </li>
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
