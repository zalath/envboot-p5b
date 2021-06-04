<template>
  <div id="app">
     <div id="nav">
      <!-- <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>  |
      <router-link to="/">main</router-link>  |
      <router-link to="/task">task</router-link>  |-->
    </div>
    <router-view/>
  </div>
</template>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  height 100%
  overflow auto
body
  margin 0px
.hidden
  display none
</style>
