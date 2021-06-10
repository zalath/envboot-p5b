<template>
  <div id="app">
    <closebar :closetitle="closetitle" />
    <triback />
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
import Closebar from '../components/closebar.vue'
import Triback from '../components/triback.vue'
export default {
  name: 'App',
  components: {
    win,
    edit,
    Closebar,
    Triback
  },
  data: function() {
    return {
      closetitle: 'taskclose'
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
  position absolute
  top 50px
  left 5%
  right 5%
  bottom 5%
  overflow auto
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
