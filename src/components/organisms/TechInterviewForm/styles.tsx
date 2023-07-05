import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`
export const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-bottom: 2.25em;
`
export const FiledsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`
export const NextButtonContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  justify-self: end;
`
