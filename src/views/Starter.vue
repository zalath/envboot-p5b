<template>
  <div id="app">
    <div class="move"></div>
    <div class="closebtn" @click="close()">
      <a class='fa fa-times close'></a>
    </div>
    <br/>
    <div>
      <div class="tlist">
        <stLine v-for="(line,ind) in stList" :line="line" :key="ind"></stLine>
      </div>
    </div>
  </div>
</template>

<script>
import stLine from '../components/starter/line'
export default {
  name: 'App',
  components: {
    stLine
  },
  data: function() {
    return {
      stList: []
    }
  },
  created: function() {
    this.$ipc.on('starterdata', (event, e) => {
      this.initstarter(e)
    })
    this.$ipc.send('starterdata')
  },
  methods: {
    close: function() {
      this.$ipc.send('starterclose');
    },
    initstarter(e) {
      if (e !== null) {
        this.stList = e.starter
      }
      console.log(e)
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
</style>
