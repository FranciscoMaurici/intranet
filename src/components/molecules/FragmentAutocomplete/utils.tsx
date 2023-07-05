import { FieldValues as RHFFieldValues } from 'react-hook-form'

import { StyledAvatar, TextFieldAvatarContainer } from './styles'

export const UserAvatar = <OptionsType extends RHFFieldValues>({
  option,
}: {
  option: OptionsType
}) => {
  const src = option.avatar || `data:image/jpeg;base64,${option.avatar_file}`
  const alt = option.name

  return (
    <TextFieldAvatarContainer>
      <StyledAvatar src={src} alt={alt} />
    </TextFieldAvatarContainer>
  )
}
