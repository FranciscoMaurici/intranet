export interface IProps {
  step: Step
  status: 'active' | 'inactive' | 'done'
}

export interface Step {
  title: string
  step: number
}
