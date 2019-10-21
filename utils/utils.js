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

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const putData = async (url, endpoint, payload) => {
  try {
    let response = await fetch(`${url}${endpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const getMatricNumFromCaptures = async captures => {
  let detectedStudentsMatricNumArray = []

  await Promise.all(
    captures.map(async image => {
      let response = await detectFacesFromAWSCollection(
        collectionName,
        image['base64']
      )

      response.map(studentMatricNum =>
        detectedStudentsMatricNumArray.push(studentMatricNum)
      )
    })
  )

  return detectedStudentsMatricNumArray
}

export const detectFacesFromAWSCollection = async (
  collectionName,
  imageInBase64
) => {
  let payload = {
    collectionName,
    image: imageInBase64
  }

  try {
    let response = await postData(
      'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api',
      '/detectFaces',
      payload
    )

    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateAttendance = async studentData => {
  let payload = {
    courseCode: studentData.courseCode,
    groupID: studentData.groupID,
    classType: studentData.classType,
    date: studentData.date,
    status: studentData.status === 'Absent' ? 'Present' : 'Absent',
    matricNo: studentData.matricNo,
    acadYear: '2019',
    semester: '1',
    remarks: 'nil'
  }

  putData(
    'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api',
    '/updateStudentAttendance',
    payload
  ).then(result => console.log(result))
}

export const getPhoneNumFromMatricNum = async matricNum => {
  let response = await fetchData(
    'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api',
    `/getStudentInfo/${matricNum}`
  )

  return response.Item.contactNo
}

export const sendSMS = async (message, phoneNumber) => {
  let payload = {
    message,
    phoneNumber: `+65${phoneNumber}`
  }

  try {
    let response = await fetch(
      'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api/sendSMS',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )

    console.log(await response.text())
  } catch (error) {
    console.log(error)
  }
}

export const sendSMSToAbsentees = async absenteesMatricNumArray => {
  let studentPhoneNumArray = []

  await Promise.all(
    absenteesMatricNumArray.map(async matricNum => {
      if (matricNum.startsWith('U')) {
        let phoneNum = await getPhoneNumFromMatricNum(matricNum)
        studentPhoneNumArray.push(phoneNum)
      }
    })
  )

  studentPhoneNumArray.map(phoneNum => {
    sendSMS(
      'You have been marked absent for a current ongoing course',
      phoneNum
    )

    console.log(phoneNum)
  })
}
