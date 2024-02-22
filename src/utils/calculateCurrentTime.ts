export const calculateCurrentTime = (timezone: number) => {
  const date = new Date(timezone * 1000)
  const options = { hour: '2-digit', minute: '2-digit' }
  // @ts-ignore
  return date.toLocaleString(undefined, options)
}
