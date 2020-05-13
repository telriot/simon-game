export const clearTimeouts = (timeouts) => {
  if (timeouts.length) {
    for (let timeout of timeouts) {
      clearTimeout(timeout)
    }
  }
}
