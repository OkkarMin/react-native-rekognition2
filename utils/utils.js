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

export const postData = async (url, endpoint, payload) => {
  try {
    let response = await fetch(`${url}${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    return await response.text()
  } catch (error) {
    console.log(error)
  }
}

export const detectFacesFromAWSCollection = async (
  collectionName,
  imageInBase64
) => {
  let payload = {
    collectionName,
    image: imageInBase64
  }

  let result = await postData(
    'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api',
    '/detectFaces',
    payload
  )

  return result
}

export const sendSMS = async (message, phoneNumber) => {
  let payload = {
    message,
    phoneNumber
  }

  try {
    let response = await fetch(`${url}/sendSMS`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    console.log(await response.text())
  } catch (error) {
    console.log(error)
  }
}
