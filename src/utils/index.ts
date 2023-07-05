import benefits from '@data/benefits.json'

export const includes = (child = '', text = '') =>
  text.toLowerCase().includes(child.toLowerCase())

export const parseResponseData = <T>(data: T | T[]) => {
  if (Array.isArray(data)) {
    return data.map(objectData => parseResponseData(objectData))
  } else {
    const dateKeys = ['created_at', 'updated_at', 'deleted_at']

    for (const key in data) {
      if (dateKeys.includes(key)) {
        data[key] = data[key] = (
          data[key] as unknown as Date
        ).toISOString() as unknown as T[Extract<keyof T, string>]
        continue
      } else if (isObject(data[key])) {
        data[key] = parseResponseData(data[key])
      }
    }
  }
  return data
}

const isObject = (data: unknown) =>
  typeof data === 'object' && !Array.isArray(data) && data !== null

/**
 * @param {string} key - The key name of the Date field you want to base the sorting.
 */
export function sortNewestToOldest<T>(arr: T[], key: string) {
  return arr.sort((a, b) => b[key]?.localeCompare(a[key]))
}

/**
 * @param {string} str - The text you want to capitalize its first letter.
 */
export const ucfirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const objKeysToCamelCase = <T>(obj: object) => {
  const newObj = {}

  for (const key in obj) {
    let keyName: string
    const currValue = obj[key]
    const isObject =
      currValue &&
      typeof currValue === 'object' &&
      Object.keys(currValue).length > 0

    if (key.includes('_')) {
      keyName = key.split('_').reduce((res, cur, idx) => {
        if (idx === 0) {
          return cur
        }
        return res + ucfirst(cur)
      }, '')
    } else {
      keyName = key
    }

    if (isObject) {
      newObj[keyName] = objKeysToCamelCase(currValue)
    } else {
      newObj[keyName] = currValue
    }
  }

  return newObj as T
}

export const getCallbackUrl = (path: string) => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'http://localhost'
  return origin + path
}

export const isActiveLink = (pathname: string, linkHref: string) => {
  if (!linkHref || !pathname) return false
  if (pathname.includes('benefits') && linkHref.includes('benefits')) {
    return true
  }

  return pathname === linkHref
}

export const getBenefitBySlug = (slug: string | string[]) =>
  Object.keys(benefits)
    .reduce(
      (accumulatedBenefits, actualSection) =>
        accumulatedBenefits.concat(benefits[actualSection].benefits),
      [],
    )
    .find(benefit => benefit.slug === slug)

export function chunk<T>(array: T[], size: number) {
  return array.reduce((chunks: T[][], item: T, index: number) => {
    const chunkIndex = Math.floor(index / size)
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = []
    }
    chunks[chunkIndex].push(item)
    return chunks
  }, [])
}
