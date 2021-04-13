<template>
  <div>
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>  |
      <router-link to="/main">main</router-link>  |
      <router-link to="/">task</router-link>  |
      <a class='fa fa-times' @click="close()"></a>
      <a class='fa fa-times' @click="closewin()"></a>

    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    close() {
      this.$ipc.send('closeapp')
    },
    closewin() {
      this.$ipc.send('closewin')
    }
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
