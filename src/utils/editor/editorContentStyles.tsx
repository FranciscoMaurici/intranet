import { css } from 'styled-components'

import { proseMirrorMaxHeight } from '@/components/molecules/AnnouncementCard'
import { colors } from '@/theme'

const overrideCssReset = css`
  html,
  body,
  div,
  span,
  applet,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  code,
  del,
  dfn,
  em,
  img,
  q,
  s,
  small,
  strike,
  strong,
  sub,
  var,
  b,
  u,
  i,
  center,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  details,
  embed,
  figure,
  figcaption,
  header,
  menu,
  nav,
  output,
  section,
  summary,
  mark,
  video {
    margin: revert;
    padding: revert;
    border: revert;
    font-size: revert;
    font: revert;
    vertical-align: revert;
  }

  body {
    line-height: revert;
  }
  ol,
  ul {
    list-style: revert;
  }
  blockquote,
  q {
    quotes: revert;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: revert;
    content: revert;
  }
  table {
    border-spacing: revert;
  }
`

export default css<{
  $isDashboard: boolean
  $isContentExpanded?: boolean
}>`
  ${overrideCssReset}
  .ProseMirror {
    &:focus,
    &:active {
      outline: none;
    }
    position: relative;
  }
  overflow: hidden;
  max-height: ${({ $isContentExpanded }) =>
    $isContentExpanded ? 'auto' : proseMirrorMaxHeight + 'px'};

  * {
    color: ${colors.blackLight};
    max-width: 100%;
  }

  > * {
    margin: 0;
    & + * {
      margin-top: 22px;
    }
  }

  padding: 0 1.5em;

  h1,
  h2,
  h3 {
    font-family: 'Noto Serif', serif;
    color: ${colors.brandSun};
    font-style: italic;
    margin-bottom: 1em;
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: 1.3em;
    word-wrap: break-word;
  }

  h1,
  h2,
  h4 {
    font-weight: 700;
  }

  h1 {
    font-size: 2.1em;
  }

  h2 {
    font-size: 1.7em;
    font-weight: 400;
  }

  h3 {
    font-size: 1.4em;
  }

  h4 {
    font-size: 1.1em;
    text-transform: uppercase;
    color: ${colors.grays.heading};
  }

  p {
    word-wrap: break-word;
    color: ${colors.grays.heading};
    font-size: 16px;
    line-height: 22px;
  }

  a,
  a[target='_blank'] {
    color: ${colors.textLink};
    text-decoration: underline;
  }

  strong {
    color: ${colors.brandSun};
  }

  img {
    max-height: ${({ $isDashboard }) => ($isDashboard ? '25em' : 'auto')};
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
    cursor: zoom-in;

    &.custom-image-large {
      /* 
        Container width: ((1200px - 1.5em ) * 0.6) = 705.6px
        Max image-width: 705.6px - 4em = 641.6px
        Magic number: 705.6px / 641.6px = 1.099750623
      
      transform: ${({ $isDashboard }) =>
        `scale(${$isDashboard ? 1.099750623 : 1})`};
      padding-top: ${({ $isDashboard }) => ($isDashboard ? '1em' : 0)};
      */
    }

    &.ProseMirror-selectednode {
      outline: hidden;
    }
  }

  .custom-image-small {
    max-width: 200px;
  }
  .custom-image-medium {
    max-width: 100%;
  }
  .custom-image-large {
    max-width: 100%;
  }
  .custom-image-float-none {
    float: none;
  }
  .custom-image-float-left {
    float: left;
  }
  .custom-image-float-right {
    float: right;
  }

  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: none;
      box-sizing: border-box;
      min-width: 1em;
      padding: 0.1875em 0.3125em;
      position: relative;
      vertical-align: middle;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: #f1f3f5;
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: rgba(200, 200, 255, 0.4);
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: #adf;
      bottom: -0.125em;
      position: absolute;
      right: -0.125em;
      pointer-events: none;
      top: 0;
      width: 0.25em;
    }

    p {
      margin: 0;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  @media (min-width: 1440px) {
    h1 {
      font-size: 2.7em;
    }

    h2 {
      font-size: 2.3em;
    }

    h3 {
      font-size: 1.9em;
    }

    h4 {
      font-size: 1.4em;
    }
  }
`
