import styled, { css } from 'styled-components'

import FragmentButton from '@components/atoms/FragmentButton'
import { colors, zindex } from '@theme'

import { DefaultActionPermission } from '@/types/enums/defaultActions'

export const BenefitHeaderContainer = styled.div<{
  status?: DefaultActionPermission
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
  background-color: ${colors.white};
  position: relative;

  ${({ status }) =>
    status === DefaultActionPermission.UPDATE &&
    css`
      position: sticky;
      top: 5em;
      z-index: ${zindex.z10};
    `}
`

export const Form = styled.form`
  width: 100%;
`
export const CancelButton = styled(FragmentButton)`
  margin-right: 1em;
`
