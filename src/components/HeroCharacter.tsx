import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

// Illustrated portrait, background removed by scripts/make_anime_portrait.py
const PORTRAIT_URL = '/portraits/portrait-anime.webp'

const FLOATING_TAGS = [
  { label: '</>', x: '6%', y: '16%', delay: 0 },
  { label: '{ }', x: '84%', y: '12%', delay: 0.8 },
  { label: 'API', x: '88%', y: '50%', delay: 1.6 },
  { label: 'npm', x: '2%', y: '56%', delay: 2.2 },
]

/**
 * Illustrated portrait of Manikandan that feels alive: breathes, tilts in 3D
 * toward the pointer, waves on hover, jumps on tap, and can be dragged around
 * (springs back).
 */
export default function HeroCharacter() {
  const reduceMotion = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const jump = useAnimationControls()

  // Pointer tracking → 3D tilt toward the cursor
  const lookX = useMotionValue(0)
  const lookY = useMotionValue(0)
  const springCfg = { stiffness: 90, damping: 18, mass: 0.7 }
  const rotateY = useSpring(useTransform(lookX, [-1, 1], [-12, 12]), springCfg)
  const rotateX = useSpring(useTransform(lookY, [-1, 1], [7, -7]), springCfg)
  const shiftX = useSpring(useTransform(lookX, [-1, 1], [-10, 10]), springCfg)

  // Drag → lean into the direction of travel
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const velX = useVelocity(dragX)
  const tilt = useSpring(useTransform(velX, [-1800, 1800], [-14, 14]), {
    stiffness: 220,
    damping: 14,
  })

  useEffect(() => {
    if (reduceMotion) return
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.3
      lookX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))))
      lookY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))))
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [lookX, lookY, reduceMotion])

  const onTap = () => {
    setHovered(true)
    void jump.start({
      y: [0, -40, 0, -10, 0],
      transition: { duration: 0.8, times: [0, 0.35, 0.65, 0.82, 1], ease: 'easeOut' },
    })
  }

  const idle = !reduceMotion
  const greeting = hovered && !dragging

  return (
    <div className="hero-char" ref={wrapRef}>
      <div className="hero-char__halo" aria-hidden="true" />

      {FLOATING_TAGS.map((tag) => (
        <motion.span
          key={tag.label}
          className="hero-char__tag"
          style={{ left: tag.x, top: tag.y }}
          aria-hidden="true"
          animate={idle ? { y: [0, -12, 0] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: tag.delay }}
        >
          {tag.label}
        </motion.span>
      ))}

      <motion.div
        className="hero-char__body"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
        style={{ x: dragX, y: dragY, rotate: tilt }}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onTap={onTap}
      >
        <AnimatePresence>
          {(greeting || dragging) && (
            <motion.div
              key={dragging ? 'drag' : 'hi'}
              className="hero-char__bubble"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.22 }}
            >
              {dragging ? (
                'Whoa! Put me down 😅'
              ) : (
                <>
                  Hi! I'm Manikandan{' '}
                  <motion.span
                    className="hero-char__wave"
                    animate={{ rotate: [0, 18, -8, 18, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
                  >
                    👋
                  </motion.span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="hero-char__tilt"
          style={{ rotateX, rotateY, x: shiftX }}
          animate={jump}
          initial={{ y: 0 }}
        >
          {/* Idle breathing: gentle stretch from the waist up */}
          <motion.img
            className="hero-char__img"
            src={PORTRAIT_URL}
            alt="Illustrated portrait of Manikandan R in a navy suit"
            width={1010}
            height={1504}
            draggable={false}
            animate={idle ? { scaleY: [1, 1.012, 1], y: [0, -4, 0] } : undefined}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      <p className="hero-char__hint" aria-hidden="true">
        Hover to say hi · drag me around
      </p>
    </div>
  )
}
