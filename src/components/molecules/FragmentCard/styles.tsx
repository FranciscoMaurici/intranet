import styled from 'styled-components'

import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'

export const Container = styled.article`
  display: flex;
  gap: 2.5em;

  img {
    object-position: top;
  }
`

export const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75em;

  p {
    margin-bottom: 0.572em;
  }
`

export const CardActionText = styled(FragmentText)`
  line-height: 1.325em;
  border-bottom: 0.25em solid;
  width: max-content;
  cursor: pointer;
  letter-spacing: 0.05em;

  &:hover {
    color: ${colors.neutrals.black};
  }
`
