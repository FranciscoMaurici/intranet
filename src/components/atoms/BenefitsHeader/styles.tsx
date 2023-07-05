import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  position: relative;

  & span {
    transform: translateY(-1em) scale(1.05);
  }
  & span:first-of-type {
    transform: translate(-3em, -1em) scale(1.05);
  }

  & > img {
    object-fit: contain;
    object-position: left;
  }

  & > img:last-of-type {
    object-position: right;
  }
`

export const Content = styled.div`
  text-align: center;
  max-width: 36.25em;
  margin: auto;
  padding-bottom: 5em;
  z-index: 1;
  h1 {
    margin-top: 0.106em;
    margin-bottom: 1.055em;
  }
`
