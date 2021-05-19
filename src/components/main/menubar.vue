<template>
  <div class="menubarbox" :style="style" @click='handle()'>
    <transition :name="barboxname">
    <div class="menubarscale" v-if="is">
      <div class="menubarshadow msred" :style="redstyle"></div>
      <div class="menubarshadow msblack" :style="shadowstyle"></div>
      <div :class="barclass+' menubar'" :style="barstyle">{{ m.name }}</div>
    </div>
    </transition>
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
      redstyle: '',
      barstyle: '',
      barclass: '',
      barboxname: '',
      myorder: 0,
      tangle: 0,
      td: 0,
      is: true
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
        this.right(W2, x)
      } else {
        this.left(W2, x)
      }
      var ypre = 1
      if ((angleval > 0 && angleval < 180)) {
        ypre = -1
      }
      this.style += ' top:' + (H2 - (ypre + 40) * y) + 'px;'
      this.topNangle(angleval)
      this.shadow()
    },
    shadow() {
      var c = 1 - Math.random() * 2
      var ry = 10 + 60 * c
      var rx = 10 + 60 * (c / Math.abs(c) * (1 - Math.abs(c)))
      this.shadowstyle += 'transform:rotateY(' + ry + 'deg) rotateX(' + rx + 'deg);';
      c = 1 - Math.random() * 2
      ry = 10 + 60 * c
      rx = 60 + 20 * (c / Math.abs(c) * (1 - Math.abs(c)))
      this.redstyle += 'transform:rotateY(' + ry + 'deg) rotateX(' + rx + 'deg);';
      this.redstyle += 'background-color:red;width:' + (200 + 100 * Math.random()) + 'px;position:absolute;top:5px;height:30px;';
    },
    left(W2, x) {
      this.style += 'right:' + (W2 + Math.abs(x) + 20) + 'px;transform-origin:right;'
      this.barclass = 'menubarleft';
      this.shadowstyle += 'right:0px;'
      var pin = 100 * Math.random()
      this.shadowstyle += 'clip-path:polygon(0 0, 100% ' + pin + '%, 0 100%);'
      this.redstyle += 'right:0px;'
      this.redstyle += 'clip-path:polygon(0 0, 100% ' + pin + '%, 0 100%);'
      this.barboxname = 'barboxr';
    },
    right(W2, x) {
      this.style += 'left:' + (W2 + Math.abs(x) + 20) + 'px;transform-origin:left;'
      this.barclass = 'menubarright';
      var pin = 100 * Math.random()
      this.shadowstyle += 'clip-path:polygon(0 ' + pin + '%, 100% 0, 100% 100%);'
      this.redstyle += 'clip-path:polygon(0 ' + pin + '%, 100% 0, 100% 100%);'
      this.barboxname = 'barboxl';
    },
    topNangle(angleval) {
      if (angleval <= 90) {
        angleval = -angleval
      }
      if (angleval > 90 && angleval <= 180) {
        angleval = 180 - angleval
      }
      if (angleval > 180 && angleval <= 270) {
        angleval = 270 - angleval - 90
      }
      if (angleval > 270 && angleval <= 360) {
        angleval = 90 - (angleval - 270)
      }
      this.style += 'transform:rotateZ(' + angleval + 'deg) rotateY(' + (20 + 10 * Math.random()) + 'deg);'
    },
    setis(e) {
      this.is = e
    }
  },
  created() {
    this.getposition()
    this.$bus.on('menubar', this.setis)
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
<style scoped>
.barboxl-enter-active {
  animation: barboxl .1s;
}
.barboxl-leave-active {
  animation: barboxl .1s reverse;
}
@keyframes barboxl {
  0% {
    transform-origin: left;
    transform: scale(0);
  }
  100% {
    transform-origin: left;
    transform: scale(1);
  }
}
.barboxr-enter-active {
  animation: barboxr .1s;
}
.barboxr-leave-active {
  animation: barboxr .1s reverse;
}
@keyframes barboxr {
  0% {
    transform-origin: right;
    transform: scale(0);
  }
  100% {
    transform-origin: right;
    transform: scale(1);
  }
}
</style>
<style scoped lang="stylus">
.menubarbox
  font-size 40px
  position absolute
  line-height 40px
  cursor pointer
  &:hover
    .msblack
      border 2px solid white
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
  text-shadow:3px 3px #111,
              -3px -3px #111,
              -3px 3px #111,
              3px -3px #111
  padding-left 20px
.menubarright
  text-shadow 3px 3px #111,
              -3px -3px #111,
              3px -3px #111,
              -3px 3px #111
  padding-right 20px
  right 0px
@font-face
  font-family berlin
  src url(../../../src/assets/berlin.ttf)
</style>
