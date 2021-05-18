<template>
  <div>
    <!-- <div>
      <a class='fa fa-times' style='color:red' @click="close()"></a>  |
      <a class='fa fa-times' @click="closewin()"></a>
    </div> -->
    <div class="main">
      <div class="menu">
        <div class="center">
          <menubar v-for="(m,ind) in menu" :m='m' :num='menu.length' :order='ind' :winh2='win.H2' :winw2='win.W2' :key='ind'></menubar>
        </div>
      </div>
    </div>
    <div class="movebox" :style="moveboxstyle"></div>
    <div class="closebtn" :style="closebtnstyle">
      <a class='fa fa-times' @click="close()"></a>
    </div>
    {{testval}}
    <div class="borderbox top left bordert borderl"></div>
    <div class="borderbox bottom left borderb borderl"></div>
    <div class="borderbox top right bordert borderr"></div>
    <div class="borderbox bottom right borderb borderr"></div>
  </div>
</template>

<script>
import menubar from '../components/main/menubar'
export default {
  name: 'Main',
  components: {
    menubar
  },
  data: function() {
    return {
      menu: [
        {
          name: 'boot',
          cmd: 'bootenv'
        }, {
          name: 'starter',
          cmd: 'starterlist'
        }, {
          name: 'task',
          cmd: 'taskpage'
        }, {
          name: 'conf',
          cmd: 'confpage'
        }
      ],
      moveboxstyle: '',
      win: {
        H2: '',
        W2: ''
      },
      testval: 0
    }
  },
  methods: {
    close() {
      this.$ipc.send('closeapp')
    },
    closewin() {
      this.$ipc.send('closewin')
    },
    resizewin() {
      this.win.H2 = document.documentElement.clientHeight / 2
      this.win.W2 = document.documentElement.clientWidth / 2
      // this.moveboxstyle = 'left:' + (this.win.W2 - 15) + 'px;top:' + (this.win.H2 - 15) + 'px;'
      this.moveboxstyle = 'left:' + (this.win.W2 - 15) + 'px;top:' + this.win.H2 + 'px;'
      this.closebtnstyle = 'left:' + (this.win.W2 - 10) + 'px;top:' + (this.win.H2 + 40) + 'px;'
    }
  },
  created() {
    this.$ipc.send('initd');
    this.$ipc.on('inid', (event, e) => {
      this.menu = this.menu.concat(e.menu);
      this.resizewin()
    })
    this.$ipc.on('ss', function (event, e) {
      alert(e);
      console.log(e)
    })
  },
  mounted() {
    const that = this
    window.onresize = function() {
      that.resizewin()
    }
  }
};
</script>
<style lang="stylus" scoped>
.top
  top 0px
.bottom
  bottom 0px
.left
  left 0px
.right
  right 0px
.borderbox
  width 30px
  height 30px
  position absolute
.bordert
  border-top solid 5px red
.borderl
  border-left solid 5px red
.borderr
  border-right solid 5px red
.borderb
  border-bottom solid 5px red
.movebox
  position absolute
  width 30px
  height 30px
  background-color red
  -webkit-app-region drag
  border-radius 50%
.closebtn
  position absolute
  width 20px
  height 20px
  border-radius 50%
  background-color red
  color white
</style>
