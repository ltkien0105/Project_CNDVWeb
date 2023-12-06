function authService() {
  const baseUrl = '/api/auth'
  const headers = {
    'Content-Type': 'application/json'
  }

  async function register(user) {
    let url = `${baseUrl}/register`

    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(user)
    }).then((res) => res.json())
  }

  async function signIn(user) {
    let url = `${baseUrl}/login`
    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(user)
    }).then((res) => res.json())
  }

  async function resetPassword(forgetInfo) {
    let url = `${baseUrl}/forget`

    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(forgetInfo)
    }).then((res) => res.json())
  }

  return {
    register,
    signIn,
    resetPassword
  }
}

export default authService()
