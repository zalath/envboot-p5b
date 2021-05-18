<template>
  <div class="menubarbox" :style="style" @click='handle()'>
    <div class="menubarscale">
      <div class="menubarshadow msred" :style="shadowdstyle"></div>
      <div class="menubarshadow msblack" :style="shadowstyle"></div>
      <div :class="barclass+' menubar'" :style="barstyle">{{ m.name }}</div>
    </div>
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
      shadowdstyle: '',
      barstyle: '',
      barclass: '',
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
      var angleval = Math.floor(360 / this.num) * this.order
      var angle = Math.PI * angleval / 180
      var y = Math.sin(angle)
      var x = Math.cos(angle)
      var rst = Math.random() * 100
      if (x > 0) {
        this.formright(W2, x, rst)
      } else {
        this.formleft(W2, x, rst)
      }
      var pre = -1
      if ((angleval > 90 && angleval < 180) || (angleval > 270 && angleval < 360)) {
        pre = 1
      }
      var ypre = 1
      if ((angleval > 0 && angleval < 180)) {
        ypre = -1
      }
      this.style += ' top:' + (H2 - (ypre + 40) * y) + 'px;'
      while (angleval >= 90) {
        angleval = angleval - 90
      }
      this.style += 'transform:rotate(' + pre * angleval / 2 + 'deg);'
      var ry = (20 + 10 * Math.random()) * (2 - Math.random() * 4)
      var rx = (20 + 10 * Math.random()) * (2.5 - Math.random() * 5)
      this.shadowstyle += 'transform:rotateY(' + ry + 'deg) rotateX(' + rx + 'deg) perspective(50px);'
      ry = (10 + 10 * Math.random()) * (2 - Math.random() * 4)
      rx = (10 + 40 * Math.random()) * (2 - Math.random() * 4)
      this.shadowdstyle += 'transform:rotateY(' + ry + 'deg) rotateX(' + rx + 'deg) perspective(50px);'
      var rw = Math.random() * 100 + 200
      this.shadowdstyle += 'background-color:red;width:' + rw + 'px;position:absolute;top:0px;'
    },
    formleft(W2, x, rst) {
      this.style += 'right:' + (W2 + Math.abs(x) + 20) + 'px;transform-origin:right;'
      this.barclass = 'menubarleft'
      this.shadowstyle += 'clip-path: polygon(0 0, 70% 0, 100% ' + rst + '%, 40% 100%,0% 100%);'
      this.shadowstyle += 'right:0px;'
      this.shadowdstyle += 'right:0px;'
    },
    formright(W2, x, rst) {
      this.style += 'left:' + (W2 + Math.abs(x) + 20) + 'px;transform-origin:left;'
      this.barclass = 'menubarright'
      this.shadowstyle += ''
      this.shadowstyle += 'clip-path: polygon(0 ' + rst + '%, 30% 0, 100% 0, 100% 100%,40% 100%);'
    }
  },
  created() {
    this.getposition()
  },
  watch: {
    winh2: function(newval, oldval) {
      this.getposition()
    },
    winw2: function(newval, oldval) {
      this.getposition()
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
  &:hover
    .msblack
    .menubar
      color red
.menubar
  top 0px
  line-height 40px
  font-family berlin
  color white
  position absolute
.menubarscale
  position relative
.menubarshadow
  width 200px
  height 40px
  background-color black
.menubarleft
  text-shadow:1px 0px #111,
              -1px 0px #111,
              -2px 0px #111
  padding-left 20px
.menubarright
  text-shadow -1px 0px #111,
              1px 0px #111,
              2px 0px #111
  padding-right 20px
  right 0px
@font-face
  font-family berlin
  src url(../../../src/assets/berlin.ttf)
@keyframes shake {
  0% {
  }
}
</style>
