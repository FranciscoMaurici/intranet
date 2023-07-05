import axios from 'axios'

export const getEntity = async (url: string) => {
  const { data } = await axios.get(url, {
    params: { orderBy: 'created_at: desc' },
  })

  return data
}

export const getEntityById = async (entity: string, id: number | string) => {
  const { data } = await axios.get(`/api/${entity}/${id}`)
  return data
}

export const deleteEntity = (entityKey: string, entity) =>
  axios.delete(`/api/${entityKey}/${entity.id}`, entity)

export const addEntity = (entityKey: string, entity) =>
  axios.post(`/api/${entityKey}`, entity)

export const updateEntity = (entityKey: string, entity) =>
  axios.put(`/api/${entityKey}/${entity.id}`, entity)
