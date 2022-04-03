import apiClient from '@/api/helpers/apiClient'

const BASE_URL = 'https://registry.npmjs.org'

export default {
  getPackagesByQuery: async (params) => {
    const { data } = await apiClient({ baseURL: BASE_URL }).get(
      '/-/v1/search',
      {
        params
      }
    )

    return data
  }
}
