export interface IProps {
  steps: Step[]
  current: number
}

export interface Step {
  title: string
  step: number
}
