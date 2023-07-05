import styled from 'styled-components'

import { FragmentSkeleton } from '@components'
import { colors, spacers } from '@theme'

import { BasicCard } from '../CardInputContainer/styles'
import FragmentDialog from '../FragmentDialog'

import FragmentText from '@/components/atoms/FragmentText'
import editorContentStyles from '@/utils/editor/editorContentStyles'

export const AnnouncementCardContainer = styled(BasicCard)`
  margin-top: ${spacers.md};
  padding-bottom: 1em;
  position: relative;
`

export const AnnouncementHeader = styled.div`
  display: flex;
  padding: ${spacers.md};
  justify-content: space-between;
`

export const CardHeaderLeft = styled.div`
  display: flex;
`

export const StyledContentContainer = styled.div`
  position: relative;
`

export const CardHeaderData = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  line-height: 1.7em;

  h5 {
    color: ${colors.blackLight};
    font-weight: 700;
  }

  p {
    color: ${colors.grays.subtle};
  }

  span {
    margin-left: 2em;
  }
`

export const CardDescription = styled.div<{ padding?: string }>`
  padding: ${({ padding }) => padding};
  color: ${colors.grays.heading};
  font-size: 0.875em;
  font-weight: 100;
  line-height: 2em;
`

export const ProfileIconSkeleton = styled(FragmentSkeleton).attrs({
  variant: 'circular',
  width: 40,
  height: 40,
})`
  margin-right: 1em;
`

export const StyledContent = styled.div<{
  $isDashboard: boolean
  $isContentExpanded?: boolean
}>`
  ${editorContentStyles}
`

export const ReadMoreBar = styled.div`
  width: calc(100% - 3em);
  background: ${colors.neutrals.x100};
  border: 1px solid ${colors.neutrals.x300};
  height: 2.25em;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1em;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5em;

  &:hover {
    background: ${colors.neutrals.x200};
    transition: 300ms ease-in;
  }
`

export const ReadMoreText = styled(FragmentText)`
  font-size: 0.75em;
`

export const ReadMoreGradient = styled.div`
  position: absolute;
  bottom: 0;
  height: 5.5em;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 240, 0.5) 35%,
    rgba(255, 255, 255, 1) 70%
  );
  border-radius: 0.5em;
`

export const StyledFragmentDialog = styled(FragmentDialog)`
  & .MuiPaper-root {
    width: 100%;
  }

  & .MuiDialogContent-root {
    padding: 0 0 1em;
    overflow-y: auto;
  }
  & .MuiDialogTitle-root + .MuiDialogContent-root {
    padding-top: 0;
  }

  form {
    flex-direction: row;
    gap: 0.75em;
  }
`
