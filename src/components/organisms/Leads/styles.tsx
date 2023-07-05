import styled from 'styled-components'

import { borders, shadows } from '@/theme'

export const LeadsLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3.75em;
  text-align: center;
  align-items: center;
  & > article {
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.5em;
      width: 30em;
    }
    p {
      width: 87%;
    }
  }
`

export const Divider = styled.hr`
  border-top: ${borders.divider};
  width: 100%;
  margin: 0;
`

export const QuestionCard = styled.div`
  box-shadow: ${shadows['1x']};
  width: 20.3125em;
  padding: 1.25em;
  box-sizing: border-box;
  text-align: left;
`

export const QuestionCardLinksContainer = styled.div`
  display: flex;
  gap: 1.25em;
  margin-top: 1em;
`

export const QuestionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  & > div {
    margin-top: 2em;
    display: flex;
    gap: 2em;
    justify-content: center;
  }
`
