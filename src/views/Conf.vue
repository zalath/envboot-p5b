<template>
  <div id="app">
    <div class="move"></div>
    <div class="closebtn" @click="close()">
      <a class='fa fa-times close'></a>
    </div>
    <br/>
    <div>
      <div class="tlist">
        <h1>starter</h1>
        <div v-for='(s,ind) in config.starter' :key='ind'>
          <div v-if='s != ""'>
            <span>{{ind}}:</span>
            <input @change='changeval($event,"starter",ind,"name")' :value='s.name'/>
            <input @change='changeval($event,"starter",ind,"path")' :value='s.path'/>
            <div class="fa fa-minus funcbtn" @click="del('starter',ind)"></div>
          </div>
          <div v-else></div>
        </div>
        <br/>
        <div>
          <div class="fa fa-plus funcbtn" @click="add('starter')"></div>
        </div>
        <h1>menu</h1>
        <div v-for='(s,ind) in config.menu' :key='ind'>
          <span>{{ind}}:</span>
          <input @change='changeval($event,"menu",ind,"name")' :value='s.name'/>
          <input @change='changeval($event,"menu",ind,"url")' :value='s.url'/>
          <div class="fa fa-minus funcbtn" @click="del('menu',ind)"></div>
          <!-- <div>{{s.name}}:{{s.id}}:{{s.url}}</div> -->
        </div>
        <br/>
        <div>
          <div class="fa fa-plus funcbtn" @click="add('menu')"></div>
        </div>
        <h1>boot</h1>
        <div v-for='(s,ind) in config.boot' :key='ind'>
          <span>{{ind}}:</span>
          <input @change='changeval($event,"boot",ind,"")' :value='s'/>
          <div class="fa fa-minus funcbtn" @click="del('boot',ind)"></div>
        </div>
        <br/>
        <div>
          <div class="fa fa-plus funcbtn" @click="add('boot')"></div>
        </div>
      </div>
    </div>
    <div class="fa fa-check" @click="setconf()"></div>
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
    add(type) {
      switch (type) {
      case 'starter':
        this.config.starter.push({name: '', path: ''})
        break
      case 'menu':
        this.config.boot.push({name: '', url: ''})
        break
      case 'boot':
        this.config.boot.push('')
        break
      }
    },
    setconf() {
      var c = JSON.parse(JSON.stringify(this.config))
      this.$ipc.send('setconf', c)
    },
    changeval(e, part, ind, col = '') {
      if (col === '') {
        this.config[part][ind] = e.target.value
      } else {
        this.config[part][ind][col] = e.target.value
      }
    },
    del(type, i) {
      switch (type) {
      case 'starter':
        this.config.starter.splice(i, 1)
        break
      case 'menu':
        this.config.menu.splice(i, 1)
        break
      case 'boot':
        this.config.boot.splice(i, 1)
        break
      }
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
.funcbtn
  margin-left 10px
  cursor pointer
</style>
