export const syncUrlWithVuex = (router, options = []) => {
  return (store) => {
    router.isReady().then(() => {
      const route = router.currentRoute.value

      options.forEach((param) => {
        const urlParam = param.as || param.name
        const computedMutation = param.module
          ? `${param.module}/${param.mutation}`
          : param.mutation

        if (urlParam in route.query) {
          store.commit(computedMutation, route.query[urlParam])
        }
      })
    })

    store.subscribe((mutation) => {
      options.forEach((param) => {
        const route = router.currentRoute.value
        const urlParam = param.as || param.name
        const computedMutation = param.module
          ? `${param.module}/${param.mutation}`
          : param.mutation

        if (mutation.type !== computedMutation) return

        const value = mutation.payload
        let valueToPush =
          value && value !== param.defaultValue ? value : undefined

        router.push({
          query: {
            ...route.query,
            [urlParam]: valueToPush
          }
        })
      })
    })
  }
}
