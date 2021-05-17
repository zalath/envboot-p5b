<template>
  <div class="menubarbox" :style="style">
    <div class="menubar" :style="barstyle" @click='handle()'>{{ m.name }}</div>
    <!-- -{{order}}/{{num}}《{{tangle}}。{{td}}。 -->
    <div class="menubarshadow" :style="shadowstyle"></div>
  </div>
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
      style: '',
      shadowstyle: '',
      barstyle: '',
      myorder: 0,
      tangle: 0,
      td: 0
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
      var r = 1
      var d = Math.floor(360 / this.num)
      var angleval = d * this.order
      this.tangle = angleval
      var angle = Math.PI * angleval / 180
      var y = r * Math.sin(angle)
      var x = r * Math.cos(angle)
      if (x > 0) {
        this.style += 'left:' + (W2 + Math.abs(x)) + 'px;transform-origin:left;'
        this.barstyle += 'padding-left:50px;'
        this.shadowstyle += 'clip-path: polygon(0 50%, 97% 0, 100% 97%);'
      } else {
        this.style += 'right:' + (W2 + Math.abs(x)) + 'px;transform-origin:right;'
        this.barstyle += 'padding-right:50px;'
        this.shadowstyle += 'clip-path: polygon(0 0%, 100% 50%, 0% 97%);right:0px'
      }
      this.style += ' top:' + (H2 - y) + 'px;'
      var pre = -1
      if ((angleval > 90 && angleval < 180) || (angleval > 270 && angleval < 360)) {
        pre = 1
      }
      while (angleval >= 90) {
        angleval = angleval - 90
      }
      this.style += 'transform:rotate(' + pre * angleval + 'deg);'
      this.td = pre * angleval
    },
    getform: function() {
    }
  },
  created() {
    this.getposition()
    this.getform()
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
.menubarbox
  font-size 40px
  position absolute
  line-height 40px
  cursor pointer
.menubarshadow
  height 30px
  width 200px
  float left
  background-color black
  &:hover
    background-color red
.menubar
  float left
  font-family berlin
  color black
@font-face
  font-family berlin
  src url(../../../src/assets/berlin.ttf)
</style>
