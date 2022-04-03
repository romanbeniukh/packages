export function debounce(func, delay) {
  let timeout

  return function (...args) {
    if (args[1] !== undefined) {
      delay = args[1]
    }
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), delay)
  }
}
