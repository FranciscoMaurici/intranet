import Grid from '@mui/material/Grid'
import styled from 'styled-components'

import FragmentButton from '@/components/atoms/_FragmentButton'

export const HandbookArticleEditorLayout = styled.form`
  .MuiFilledInput-underline::before {
    border: 0 !important;
  }

  #editorToolbar {
    button {
      font-size: 1em;
    }

    div {
      height: 1em;
      width: 1em;
    }
  }

  #homepage-container .edit-mode {
    height: 180px;
  }

  #full-article-container .edit-mode {
    height: 400px;
  }
`

export const SlugGrid = styled(Grid)`
  .MuiInputBase-input {
    font-weight: bold;
  }

  .MuiInputAdornment-root {
    margin-right: 1px;
  }
`

export const StyledButton = styled(FragmentButton)`
  width: 100%;
`
