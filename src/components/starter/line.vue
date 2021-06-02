<template>
  <div v-if="line == ''">
  </div>
  <div v-else class="linepoz" @mouseenter="ishlight=1" @mouseleave="ishlight=0">
    <div class="whiteshadow" :style="exstyle"></div>
    <div class="stline" :style="exstyle" @click="openProject(line.path)" @contextmenu="openFolder(line.path)">
      <div class="line">
        <div class="linename">{{line.name}}</div>
        <hlight :style="'opacity:'+ishlight"></hlight>
      </div>
    </div>
  </div>
</template>
<script>
import hlight from './hlight'
export default {
  name: 'stLine',
  components: {
    hlight
  },
  props: {
    line: {}
  },
  data: function() {
    return {
      exstyle: '',
      stlLeft: 0,
      ishlight: 0
    }
  },
  methods: {
    openProject: function(path) {
      this.$ipc.send('openProject', path)
    },
    openFolder: function(path) {
      this.$ipc.send('openFolder', path)
    }
  },
  created() {
    this.stlLeft = this.$store.state.starterLineLeft
    if (this.line === '') {
      if (this.stlLeft === 40) {
        this.stlLeft = 0
      } else {
        this.stlLeft = 40
      }
      this.$store.commit('setStLL', this.stlLeft)
    }
    var marg = 5 - Math.random() * 10 + this.stlLeft
    this.exstyle += 'margin-left:' + marg + 'px;margin-right:' + -marg + 'px;'
  }
}
</script>
<style lang="stylus" scoped>
.stline
  height 30px
  cursor pointer
  z-index 10
  &:hover
    z-index 20
.line
  color white
  background-color black
  margin 0px 2%
  position absolute
  height 30px
  line-height 30px
  width 56%
  z-index 10
.linepoz
  width 60%
  margin auto
.whiteshadow
  height  50px
  background-color white
  width 60%
  position absolute
  margin -10px -10px
.linename
  position absolute
  width 100%
  z-index 30
  font-size 20px;
</style>
