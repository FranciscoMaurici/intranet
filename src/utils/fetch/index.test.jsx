import axios from 'axios'

import {
  addEntity,
  deleteEntity,
  getEntity,
  getEntityById,
  updateEntity,
} from './index'

jest.mock('axios')

describe('getEntity', () => {
  it('should return the data received in the response', async () => {
    const url = '/api/users'
    const data = [
      { id: '123', name: 'John' },
      { id: '456', name: 'Jane' },
    ]
    axios.get.mockResolvedValue({ data })
    const result = await getEntity(url)
    expect(result).toEqual(data)
  })
})

describe('getEntityById', () => {
  it('should send a GET request to the correct URL', async () => {
    const entity = 'users'
    const id = 123
    await getEntityById(entity, id)
    expect(axios.get).toHaveBeenCalledWith(`/api/${entity}/${id}`)
  })

  it('should return the data received in the response', async () => {
    const entity = 'users'
    const id = 123
    const data = { id: '123', name: 'John' }
    axios.get.mockResolvedValue({ data })
    const result = await getEntityById(entity, id)
    expect(result).toEqual(data)
  })
})

describe('deleteEntity', () => {
  it('should send a DELETE request to the correct URL', async () => {
    const entityKey = 'users'
    const entity = { id: '123' }
    await deleteEntity(entityKey, entity)
    expect(axios.delete).toHaveBeenCalledWith(
      `/api/${entityKey}/${entity.id}`,
      entity,
    )
  })
})

describe('addEntity', () => {
  it('should send a POST request to the correct URL with the correct request body', async () => {
    const entityKey = 'users'
    const entity = { name: 'John', email: 'john@example.com' }
    await addEntity(entityKey, entity)
    expect(axios.post).toHaveBeenCalledWith(`/api/${entityKey}`, entity)
  })
})

describe('deleteEntity', () => {
  it('should send a DELETE request to the correct URL', async () => {
    const entityKey = 'users'
    const entity = { id: '123' }
    await updateEntity(entityKey, entity)
    expect(axios.delete).toHaveBeenCalledWith(
      `/api/${entityKey}/${entity.id}`,
      entity,
    )
  })
})
