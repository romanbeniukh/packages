import apiClient from '@/api/helpers/apiClient'

const BASE_URL = 'https://data.jsdelivr.com/v1'
const request = apiClient({ baseURL: BASE_URL })

export default {
  getPackageBadge: async ({ name }) => {
    const { data } = await request.get(`/package/npm/${name}/badge`)

    return { badge: data }
  },
  getPackageEntrypoints: async ({ name, version }) => {
    const { data } = await request.get(
      `/package/npm/${name}@${version}/entrypoints`
    )

    return { entrypoints: data }
  },
  getPackageStats: async ({ name, version }) => {
    const { data } = await request.get(`/package/npm/${name}@${version}/stats`)

    return { stats: data }
  },
  getFullPackageInfo: async function ({ name, version }) {
    const result = await Promise.all([
      this.getPackageBadge({ name }),
      this.getPackageEntrypoints({ name, version }),
      this.getPackageStats({ name, version })
    ])

    let resultObj = {}
    result.forEach((x) => (resultObj = { ...resultObj, ...x }))
    return resultObj
  }
}
