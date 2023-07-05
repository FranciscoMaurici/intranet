import { IQueryCondition, WHERE_CLAUSE_OPERATOR } from '@tstypes'

/**
 * Creates a IQueryCondition object used for the Prisma client to specify the 'where' clause of a 'select' query based on the queryParams of the request.
 * Gets the values of the properties indicated on the propertiesNames array and trys to find them on the 'queryParameters'. If founds a value, it's added to the query.
 * @param whereOperator Indicates the operator used in the where clause.
 * @param queryParams Query parameters to be evaluated and where the values will be take from.
 * @param propertiesNames Name of properties to search on the queryParams object.
 * @returns A IQueryCondition object with the values obteined from the queryParams if they contain a value.
 */
export const createWhereClause = function (
  whereOperator: WHERE_CLAUSE_OPERATOR,
  queryParams,
  ...propertiesNames
) {
  const clause: IQueryCondition = { where: { [whereOperator]: [] } }

  propertiesNames.forEach(property => {
    const propertyHasValue = queryParams[property]

    if (propertyHasValue) {
      clause.where[whereOperator].push({
        [property]: { contains: queryParams[property] },
      })
    }
  })

  return clause
}

/**
 * Adds to the specified array the values fonded on the queryParams object in the whereOperator.
 * Validates if the query parameter contains each property specified and add its to the array of
 * the whereOperator indicated.
 * @param whereClause Object IQueryCondition where the parameters will be added.
 * @param whereOperator Operator array in which the values of the parameters will be added.
 * @param queryParams Query params from the request.
 * @param propertiesNames Name of properties to search on the queryParams object.
 */
export const addQueryParams = (
  whereClause: IQueryCondition,
  whereOperator: WHERE_CLAUSE_OPERATOR,
  queryParams,
  ...propertiesNames
) => {
  propertiesNames.forEach(property => {
    const propertyHasValue = queryParams[property]

    if (propertyHasValue) {
      const intialicedArray = whereClause.where[whereOperator]
      if (!intialicedArray) {
        whereClause.where[whereOperator] = []
      }

      whereClause.where[whereOperator].push({
        [property]: { contains: queryParams[property] },
      })
    }
  })
}
