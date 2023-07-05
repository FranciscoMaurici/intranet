import { useSession } from 'next-auth/react'

import {
  HeaderTextContainer,
  RoleText,
  UserDataContainer,
  UserDataTextContainer,
  UserNameText,
} from './styles'
import { IProps } from './types'

import ProfileIcon from '@/components/atoms/ProfileIcon'

const UserData = ({
  withName = false,
  uppercaseName = false,
  nameFontSize = '0.875em',
  nameFontWeight = '400',
  iconSize = '2.5em',
  iconRightMargin = '0.75em',
  children,
  useDistilleryInfo,
  text,
  icon,
  role,
}: IProps) => {
  const { data: session } = useSession()
  const userDataText = useDistilleryInfo
    ? 'Distillery News'
    : text || session?.user?.name

  const imgSrc = useDistilleryInfo
    ? '/images/distillery-logo-icon.svg'
    : icon || session?.user?.image

  return (
    <UserDataContainer gap={iconRightMargin}>
      <ProfileIcon
        size={iconSize}
        icon={imgSrc}
        alt={userDataText}
        objectFit={useDistilleryInfo ? 'scale-down' : 'cover'}
      />

      <UserDataTextContainer>
        {(withName || text) && (
          <HeaderTextContainer>
            <UserNameText
              fontSize={nameFontSize}
              uppercase={uppercaseName}
              fontWeight={nameFontWeight}
            >
              {userDataText}
            </UserNameText>
            {role && <RoleText>{role}</RoleText>}
          </HeaderTextContainer>
        )}
        {children}
      </UserDataTextContainer>
    </UserDataContainer>
  )
}

export default UserData
export type { IProps }
