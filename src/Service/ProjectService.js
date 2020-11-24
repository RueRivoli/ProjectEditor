import axios from 'axios'

const urlProjects = 'https://api.phrase.com/v2/projects'

class ProjectService {
  static defaultsHeaders () {
    let token = localStorage.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  static getProjects (payload) {
    this.defaultsHeaders()
    return new Promise(function (resolve, reject) {
      try {
        return axios({
          method: 'get',
          url: urlProjects
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

  static updateProject (payload) {
    this.defaultsHeaders()
    return new Promise(function (resolve, reject) {
      try {
        return axios.patch(urlProjects + `/${payload.id}`, {
          name: payload.name
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
