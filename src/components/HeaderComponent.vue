<template>
  <div>
    <el-header class="header pointer">
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">Login</el-button>
    </el-header>
        <el-dialog title="Login" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="Username" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
           <el-form-item label="Password" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Annuler</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">Login</el-button>
        </span>
      </el-dialog>
   </div>
</template>

<script>

export default {
  name: 'HeaderComponent',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '150px',
      form: {
        username: '',
        password: ''

      }
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
