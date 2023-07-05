import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

import colors from './colors'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html{
    scrollbar-gutter: stable;

    body{
      overflow-y: scroll;
    }
  }

  html * {
    font-family: 'Noto Sans';
  }

  a{
    text-decoration: auto;
  }

  .MuiContainer-root{
    max-width: 80em;
  }

  .MuiFormLabel-asterisk{
    color: ${colors.danger.x700};
  }

  .reactionsPopper{

    & .MuiTooltip-tooltip{
                display: flex;
                background-color: ${colors.neutrals.white};
                box-shadow:
                  0px 4px 4px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 0.125em;
                align-items: center;
                gap: 1.5em;
                padding: 1em;
              }

  }  
`

export default GlobalStyle
