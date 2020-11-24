import axios from 'axios'

const urlProjects = 'https://api.phrase.com/v2/projects'

class ProjectService {
  static defaultsHeaders () {
    let token = localStorage.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  static getProjects (payload) {
    console.log('token + ' + localStorage.token)
    this.defaultsHeaders()
    return new Promise(function (resolve, reject) {
      try {
        return axios({
          method: 'get',
          url: urlProjects
        //   headers: {
        //     'Authorization': 'Bearer ' + localStorage.token
        //   }
        }).then(function (response) {
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

export default ProjectService
