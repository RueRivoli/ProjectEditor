<template>
  <div>
    <el-header class="header pointer">
      <span class="float-l">Phrase - Projects Editor</span>
      <el-button v-if="authenticated" type="text" size="mini" style="color:white;" @click="logOut()"><i class="material-icons mini">forward</i>Log out</el-button>
      <el-button id="login" v-else type="text" size="mini" @click="dialogFormVisible = true" style="color:white;">Login</el-button>
    </el-header>
    <el-dialog title="Login" :visible.sync="dialogFormVisible">
      <el-form name="registration" ref="registration" label-position="top" :model="registration" :rules="rulesRegistration" enctype="multipart/form-data">
        <el-form-item label="Username" prop="username" :label-width="formLabelWidth">
          <el-input type="text" v-model="registration.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" label-width="formLabelWidth">
          <el-input type="password" :show-password="true" v-model="registration.password" required autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button id="cancel" @click="dialogFormVisible = false">Annuler</el-button>
        <el-button id="submit" type="text" @click="login()">Login</el-button>
      </span>
    </el-dialog>
   </div>
</template>

<script>

import AuthService from './../Service/AuthService'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '150px',
      registration: {
        username: '',
        password: ''
      },
      rulesRegistration: {
        username: [
          { required: true, message: 'Please input your username', trigger: 'blur' },
          { min: 3, max: 50, message: 'Length should be between 3 and 50', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter a password', trigger: 'blur' },
          { pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+!*$@%_])([a-zA-Z0-9-+!*$@%_]{6,30})$',
            message: 'Between 6 and 30 characters, at least one uppercase, one lowercase, one figure, a special character among -+!*$@%_',
            trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'GET_AUTH'
    })
  },
  methods: {
    login () {
      this.$refs['registration'].validate((valid) => {
        if (!valid) {
          return false
        }
        let context = this
        AuthService.logUser(this.registration).then(function (data) {
          console.log('LOGIN RETURN')
          console.log(data)
          if (data.status === 201) {
            localStorage.token = data.data.token
            context.$store.commit('AUTH', true)
          }
          context.dialogFormVisible = false
        })
      })
    },
    logOut () {
      localStorage.token = ''
      this.$store.commit('AUTH', false)
    }
  }
}
</script>

<style>
  .header{
    margin-bottom:5px;
    height:7vh !important;
    line-height:7vh;
    background-color:#409EFF;
    text-align:right;
    color:white;
  }
</style>
