import { createElement, type HTMLProps } from 'react'
import styled from 'styled-components'

import { colors } from '@theme'

export const baseTypographyStyles = {
  headingLarge: {
    fontFamily: '"Noto Serif", serif',
    fontSize: '2.36875em', // 37.9px
    fontStyle: 'italic',
    fontWeight: 700,
    // lineHeight: '1.361741425', // 51.61px
  },
  headingRegular: {
    fontFamily: '"Noto Serif", serif',
    fontSize: '1.776875em', // 28.43px
    fontStyle: 'italic',
    fontWeight: 700,
    // lineHeight: '1.361941611', // 38.72px
  },
  headingSmall: {
    fontFamily: '"Noto Serif", serif',
    fontSize: '1.333125em', // 21.33px
    fontStyle: 'italic',
    fontWeight: 700,
    // lineHeight: '1.361931552', // 29.05px
  },

  subHeadingRegular: {
    fontWeight: 700,
    // lineHeight: '1.375', // 22px
    textTransform: 'uppercase' as const,
  },
  subHeadingSmall: {
    fontSize: '0.875em', // 14px
    fontWeight: 700,
    // lineHeight: '1.357142857', // 29.05px
    textTransform: 'uppercase' as const,
  },
  bodyMedium: {
    fontSize: '1.25em',
    fontWeight: 400,
  },
  bodyRegular: {},
  bodyRegularBold: {
    fontWeight: 700,
  },
  bodySmall: {
    fontSize: '0.875em',
  },
  bodySmallBold: {
    fontSize: '0.875em',
    fontWeight: 700,
  },
  bodyXSmall: {
    fontSize: '0.75em',
  },
  bodyXSmallBold: {
    fontSize: '0.75em',
    fontWeight: 700,
  },
  bodyMicro: {
    fontSize: '0.625em',
  },
  bodyMicroBold: {
    fontSize: '0.625em',
    fontWeight: 700,
  },
}

interface FragmentTextProps
  extends HTMLProps<HTMLParagraphElement | HTMLTitleElement> {
  variant?: keyof typeof baseTypographyStyles
  fontWeight?: number
}

const getComponentName = (variant: FragmentTextProps['variant']) => {
  switch (variant) {
    case 'headingLarge':
      return 'h1'
    case 'headingRegular':
      return 'h2'
    case 'headingSmall':
      return 'h3'
    case 'subHeadingRegular':
      return 'h4'
    case 'subHeadingSmall':
      return 'h5'
    case 'bodyMedium':
    case 'bodyRegular':
    case 'bodyRegularBold':
    case 'bodySmall':
    case 'bodySmallBold':
    case 'bodyXSmall':
    case 'bodyXSmallBold':
    case 'bodyMicro':
    case 'bodyMicroBold':
    default:
      return 'p'
  }
}

const FragmentText = styled(({ children, ...props }: FragmentTextProps) =>
  createElement(props.as || getComponentName(props.variant), props, children),
)<FragmentTextProps>`
  color: ${({ color }) => color || colors.neutrals.x900};
  letter-spacing: 0;
  line-height: 1.375;
  font-family: 'Noto Sans', sans-serif;
  font-size: 1em;
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  ${({ variant }) => variant && baseTypographyStyles[variant]}
`

export default FragmentText
