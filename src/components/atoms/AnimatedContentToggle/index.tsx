import { motion } from 'framer-motion'

import IProps from '@components/atoms/AnimatedContentToggle/types'

const AnimatedContentToggle = ({
  children,
  isExpanded,
  initialHeight,
  onAnimationStart,
  onAnimationComplete,
  animate,
  transition,
  exit,
}: IProps) => (
  <motion.div
    animate={{
      height: isExpanded ? 'auto' : initialHeight,
      ...animate,
    }}
    initial={isExpanded ? 'open' : 'collapsed'}
    inherit={false}
    transition={{
      duration: 0.8,
      ease: 'circOut',
      bounce: 0.25,
      ...transition,
    }}
    exit={exit}
    onAnimationStart={onAnimationStart}
    onAnimationComplete={onAnimationComplete}
    role="article"
  >
    {children}
  </motion.div>
)

export default AnimatedContentToggle
