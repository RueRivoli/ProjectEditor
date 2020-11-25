<template>
    <div>
      <div style="height:80vh;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;font-weight:light;">
              <tr style="margin-bottom:5px;">
                <el-button  size="mini" @click="getList()" round><i class="material-icons mini">refresh</i>Refresh</el-button>
            </tr>
            <tr class="light head">
              <th class="center" style="width:100px;">Actions</th>
              <th class="center" style="width:400px;">Project Name</th>
              <th class="center" style="width:300px;">Update time</th>
            </tr>
            <template v-for="(pj, index) in projectDisplayed">
                <tr class="opacity" :key="index" :class="{'aliceblue' : index % 2 === 0, 'antiquewhite': index % 2 === 1 }">
                  <td class="center" @click="editName(pj, index)">
                      <i v-if="editItem !== index" class="material-icons small pointer">edit</i>
                      <i v-else class="material-icons small pointer">save</i>
                  </td>
                  <td class="center">
                    <span v-if="editItem === index">
                      <el-input :id="`name`+ `${index}`" placeholder="" size="mini" style="width:250px;" v-model="pj.name"></el-input>
                    </span>
                    <span v-else>{{ pj.name }}</span>
                  </td>
                  <td class="center">{{ format(pj.updated_at) }}</td>
                </tr>
            </template>
        </table>
    </div>
    <div style="text-align:center;margin:2vh;width:100%;">
        <el-pagination background :page-size="10" layout="prev, pager, next" :total="totalProjects" :current-page.sync="current_page" ></el-pagination>
    </div>
  </div>
</template>

<script>
import ProjectService from './../Service/ProjectService'
import moment from 'moment'

export default {
  name: 'TableComponent',
  data () {
    return {
      projects: [],
      editItem: null,
      totalProjects: 0,
      current_page: 1
    }
  },
  async created () {
    this.getList()
  },
  computed: {
    projectDisplayed: function () {
      let firstProject = this.current_page + (this.current_page - 1) * 10
      return this.projects.slice(firstProject, firstProject + 10)
    }
  },
  methods: {
    format (date) {
      return moment(date).fromNow()
    },
    async getList () {
      let context = this
      ProjectService.getProjects().then(function (projects) {
        console.log('PROJECTS')
        console.log(projects)
        if (projects.data) {
          context.projects = projects.data
          context.totalProjects = projects.data.length
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    async editName (pj, index) {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{2,})')
      if ((this.editItem || this.editItem === 0) && this.editItem === index) {
        let id = 'name' + index
        let newName = document.getElementById(id).value
        // if (regex.test(newName)) {
        console.log('test ' + newName + ' ' + regex.test(newName))
        let payload = {
          id: pj.id,
          name: newName
        }
        this.changeName(payload)
        // }
      } else this.editItem = index
    },
    async changeName (payload) {
      let context = this
      ProjectService.updateProject(payload).then(function (projects) {
        if (projects.data) {
          context.projects[context.editItem].updated_at = projects.data.updated_at
        }
        context.editItem = null
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

.head{
  background-color: black;
  color: white;
  opacity: 0.8;
}

.tr{
  font-weight: 300;
}

</style>
