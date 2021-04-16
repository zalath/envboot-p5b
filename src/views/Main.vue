<template>
  <div>
    <div class="move"></div>
    <div>
      <a class='fa fa-times' style='color:red' @click="close()"></a>  |
      <a class='fa fa-times' @click="closewin()"></a>
    </div>
    <div class="main">
      <div class="menu">
        <div class="center">
          <menubar v-for="(m,ind) in menu" :m='m' :num='menu.length' :order='ind' :key='ind'></menubar>
        </div>
      </div>
    </div>
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
      ]
    }
  },
  methods: {
    close() {
      this.$ipc.send('closeapp')
    },
    closewin() {
      this.$ipc.send('closewin')
    }
  },
  created() {
    this.$ipc.send('initd');
    this.$ipc.on('inid', (event, e) => {
      this.menu = this.menu.concat(e.menu);
    })
    this.$ipc.on('ss', function (event, e) {
      alert(e);
      console.log(e);
    })
  }
};
</script>
<style lang="stylus" scoped>
.move
  height 10px
  width 100%
  background-color red
  -webkit-app-region drag
</style>
