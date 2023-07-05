import { MdDelete, MdMode, MdMoreHoriz } from 'react-icons/md'
import styled from 'styled-components'

import { colors } from '@theme'

export const ThreeDotsMenuIcon = styled(MdMoreHoriz)`
  font-size: 1.3em;
  color: ${colors.grays.subtle};
  cursor: pointer;
`

export const EditIcon = styled(MdMode)`
  margin-right: 0.5em;
`

export const DeleteIcon = styled(MdDelete)`
  margin-right: 0.5em;
`

export const CardMenuWrapper = styled.div`
  z-index: 9;
`
