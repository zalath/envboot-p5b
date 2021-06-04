<template>
    <div>
        <div class="move">
          <a class='fa fa-arrows'></a>
        </div>
        <div class="closebtn" @click="close()">
          <a class='fa fa-times close'></a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'closebar',
  props: {
    closetitle: String
  },
  methods: {
    close: function() {
      this.$ipc.send(this.closetitle);
    }
  }
  // clip-path polygon(0 95%,20% 10%,98% 0,94% 90%,50% 95%);
}
</script>

<style scoped lang="stylus">
.move
  height 50px
  width 60px
  right 50px
  font-size 35px
  line-height 50px
  color white
  background-color black
  position fixed
  &:hover
    background-color red
  -webkit-app-region drag
.closebtn
  position fixed
  right 10px
  background-color red
  width 60px
  height  50px
  font-size 45px
  line-height 45px
  -webkit-app-region no-drag
  &:hover
    background-color white
.close
  color black
</style>
