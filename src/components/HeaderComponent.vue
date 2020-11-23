<template>
    <div class="md-layout" style="">
      <div class="md-layout-item"></div>
      <div class="md-layout-item"></div>
      <div class="md-layout-item">Login</div>
  </div>
</template>

<script>

export default {
  name: 'HeaderComponent',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .md-layout{
    line-height: 40px;
  }

  .md-layout-item {
    height: 40px;
    background-color:grey;
  }

</style>
