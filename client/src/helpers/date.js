export const getDate = (data) => {
  const day = data.slice(8, 10)
  const month = data.slice(5, 7)
  const year = data.slice(2, 4)

  const date = `${day}.${month}.${year}`

  return date
}

export const getTime = (data) => {
  const time = data.slice(11, 16)

  return time

}