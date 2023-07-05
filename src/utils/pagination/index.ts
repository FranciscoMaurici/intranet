import type { IPaginationParams } from '@tstypes'

export const getPaginate = (
  pagination: IPaginationParams,
): { skip: number; take: number } => {
  let skip
  let take

  if (pagination.pageNum && pagination.pageSize) {
    take = Number(pagination.pageSize)
    skip = (Number(pagination.pageNum) - 1) * take
  } else {
    skip = 0
    take = 10
  }

  return { skip, take }
}

export const getSortBy = (orderBy?: string): Record<string, string>[] => {
  let sorter = []

  if (orderBy) {
    const sortFields = orderBy.split(';')

    sorter = sortFields.map((value: string) => {
      const aux = value.split(': ')
      const obj = {}
      obj[aux[0]] = aux[1]
      return obj
    })
  }

  return sorter
}
