import { prismaMock } from '../../../../setupTests'
import { getTechInterviews } from '../../../controllers/tech-interviews'

import { createMockedRequest } from '@/__tests__/api-mock'

jest.mock('../../../../prisma')
it('Get all tech interviews', async () => {
  const { req, res } = createMockedRequest({})

  const interviewMock = {
    id: 1,
    interview_date: new Date(),
    recruiter_id: null,
    candidate_id: 1,
    position_id: 1,
    interviewer_id: null,
    stack_manager_id: null,
    is_approved: false,
    comments: '',
    status: true,
    created_at: null,
    updated_at: null,
  }

  prismaMock.techInterview.findMany.mockResolvedValue([interviewMock])
  await getTechInterviews(req, res)

  expect(res.statusCode).toEqual(200)
  expect(res._getJSONData().data).toHaveLength(1)
})
