import { techStack } from '../data/tech'

function TechTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className="tech-marquee__track" aria-hidden={ariaHidden || undefined}>
      {techStack.map(({ name, Icon, color }) => (
        <li key={`${ariaHidden ? 'b' : 'a'}-${name}`} className="tech-marquee__item">
          <Icon style={{ color }} aria-hidden />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TechMarquee() {
  return (
    <section className="tech-marquee" aria-label="Technologies in use">
      <div className="tech-marquee__header">
        <p className="eyebrow">Technologies</p>
        <h2>Tools I build with every day.</h2>
      </div>
      <div className="tech-marquee__viewport">
        <div className="tech-marquee__fade tech-marquee__fade--left" />
        <div className="tech-marquee__fade tech-marquee__fade--right" />
        <div className="tech-marquee__loop">
          <TechTrack />
          <TechTrack ariaHidden />
        </div>
      </div>
    </section>
  )
}
