import axios from 'axios'

export default function (config = {}) {
  const client = axios.create(config)

  client.interceptors.response.use(
    (res) => res,
    (err) =>
      err.response?.message
        ? throw err.response.message
        : throw new Error('Something wen`t wrong')
  )

  return client
}
