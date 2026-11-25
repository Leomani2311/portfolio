import {
  SiAngular,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMysql,
  SiNestjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiSass,
  SiTypescript,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

export type TechItem = {
  name: string
  Icon: IconType
  color: string
}

export const techStack: TechItem[] = [
  { name: 'React.js', Icon: SiReact, color: '#087ea4' },
  { name: 'Angular', Icon: SiAngular, color: '#dd0031' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#c5a100' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'HTML5', Icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', Icon: SiCss, color: '#1572b6' },
  { name: 'SCSS', Icon: SiSass, color: '#c69' },
  { name: 'Redux', Icon: SiRedux, color: '#764abc' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Express.js', Icon: SiExpress, color: 'currentColor' }, // monochrome logo — follows the theme's text color
  { name: 'Nest.js', Icon: SiNestjs, color: '#e0234e' },
  { name: 'MySQL', Icon: SiMysql, color: '#00758f' },
  { name: 'Jest', Icon: SiJest, color: '#c21325' },
  { name: 'Git', Icon: SiGit, color: '#f05032' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
]
