import { getErrorMsg, getSuccessMsg } from './index'

describe('getSuccessMsg', () => {
  it('returns the correct success message', () => {
    const entity = 'customer'
    const operation = 'update'
    const expectedResult = 'The customer has been updated successfully'

    const result = getSuccessMsg(entity, operation)

    expect(result).toBe(expectedResult)
  })
})

describe('getErrorMsg', () => {
  it('returns the correct error message', () => {
    const entity = 'customer'
    const operation = 'update'
    const expectedResult =
      'An error occurred while trying to update the customer'

    const result = getErrorMsg(entity, operation)

    expect(result).toBe(expectedResult)
  })
})
