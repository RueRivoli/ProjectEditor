<template>
  <div>
    <el-header class="header pointer">
      <el-button v-if="authentificated" type="warning" size="mini">Logout</el-button>
      <el-button v-else type="primary" size="mini" @click="dialogFormVisible = true">Login</el-button>
    </el-header>
    <el-dialog title="Login" :visible.sync="dialogFormVisible">
      <el-form :model="registration">
        <el-form-item label="Username" :label-width="formLabelWidth">
          <el-input v-model="registration.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input :show-password="true" v-model="registration.password" required autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Annuler</el-button>
        <el-button type="primary"  @click="login()">Login</el-button>
      </span>
    </el-dialog>
   </div>
</template>

<script>

import AuthService from './../Service/AuthService'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'HeaderComponent',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '150px',
      registration: {
        username: '',
        password: ''

      }
    }
  },
  computed: {
    ...mapGetters({
      authentificated: 'GET_AUTH'
    })
  },
  methods: {
    login () {
      let context = this
      AuthService.logUser(this.registration).then(function (data) {
        console.log('RETOUR LOGIN')
        console.log(data)
        if (data.status === 201) {
          localStorage.token = data.data.token
          context.$store.commit('AUTH', true)
        }
        context.dialogFormVisible = false
      })
    }
  }
}
</script>

<style>
  .header{
    margin-bottom:5px;
    height:40px !important;
    line-height:40px;
    background-color:#409EFF;
    text-align:right;
    color:white;
  }
</style>
