import { FaUserCircle as DefaultUserIcon } from 'react-icons/fa'
import Image from 'next/image'

import { IconContainer } from './styles'
import { IProps } from './types'

const ProfileIcon = ({ size = '2.5em', icon, alt, objectFit }: IProps) => {
  const profileIcon = icon ? (
    <Image
      src={icon}
      referrerPolicy="no-referrer"
      alt={alt}
      fill
      style={{ objectFit: objectFit }}
    />
  ) : (
    <DefaultUserIcon />
  )

  return <IconContainer size={size}>{profileIcon}</IconContainer>
}

export default ProfileIcon
export type { IProps }
