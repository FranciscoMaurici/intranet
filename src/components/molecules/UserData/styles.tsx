import styled from 'styled-components'

import { colors } from '@theme'

import FragmentText from '@/components/atoms/FragmentText'

export const UserDataContainer = styled('div')<{
  gap: string
}>`
  display: flex;
  align-items: flex-start;
  gap: ${({ gap }) => gap};
`

export const UserDataTextContainer = styled.div`
  margin-right: 0.25em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  gap: 0.25em;
`

export const UserNameText = styled('h5')<{
  uppercase?: boolean
  fontSize?: string
  fontWeight?: string
}>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${colors.blackLight};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  line-height: 1.375rem;
`

export const UserRoleText = styled.p`
  font-size: 0.75em;
  color: ${colors.grays.subtle};
`

export const HeaderTextContainer = styled.div`
  display: flex;
  align-items: baseline;
`

export const RoleText = styled(FragmentText)`
  font-size: 0.75em;
  color: ${colors.neutrals.x400};
  margin-left: 0.75em;
`
