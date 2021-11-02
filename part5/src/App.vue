

<template>
  <router-link to="/">hello</router-link><br>
  <router-link to="/logi">列表</router-link>
  <router-view></router-view>
</template>
<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
