import { ReactNode, useState } from 'react'
import Linkify from 'react-linkify'

import { LineBreakText, ShowMoreToggleText } from './styles'
import { IProps } from './types'

const WrappingComponent = ({
  children,
  parseLinks,
}: {
  children: ReactNode
  parseLinks: boolean
}) =>
  parseLinks ? (
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          target="blank"
          href={decoratedHref}
          key={key}
          style={{ color: '#1b91e7' }}
          title={`Open the URL in a new window`}
        >
          {decoratedText}
        </a>
      )}
    >
      {children}
    </Linkify>
  ) : (
    <div>{children}</div>
  )

const FragmentReadMore = ({
  text,
  parseLinks = false,
  onToggle = () => null,
  isExpanded,
  ariaControl,
}: IProps) => {
  const [sliced, setSliced] = useState(true)
  const handleClick = () => {
    setSliced(!sliced)
    onToggle()
  }

  const textFragments = text.split('\n')
  const slicedTextFragments = text.slice(0, 250).split('\n')

  if (text.length < 250) {
    return (
      <WrappingComponent parseLinks={parseLinks}>
        {textFragments.map((t, i) => (
          <p key={t + i}>{t}</p>
        ))}
      </WrappingComponent>
    )
  }

  const showMoreComponent = textLink => (
    <ShowMoreToggleText
      onClick={handleClick}
      aria-controls={ariaControl}
      aria-expanded={isExpanded}
    >
      {textLink}
    </ShowMoreToggleText>
  )

  return (
    <div>
      {sliced ? (
        <p>
          {slicedTextFragments.map((t, idx) => {
            if (slicedTextFragments.length - 1 === idx) {
              return (
                <span key={t + idx}>
                  {t}... {showMoreComponent('Continue reading')}
                </span>
              )
            } else {
              return <LineBreakText key={t}>{t}</LineBreakText>
            }
          })}
        </p>
      ) : (
        <WrappingComponent parseLinks={parseLinks}>
          {textFragments.map((t, i) => (
            <LineBreakText key={t + i}>{t}</LineBreakText>
          ))}{' '}
          {showMoreComponent('Show less')}
        </WrappingComponent>
      )}
    </div>
  )
}

export default FragmentReadMore
export type { IProps }
