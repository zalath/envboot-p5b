<template>
  <div class="mainwin" @mouseenter="enterd()" @mouseout="outd()">
    <div class="ab top left bottom right"></div>
    <div class="main">
      <div class="menu">
        <div class="space">
          <menubar v-for="(m,ind) in menulist" :m='m' :num='menulist.length' :order='ind' :winh2='win.H2' :winw2='win.W2' :key='ind'></menubar>
        </div>
      </div>
    </div>
    <div class="funcbtn movebox" :style="moveboxstyle"></div>
    <div class="funcbtn closebtn" :style="closebtnstyle">
      <a class='fa fa-times' @click="close()"></a>
    </div>
    <div class="funcbtn refreshbtn" :style="refreshbtnstyle">
      <a class='fa fa-refresh' @click="refresh()"></a>
    </div>
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
        },
        {
          name: 'tool',
          cmd: 'toolpage'
        }
      ],
      moveboxstyle: '',
      closebtnstyle: '',
      refreshbtnstyle: '',
      menulist: [],
      win: {
        H2: '',
        W2: ''
      }
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
      this.refreshbtnstyle = 'left:' + (this.win.W2 - 10) + 'px;top:' + (this.win.H2 - 30) + 'px;'
    },
    refresh() {
      this.menulist = []
      this.$ipc.send('initd')
      this.$ipc.on('inid', (event, e) => {
        this.menulist = this.menulist.concat(this.menu)
        this.menulist = this.menu.concat(e.menu)
        this.resizewin()
      })
      this.$ipc.on('ss', function (event, e) {
        alert(e);
        console.log(e)
      })
    },
    enterd() {
      this.$bus.emit('menubar', true);
    },
    outd() {
      this.$bus.emit('menubar', false);
    }
  },
  created() {
    this.refresh()
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
.space
  transform-style preserve-3d
  transform perspective(500px)
.bordert
  border-top solid 5px red
.borderl
  border-left solid 5px red
.borderr
  border-right solid 5px red
.borderb
  border-bottom solid 5px red
.funcbtn
  cursor pointer
  width 20px
  height 20px
  position absolute
  border-radius 50%
  background-color red
  color white
.movebox
  width 30px
  height 30px
  -webkit-app-region drag
.ab
 position absolute
</style>
