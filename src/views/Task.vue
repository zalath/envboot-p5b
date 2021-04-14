<template>
  <div id="app">
    <div class="move"></div>
    <div class="closebtn" @click="close()">
      <a class='fa fa-times close'></a>
    </div>
    <br/>
    <div>
      <div class="tlist">
        <win :title="'t2'"/>
        <edit/>
      </div>
    </div>
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
  },
  methods: {
    close: function() {
      this.$ipc.send('taskclose');
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
