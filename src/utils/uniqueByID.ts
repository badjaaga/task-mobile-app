export const uniqueById = (array: any) => {
  return Array.from(new Set(array.map(item => item.id))).map(id => array.find(item => item.id === id))
}
