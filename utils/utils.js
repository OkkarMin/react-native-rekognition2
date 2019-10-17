export const upperCaseArray = input => {
  var result = input.replace(/([A-Z]+)/g, ',$1').replace(/^,/, '')
  return result.split(',')
}
