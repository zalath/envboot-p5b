<template>
  <div>
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
import menubar from '../components/p5/menubar'
export default {
  name: 'Main',
  components: {
    menubar
  },
  data: function() {
    return {
      menu: [
        {
          name: 'boot'
        }, {
          name: 'starter'
        }, {
          name: 'task'
        }
      ]
    }
  },
  methods: {},
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
