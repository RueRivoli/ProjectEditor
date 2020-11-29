<template>
  <div>
    <header-component/>
    <el-main :class="{'all_screen': authenticated}" style="border: 1px solid black;">
      <table-component v-if="authenticated"/>
      <span id="message" v-else>Welcome to this projects editor, you can log in on the top-right corner</span>
    </el-main>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent'
import TableComponent from './TableComponent'
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutComponent',
  components: { HeaderComponent, TableComponent },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'GET_AUTH'
    })
  }

}
</script>

<style></style>
