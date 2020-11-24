<template>
      <table style="width:100%;border-collapse:collapse;font-size:13px;font-weight:light;" >
        <tr class="light">
          <th class="center">ID</th>
          <th class="center">Project Name</th>
          <th class="center">Update time</th>
        </tr>
        <template v-for="(pj, index) in projects" >
            <tr :key="index" :class="{'aliceblue' : index % 2 === 0, 'antiquewhite': index % 2 === 1 }">
              <td class="center">{{ pj.id }}</td>
              <td class="center">{{ pj.name }}</td>
              <td class="center">{{ format(pj.updated_at) }}</td>
            </tr>
        </template>
    </table>
</template>

<script>
import ProjectService from './../Service/ProjectService'
import moment from 'moment';

export default {
  name: 'TableComponent',
  data () {
    return {
      projects: [
        {
          id: 1, name: 'Project 1', time: 'three days ago'
        },
        {
          id: 2, name: 'Project 3', time: 'one month ago'
        },
        {
          id: 3, name: 'Project 3', time: 'two weeks ago'
        },
        {
          id: 4, name: 'Project 4', time: 'one week ago'
        }
      ]
    }
  },
  async created () {
    let context = this
    ProjectService.getProjects().then(function (pjs) {
      if (pjs.data) {
        console.log('PROJECTS')
        console.log(pjs)
        context.projects = pjs.data
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    format (date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    center{
        text-align: center;
    }
   /* tr{
    border-bottom:1px solid black;
    } */
</style>
