import styled from 'styled-components'

import FragmentDialog from '../FragmentDialog'

export const StyledFragmentDialog = styled(FragmentDialog)`
  & .MuiPaper-root {
    max-width: 43.25em;
    box-sizing: content-box;
    position: relative;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    & > div:nth-child(5),
    & > div[name='country'],
    & > div:nth-child(11) {
      grid-column: 1 / 3;
    }
  }
`
