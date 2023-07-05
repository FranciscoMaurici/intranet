import styled from 'styled-components'

import FragmentSkeleton from '@/components/atoms/FragmentSkeleton'
import FragmentText from '@/components/atoms/FragmentText'
import { colors, shadows } from '@/theme'

export const CardContainer = styled.section`
  width: 100%;
  box-shadow: ${shadows.base};
  display: flex;
`
export const IconContainer = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.25em 2.5em 4em 1.25em;
  min-width: fit-content;
`
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.843em 1.25em 2.5em 0;
  width: 100%;
  > header {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding-bottom: 1.594em;
  }

  > div {
    overflow: hidden;
  }
`

export const Subtitle = styled(FragmentText)`
  line-height: 1.4em;
  color: ${colors.neutrals.x700};
`

export const PathItemsContainer = styled.section`
  margin-top: 2.5em;

  & > section:first-child {
    padding-top: 0;
  }
  & > section:last-child {
    border-bottom: none;
  }
`

export const IconSkeleton = styled(FragmentSkeleton).attrs({
  variant: 'circular',
  width: 80,
  height: 80,
})`
  margin-right: 1em;
`
