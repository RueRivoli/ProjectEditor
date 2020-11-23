<template>
  <div>
    <header-component/>
    <el-main>
      <table-component/>
    </el-main>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent'
import TableComponent from './TableComponent'

export default {
  name: 'ListProjectComponent',
  components: { HeaderComponent, TableComponent },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
</style>
