import { Department, LearningPath, Seniority, Stack } from '@prisma/client'

export interface IStep extends Omit<LearningPath, 'stack_id' | 'seniority_id'> {
  isComplementary: boolean
  seniority: Seniority
}

export interface IStack extends Omit<Stack, 'department_id'> {
  paths?: IStep[]
}

export interface IDepartment extends Department {
  stack?: IStack[]
  description?: string
}

export type ILearningPathGetAllResponse = IDepartment[]
