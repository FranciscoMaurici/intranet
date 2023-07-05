import styled from 'styled-components'

import editorContentStyles from '@/utils/editor/editorContentStyles'

export const StyledContent = styled.div<{
  $isDashboard: boolean
  $isContentExpanded?: boolean
}>`
  ${editorContentStyles}
`
