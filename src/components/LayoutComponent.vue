<template>
  <div>
    <header-component/>
    <el-main>
      <table-component v-if="authentificated"/>
    </el-main>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent'
import TableComponent from './TableComponent'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'LayoutComponent',
  components: { HeaderComponent, TableComponent },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      username: 'GET_USERNAME',
      authentificated: 'GET_AUTH'
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
</style>
