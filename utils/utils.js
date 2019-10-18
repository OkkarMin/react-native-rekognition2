export const upperCaseArray = input => {
  let result = input.replace(/([A-Z]+)/g, ',$1').replace(/^,/, '')
  return result.split(',')
}

export const fetchData = async (url, endpoint) => {
  try {
    let response = await fetch(`${url}${endpoint}`)

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
