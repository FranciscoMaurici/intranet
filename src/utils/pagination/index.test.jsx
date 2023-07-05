import { getPaginate, getSortBy } from './index'

test('getPaginate returns skip and take populated', () => {
  const pagination = {
    pageNum: 6,
    pageSize: 12,
  }
  expect(getPaginate(pagination)).toEqual({ take: 12, skip: 60 })
})

test('getPaginate returns skip and take with default values', () => {
  const pagination = {}
  expect(getPaginate(pagination)).toEqual({ take: 10, skip: 0 })
})

test('getSortBy returns correct array of objects', () => {
  expect(getSortBy('name: ASC; age: DESC')).toEqual([
    { name: 'ASC' },
    { ' age': 'DESC' },
  ])
})

test('getSortBy returns empty array if no orderBy is provided', () => {
  expect(getSortBy()).toEqual([])
  expect(getSortBy(null)).toEqual([])
  expect(getSortBy('')).toEqual([])
})
