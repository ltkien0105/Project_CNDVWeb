function userService() {
  const baseUrl = '/api/user'
  const headers = {
    'Content-Type': 'application/json'
  }

  function getUser(id) {
    let url = `${baseUrl}/${id}`
    const response = fetch(url).then((res) => res.json())
    return response
  }

  function changePassword(changeInfo) {
    let url = `${baseUrl}/${changeInfo.username}`
    const response = fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ curPass: changeInfo.curPass, newPass: changeInfo.newPass })
    }).then((res) => res.json())

    return response
  }

  function deleteUser(username) {
    let url = `${baseUrl}/${username}`
    const response = fetch(url, {
      method: 'DELETE'
    }).then((res) => res.json())

    return response
  }

  return {
    getUser,
    changePassword,
    deleteUser
  }
}

export default userService()
