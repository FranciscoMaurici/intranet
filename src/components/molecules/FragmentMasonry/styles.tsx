import styled from 'styled-components'

export const MasonryLayoutContainer = styled.div`
  display: flex;
`
export const MasonryColumn = styled.div<{ gapSize: string }>`
  margin-bottom: ${({ gapSize }) => gapSize};
`

export const MasonryItem = styled.div<{ gapSize: string }>`
  margin-left: ${({ gapSize }) => gapSize};
  flex: 1;
`
