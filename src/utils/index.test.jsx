import {
  getCallbackUrl,
  isActiveLink,
  objKeysToCamelCase,
  parseResponseData,
  sortNewestToOldest,
  ucfirst,
} from './index'

describe('parseResponseData', () => {
  it('parses an array of objects', () => {
    const data = [
      { created_at: new Date(2020, 1, 1) },
      { updated_at: new Date(2020, 2, 2) },
      { deleted_at: new Date(2020, 3, 3) },
    ]
    const expected = [
      { created_at: '2020-02-01T00:00:00.000Z' },
      { updated_at: '2020-03-02T00:00:00.000Z' },
      { deleted_at: '2020-04-03T00:00:00.000Z' },
    ]

    expect(parseResponseData(data)).toEqual(expected)
  })

  it('parses an object', () => {
    const data = {
      created_at: new Date(2020, 1, 1),
      updated_at: new Date(2020, 2, 2),
      deleted_at: new Date(2020, 3, 3),
    }
    const expected = {
      created_at: '2020-02-01T00:00:00.000Z',
      updated_at: '2020-03-02T00:00:00.000Z',
      deleted_at: '2020-04-03T00:00:00.000Z',
    }

    expect(parseResponseData(data)).toEqual(expected)
  })

  it('does not modify non-date keys', () => {
    const data = {
      created_at: new Date(2020, 1, 1),
      name: 'Test',
    }
    const expected = {
      created_at: '2020-02-01T00:00:00.000Z',
      name: 'Test',
    }

    expect(parseResponseData(data)).toEqual(expected)
  })
})

describe('sortNewestToOldest', () => {
  it('sorts an array of objects by date', () => {
    const data = [
      { date: '2022-01-01' },
      { date: '2020-01-01' },
      { date: '2021-01-01' },
    ]
    const expected = [
      { date: '2022-01-01' },
      { date: '2021-01-01' },
      { date: '2020-01-01' },
    ]

    expect(sortNewestToOldest(data, 'date')).toEqual(expected)
  })

  it('sorts an array of objects by string', () => {
    const data = [{ name: 'C' }, { name: 'A' }, { name: 'B' }]
    const expected = [{ name: 'C' }, { name: 'B' }, { name: 'A' }]

    expect(sortNewestToOldest(data, 'name')).toEqual(expected)
  })
})

describe('objKeysToCamelCase', () => {
  it('converts object keys to camel case', () => {
    const data = {
      first_name: 'John',
      last_name: 'Doe',
      address: {
        street_address: '123 Main St.',
        city: 'Anytown',
        state: 'NY',
      },
    }
    const expected = {
      firstName: 'John',
      lastName: 'Doe',
      address: {
        streetAddress: '123 Main St.',
        city: 'Anytown',
        state: 'NY',
      },
    }

    expect(objKeysToCamelCase(data)).toEqual(expected)
  })
})

describe('ucfirst', () => {
  it('capitalizes the first letter of a string', () => {
    expect(ucfirst('hello')).toEqual('Hello')
  })

  it('returns an empty string for an empty input', () => {
    expect(ucfirst('')).toEqual('')
  })
})

describe('isActiveLink', () => {
  it('returns true for a matching pathname and linkHref', () => {
    expect(isActiveLink('/about', '/about')).toBe(true)
  })

  it('returns false for a non-matching pathname and linkHref', () => {
    expect(isActiveLink('/about', '/contact')).toBe(false)
  })

  it('returns true for a pathname containing "benefits" and a linkHref containing "benefits"', () => {
    expect(isActiveLink('/benefits/health', '/benefits')).toBe(true)
  })
})

describe('getCallbackUrl', () => {
  it('returns the correct callback URL', () => {
    expect(getCallbackUrl('/callback')).toEqual('http://localhost/callback')
  })
})
