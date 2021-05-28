<template>
    <div class="stempty" v-if="line == ''">
        <!-- <br class="stempty"/> -->
    </div>
    <div v-else class="linepoz">
      <div class="stline" :style="exstyle" @click="openProject(line.path)"
                      @contextmenu="openFolder(line.path)">
          <div class="lineshadow">
            <div class="line">
              {{line.name}}
            </div>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'stLine',
  props: {
    line: {}
  },
  datas: function() {
    return {
      exstyle: ''
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
    var marg = 10 - Math.random() * 20
    this.exstyle = 'margin-left:' + marg + 'px;margin-right:' + -marg + 'px;';
  }
}
</script>
<style lang="stylus" scoped>
.stline
  height 30px
  margin-top -5px
  cursor pointer
  position relative
  &:hover
    z-index 20
    .line
      color black
      background-color white
    .lineshadow
      background-color red
.line
  color white
  background-color black
  margin: 5px
.lineshadow
  top 0px
  position absolute
  width 100%
  height 30px
  background-color white
.linepoz
  width 80%
  margin auto
.stempty
  height 10px
</style>
