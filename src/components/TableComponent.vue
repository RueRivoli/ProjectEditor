<template>
    <div>
      <div style="">
           <el-row class="m-b-5 float-l">
                <el-button id="refresh" size="mini" @click="getList()" round><i class="material-icons mini">refresh</i>Refresh</el-button>
            </el-row>
          <table class="full_width" style="height:70vh;">
            <thead>
                <tr id="header" class="head">
                  <th class="center" style="width:10vw">Actions</th>
                  <th class="center" style="width:40vw;">Project Name</th>
                  <th class="center" style="width:30vw;">Update time</th>
                </tr>
            </thead>
            <tbody style="">
                <template v-for="(pj, index) in projectDisplayed">
                    <tr class="opacity" :key="index" :class="{'aliceblue' : index % 2 === 0, 'antiquewhite': index % 2 === 1 }">
                      <td class="center" style="width:10vw"  @click="editName(pj, index)">
                          <i v-if="editItem !== index" class="material-icons small pointer">edit</i>
                          <i v-else class="material-icons small pointer">save</i>
                      </td>
                      <td class="center" style="width:40vw;">
                        <span v-if="editItem === index">
                          <el-input :id="`name`+ `${index}`" placeholder="" size="mini" style="width:250px;" v-model="newName"></el-input>
                        </span>
                        <span v-else>{{ pj.name }}</span>
                      </td>
                       <td class="center" style="width:30vw;">{{ pj.updated_at | format }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <div class="full_width center" style="margin:2vh;">
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
      newName: '',
      totalProjects: 0,
      current_page: 1
    }
  },
  async created () {
    this.getList()
  },
  computed: {
    projectDisplayed: function () {
      let firstProject = this.current_page - 1 + (this.current_page - 1) * 10
      return this.projects.slice(firstProject, firstProject + 10)
    }
  },
  filters: {
    format (date) {
      return moment(date).fromNow()
    }
  },
  methods: {
    async getList () {
      let context = this
      ProjectService.getProjects().then(function (projects) {
        if (projects.data) {
          context.projects = projects.data
          context.totalProjects = projects.data.length
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    async editName (pj, index) {
      const regex = new RegExp(/^[A-Za-z0-9\s-_+!&*()%#]{2,40}$/)
      if ((this.editItem || this.editItem === 0) && this.editItem === index) {
        // let id = 'name' + index
        // let newName = document.getElementById(id).value
        if (regex.test(this.newName)) {
          let payload = {
            id: pj.id,
            name: this.newName
          }
          this.changeName(payload)
        } else {
          this.$message.error('Project name can contain only letters, numbers, spaces and characters among: -_+!&*()%#. Length has to be between 2 and 40')
        }
      } else {
        this.editItem = index
        this.newName = pj.name
      }
    },
    async changeName (payload) {
      let context = this
      ProjectService.updateProject(payload).then(function (projects) {
        if (projects.data) {
          context.projects[context.editItem].name = projects.data.name
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

table{
    border-collapse:collapse;
    font-size:13px;
    font-weight:light;
}

.head{
  background-color: black;
  color: white;
  opacity: 0.8;
}

table tbody {
  display: block;
  max-height: 70vh;
  overflow-y: scroll;
}

table thead, table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

/* tr{
  font-weight: 300;
} */
</style>
