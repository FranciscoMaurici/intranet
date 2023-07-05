/**
 * Validates the indicated properties not being empty in the object to be validated.
 * @param validatedObject Objet to be validated.
 * @param properties Properties to be verified not being empty
 * @returns Validation response with two properties: objectIsValid and errorMessage
 */
export const validateEmptyStringProperties = (
  validatedObject,
  ...properties
) => {
  const validationResponse = { objectIsValid: true, errorMessage: '' }

  properties.forEach(property => {
    const propertyHasValue = validatedObject[property]
    if (!propertyHasValue) {
      validationResponse.objectIsValid = false
      validationResponse.errorMessage = `'${property}' is required.`
    }
  })
  return validationResponse
}

export const validateFields = (requiredFields: string[], data: unknown) => {
  for (const field of requiredFields) {
    if (data[field]) continue
    return {
      isValid: false,
      errorMsg: `The field '${field}' is missing in the request body`,
    }
  }
  return { isValid: true, errorMsg: null }
}

export const isNullishValue = (value?: unknown): boolean =>
  value === undefined || value === null

type ValidatorResult = {
  isValid: boolean
  errorMessage: string
}

export const validateNonEmptyString = (string?: string): ValidatorResult => {
  const result = { isValid: false, errorMessage: '' }

  if (isNullishValue(string)) {
    result.errorMessage = 'is required'
    return result
  }

  if (string.length === 0) {
    result.errorMessage = 'cannot be an empty string'
    return result
  }

  return { ...result, isValid: true }
}

export const validateZeroOrPositiveNumber = (
  number?: number,
): ValidatorResult => {
  const result = { isValid: false, errorMessage: '' }

  if (isNullishValue(number)) {
    result.errorMessage = 'is required'
    return result
  }

  if (number < 0) {
    result.errorMessage = 'is not zero or a positive number'
    return result
  }

  return { ...result, isValid: true }
}

export const validatePositiveNumber = (number?: number): ValidatorResult => {
  const result = { isValid: false, errorMessage: '' }

  if (isNullishValue(number)) {
    result.errorMessage = 'is required'
    return result
  }

  if (number <= 0) {
    result.errorMessage = 'is not a positive number'
    return result
  }

  return { ...result, isValid: true }
}

type Field = {
  name: string
  validator: (value: unknown) => ValidatorResult
}

export const validateAllFields = (
  fields: Field[],
  data: unknown,
): ValidatorResult => {
  for (const { name, validator } of fields) {
    const { isValid, errorMessage } = validator(resolve(name, data))

    if (!isValid) {
      return {
        isValid,
        errorMessage: `${name} ${errorMessage}`,
      }
    }
  }

  return { isValid: true, errorMessage: '' }
}

const resolve = (path, obj) =>
  path
    .split('.')
    .reduce((prev, curr) => (prev ? prev[curr] : null), obj || self)
