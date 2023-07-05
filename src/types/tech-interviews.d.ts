import { TechInterview } from '@prisma/client'

import { IPaginationParams } from '.'

// TechInterview GET all types
export type ITechInterviewGetAllRequest = Partial<IPaginationParams>

export type ITechInterviewGetAllResponse = {
  data: TechInterview[]
  pagination: IPaginationParams
}

// TechInterview DELETE types
export type ITechInterviewDeleteRequest = ITechInterviewPostPutRequest
export type ITechInterviewDeleteResponse = { message: 'Position deleted' }

export interface ITechInterviewPostPutRequest {
  interviewer_id: number
  stack_manager_id: number
  recruiter_id: number
  interview_datetime: string
  comments: string

  position: {
    primary_skill_id: number
    primary_skill_seniority_id: number
    secondary_skill_id: number
    secondary_skill_seniority_id: number
    is_tech_lead: boolean
    bullhorn_id: number
    job_description: string
    job_requirements: string
  }
  client: {
    name: string
    id: number
  }

  candidate: {
    first_name: string
    last_name: string
    email: string
    country_id: number
    english_level: string
    screening_feedback: string
    code_test_url: string
    cv: string
  }
}

export type ITechInterviewPostPutResponse = TechInterview
