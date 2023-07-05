export interface ICelebration {
  name: string
  job_title: string
  avatar: string
  avatar_file?: Buffer
  years_difference?: number
  type: 'birthday' | 'anniversary'
}

export type ICelebrationGetAllRequest = { date: string }
export type ICelebrationGetAllResponse = Record<string, ICelebration[]>
