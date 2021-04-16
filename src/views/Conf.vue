<template>
  <div id="app">
    <div class="move"></div>
    <div class="closebtn" @click="close()">
      <a class='fa fa-times close'></a>
    </div>
    <br/>
    <div>
      <div class="tlist">
        <div v-for='(s,ind) in config.starter' :key='ind'>
          <div v-if='s != ""'>{{s.name}}:{{s.path}}</div>
          <br v-else />
        </div>
        <div>
          <div @click="addstarter()">add starter</div>
        </div>
        <div v-for='(s,ind) in config.menu' :key='ind'>
          <div>{{s.name}}:{{s.id}}:{{s.url}}</div>
        </div>
        <div v-for='(s,ind) in config.boot' :key='ind'>
          <div>{{s}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Conf',
  components: {
  },
  data: function() {
    return {
      config: {}
    }
  },
  created: function() {
    this.$ipc.on('confdata', (event, e) => {
      this.initstarter(e)
    })
    this.$ipc.send('confdata')
    this.$ipc.on('confsaved', (event, e) => {
      alert('saved');
    })
  },
  methods: {
    close: function() {
      this.$ipc.send('confclose');
    },
    initstarter(e) {
      if (e !== null) {
        this.config = e
      }
    },
    addstarter() {
      this.config.starter.push({});
    },
    setconf() {
      this.$ipc.send('setconf', this.config)
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
.tlist
  margin-top 30px
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
