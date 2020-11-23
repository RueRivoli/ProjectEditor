<template>
  <div class="">
    <header-component/>
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Name</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Gender</md-table-head>
          <md-table-head>Job Title</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell md-numeric>1</md-table-cell>
          <md-table-cell>Shawna Dubbin</md-table-cell>
          <md-table-cell>sdubbin0@geocities.com</md-table-cell>
          <md-table-cell>Male</md-table-cell>
          <md-table-cell>Assistant Media Planner</md-table-cell>
        </md-table-row>
    </md-table>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent'

export default {
  name: 'HelloWorld',
  components: { HeaderComponent },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
