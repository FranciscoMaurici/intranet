import { useEffect, useState } from 'react'

import {
  BenefitsLightboxImageContainer,
  LightboxBackground,
  LightboxCloseButton,
  LightboxZoomInButton,
  LightboxZoomOutButton,
} from './styles'
import { IProps } from './types'

const LightBox = ({ src, handleClose, style }: IProps) => {
  const [transform, setTransform] = useState(1)

  useEffect(
    () => () => {
      document.body.style.overflowY = 'scroll'
    },
    [],
  )
  return (
    <LightboxBackground
      style={style}
      id={src}
      onClick={() => {
        setTransform(1)
        handleClose()
      }}
    >
      <LightboxCloseButton />

      <LightboxZoomInButton
        onClick={e => {
          e.stopPropagation()
          setTransform(transform * 2)
        }}
      />
      <LightboxZoomOutButton
        onClick={e => {
          e.stopPropagation()
          setTransform(transform * 0.5)
        }}
      />

      <BenefitsLightboxImageContainer
        src={src}
        transform={transform}
        onClick={e => {
          e.stopPropagation()
        }}
      ></BenefitsLightboxImageContainer>
    </LightboxBackground>
  )
}

export default LightBox
