import axios from 'axios'

const urlApi = 'https://api.phrase.com/v2/'

class AuthService {
  static createProjects (payload) {
    const urlProjects = urlApi + 'projects'
    console.log('PAYLOAD : ' + payload)
    return new Promise(function (resolve, reject) {
      try {
        return axios.get(urlProjects, { auth: {
          username: payload.username,
          password: payload.password
        }}).then(function (response) {
          console.log('RETOUR DE LOGIN')
          console.log(response)
          if (response.data.success) {
            // const token = response.data.token
            // VueCookies.set('jwt' , token , "1h")
            resolve(response.data)
          } else {
            resolve(response)
          }
        }).catch(function (error) {
          console.log(error)
          reject(error)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  static logUser (payload) {
    console.log('USERNAME : ' + payload)
    const urlCredentials = urlApi + 'authorizations'
    return new Promise(function (resolve, reject) {
      try {
        return axios({
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: urlCredentials,
          auth: {
            username: payload.username,
            password: payload.password
          },
          data: {
            note: 'My Deploy Script',
            scopes: ['read', 'write'],
            expires_at: '2021-03-30T09:52:53Z'
          }
        }).then(function (response) {
          console.log('Retour de create authorizations')
          console.log(response)
          resolve(response)
        }).catch(function (error) {
          console.log(error)
          reject(error)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  static getProjects (username) {
    console.log('USERNAME : ' + username)
    const urlAuth = 'https://api.phrase.com/v2/authorizations'
    return new Promise(function (resolve, reject) {
      try {
        return axios.post(urlAuth, {
          username: username
        }).then(function (response) {
          console.log('RETOUR DE CREATE CREDENT')
          console.log(response)
          if (response.data.success) {
            // const token = response.data.token
            // VueCookies.set('jwt' , token , "1h")
            resolve(response.data)
          } else {
            resolve(response)
          }
        }).catch(function (error) {
          console.log(error)
          reject(error)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default AuthService
