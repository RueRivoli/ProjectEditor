import axios from 'axios'

const urlApi = 'https://api.phrase.com/v2/'

class AuthService {
  static logUser (payload) {
    console.log('USERNAME : ' + payload)
    const urlCredentials = urlApi + 'authorizations'
    return new Promise(function (resolve, reject) {
      try {
        return axios({
          headers: {'Content-Type': 'application/json'},
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
}

export default AuthService
