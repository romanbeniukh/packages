import apiClient from '@/api/helpers/apiClient'

const BASE_URL = 'https://registry.npmjs.org'
const request = apiClient({ baseURL: BASE_URL })

export default {
  getPackagesByQuery: async (params) => {
    const { data } = await request.get('/-/v1/search', {
      params
    })

    return data
  }
}
