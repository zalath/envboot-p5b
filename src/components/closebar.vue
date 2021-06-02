<template>
    <div>
        <div class="move"></div>
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
}
</script>

<style scoped lang="stylus">
.move
  height 30px
  width 100%
  background-color red
  -webkit-app-region drag
  position fixed
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
