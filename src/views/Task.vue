<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <win :title="'t2'"/>
    <edit/>
  </div>
</template>

<script>
import win from '../components/task/win'
import edit from '../components/task/edit'
export default {
  name: 'App',
  components: {
    win,
    edit
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: SimSun;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
