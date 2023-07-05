import Grid from '@mui/material/Grid'
import styled from 'styled-components'

import FragmentLink from '@/components/atoms/FragmentLink'
import FragmentSkeleton from '@/components/atoms/FragmentSkeleton'
import FragmentText from '@/components/atoms/FragmentText'
import { colors, shadows } from '@/theme'

export const StyledExpander = styled(FragmentLink)`
  margin-bottom: 1em;
`
export const UserNameHeader = styled.section`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`
export const CardContainer = styled.section<{ direction?: string }>`
  width: 100%;
  box-shadow: ${shadows.base};
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
`

export const StyledGridContainer = styled(Grid)`
  gap: 0.5em;
`
export const StyledRow = styled(Grid)`
  flex-wrap: nowrap;
`

export const VisibleCard = styled.div`
  display: flex;
`
export const IconContainer = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1em 2.5em 1em 1em;
  min-width: fit-content;
  > img {
    border-radius: 100%;
  }
`
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  > header {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5em;
  }

  > div {
    overflow: hidden;
  }
`

export const Subtitle = styled(FragmentText)`
  line-height: 1.4em;
  color: ${colors.neutrals.x700};
`

export const EditPermissionsFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 2em 0;
  padding: 0.5em;

  & > section:first-child {
    padding-top: 0;
  }
  & > section:last-child {
    border-bottom: none;
  }
`

export const IconSkeleton = styled(FragmentSkeleton).attrs({
  variant: 'circular',
  width: 60,
  height: 60,
})`
  margin-right: 1em;
`

export const GridCell = styled(Grid)`
  word-break: break-word;
`
