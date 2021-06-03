<template>
  <div id="app">
    <closebar :closetitle='closetitle'/>
    <br/>
    <div>
      <div class="tlist">
        <stLine :line="{'name':'Lb:editor / Rb:folder','path':''}"></stLine>
        <stLine v-for="(line,ind) in stList" :line="line" :key="ind"></stLine>
      </div>
    </div>
  </div>
</template>

<script>
import Closebar from '../components/closebar.vue'
import stLine from '../components/starter/line'
export default {
  name: 'App',
  components: {
    stLine,
    Closebar
  },
  data: function() {
    return {
      stList: [],
      closetitle: 'starterclose',
      stlLeft: 0
    }
  },
  created: function() {
    this.$ipc.on('starterdata', (event, e) => {
      this.initstarter(e)
    })
    this.$ipc.send('starterdata')
  },
  methods: {
    initstarter(e) {
      if (e !== null) {
        this.stList = e.starter
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.move
  height 30px
  width 100%
  background-color red
  -webkit-app-region drag
  position fixed
.tlist
  margin-top 30px
.closebtn
  position fixed
  right 0px
  background-color black
  width 30px
  height  30px
  font-size 25px
  line-height 30px
  -webkit-app-region no-drag
.close
  color red
#app
  position absolute
  background-color lightgray
  bottom 0px
  left 0px
  top 0px
  right 0px
  overflow auto
</style>
