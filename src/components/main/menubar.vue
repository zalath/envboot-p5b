<template>
    <div :class="classpart + ' menubar'" :style="style" @click='handle()'>{{ m.name }}-{{order}}-{{num}}</div>
</template>

<script>
export default {
  name: 'menubar',
  props: {
    m: {},
    order: Number,
    num: Number,
    winw2: Number,
    winh2: Number
  },
  data: function() {
    return {
      classpart: '',
      style: '',
      myorder: 0
    }
  },
  methods: {
    handle: function() {
      if (this.m.url) {
        this.$ipc.send('tobrowser', this.m.url);
      } else {
        console.log(this.m.cmd);
        this.$ipc.send(this.m.cmd);
      }
    },
    getposition: function() {
      this.style = '';
      var H2 = document.documentElement.clientHeight / 2
      var W2 = document.documentElement.clientWidth / 2
      var r = 60
      var min = 0
      H2 < W2 ? min = H2 : min = W2
      if (r > min) r = min
      var d = Math.floor(360 / this.num)
      var angle = d * this.order
      var x = 1
      var y = 1
      if (angle > 180) x = -1
      if (angle > 90 && angle < 270) y = -1
      angle = Math.PI * (angle / 360)
      x = x * r * Math.sin(angle)
      y = y * r * Math.cos(angle)
      if (x > 0) {
        this.style += ' right:' + (W2 + Math.abs(x)) + 'px;'
      } else {
        this.style += ' left:' + (W2 + Math.abs(x)) + 'px;'
      }
      this.style += ' top:' + (H2 + y) + 'px;'
    }
  },
  created() {
    // count every line's position and style
    // position
    this.getposition()
    // style
    // if (this.order % 2 === 0) {
    // this.classpart = 'menubarleft';
    // } else this.classpart = 'menubarright';
    // this.style = ''
  },
  watch: {
    winh2: function(newval, oldval) {
      this.getposition();
    },
    winw2: function(newval, oldval) {
      this.getposition();
    }
  }
};
</script>
<style scoped lang="stylus">
.menubar
  position absolute
  line-height 30px
  cursor pointer
  &:hover
    background-color red
    color white
.menubarleft
  right 60%
.menubarright
  left 60%
</style>
