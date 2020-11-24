<template>
      <table style="width:100%;border-collapse:collapse;font-size:13px;font-weight:light;" >
         <el-button type="primary" size="mini" @click="getList()" plain><i class="material-icons small">refresh</i>Refresh</el-button>
        <tr class="light">
          <th class="center" style="width:100px;">Actions</th>
          <th class="center" style="width:400px;">Project Name</th>
          <th class="center" style="width:300px;">Update time</th>
        </tr>
        <template v-for="(pj, index) in projects" >
            <tr :key="index" :class="{'aliceblue' : index % 2 === 0, 'antiquewhite': index % 2 === 1 }">
              <td class="center" @click="editName(pj, index)">
                  <i v-if="editItem !== index" class="material-icons mysize pointer">edit</i>
                  <i v-else class="material-icons big pointer">save</i>
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
</template>

<script>
import ProjectService from './../Service/ProjectService'
import moment from 'moment'

export default {
  name: 'TableComponent',
  data () {
    return {
      projects: [],
      editItem: null
    }
  },
  async created () {
    this.getList()
  },
  methods: {
    format (date) {
      return moment(date).fromNow()
    },
    async getList () {
      let context = this
      ProjectService.getProjects().then(function (projects) {
        if (projects.data) {
          context.projects = projects.data
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    async editName (pj, index) {
      console.log('changeIndex')
      console.log(this.editItem)
      if (this.editItem || this.editItem === 0) {
        let id = 'name' + index
        let newName = document.getElementById(id).value
        let payload = {
          id: pj.id,
          name: newName
        }
        console.log('PAYLOAD ' + payload.id + ' ' + payload.name)
        this.changeName(payload)
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
    i.big {font-size: 1.5em;}
    i.small {
      font-size: 1.0em;
      margin-right:2px;
    }
</style>
