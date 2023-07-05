import getTextContent from './constants'

const { REQUIRED_VALIDATION } = getTextContent()

export const requiredMessage = fieldName => fieldName + ' is required'

export const invalidMessage = fieldName => fieldName + ' is invalid'

export const isValidId = (
  value: string | { id: number },
  errorMessage: string,
) => {
  if (value && typeof value === 'object' && !!value?.id) {
    return true
  } else {
    return errorMessage || REQUIRED_VALIDATION
  }
}

export const isValidEmail = (value: string, fieldName = 'Email') => {
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!value) {
    return requiredMessage(fieldName)
  } else if (!emailRegex.test(value)) {
    return invalidMessage(fieldName)
  } else {
    return true
  }
}

export const isValidUrl = (
  value: string,
  fieldName = 'URL',
  allowEmpty = false,
) => {
  if (!allowEmpty && !value) {
    return requiredMessage(fieldName)
  }
  const urlRegex =
    /^(?:(http|https)?:\/\/)?(?:[\w-]+\.)+([a-z]|[A-Z]|[0-9]){2,6}?\/?$/gi

  if (urlRegex.test(value)) {
    return true
  } else {
    return invalidMessage(fieldName)
  }
}

export const isValidPhone = (
  value: string,
  fieldName = 'Phone',
  allowEmpty = false,
) => {
  const phoneRegex = /^(?=.*?[1-9])[0-9()-+- -]+$/
  if (!allowEmpty && !value) {
    return requiredMessage(fieldName)
  }

  if (!phoneRegex.test(value)) {
    return invalidMessage(fieldName)
  }
}

export const isValidSlug = (value: string, fieldName = 'Slug') => {
  const slugRegex = /^[a-z0-9-]+$/

  if (!value) {
    return requiredMessage(fieldName)
  } else if (!slugRegex.test(value)) {
    return invalidMessage(fieldName)
  } else {
    return true
  }
}
