import {
  invalidMessage,
  isValidId,
  isValidSlug,
  requiredMessage,
} from './index'

describe('isValidId', () => {
  it('should return true if the value is an object with a positive id property', () => {
    const value = { id: 123 }
    const errorMessage = 'Invalid ID'
    const result = isValidId(value, errorMessage)
    expect(result).toBe(true)
  })

  it('should return the error message if the value is not an object with a positive id property', () => {
    const value = '123'
    const errorMessage = 'Invalid ID'
    const result = isValidId(value, errorMessage)
    expect(result).toEqual(errorMessage)
  })

  it('should return the default error message if no error message is provided', () => {
    const value = ''
    const result = isValidId(value)
    expect(result).toEqual('Required field')
  })
})

describe('isValidSlug', () => {
  it('should return true if the value is correct', () => {
    const value = 'lovely-slug-123'
    const result = isValidSlug(value)
    expect(result).toBe(true)
  })

  it('should return an error message when the value is empty', () => {
    const value = ''
    const result = isValidSlug(value)
    expect(result).toEqual(requiredMessage('Slug'))
  })

  it('should return an error message when the value is incorrect', () => {
    const value = 'Bad slug! >:('
    const result = isValidSlug(value)
    expect(result).toEqual(invalidMessage('Slug'))
  })
})
