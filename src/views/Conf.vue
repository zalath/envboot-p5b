<template>
  <div id="app">
    <closebar :closetitle="closetitle"/>
    <triback />
    <div class="tlist">

      <h2>starter</h2>
      <div v-for='(s,ind) in config.starter' :key='ind'>
        <div v-if='s != ""'>
          <span>{{ind}}:</span>
          <input @change='changeval($event,"starter",ind,"name")' :value='s.name'/>
          <input @change='changeval($event,"starter",ind,"path")' :value='s.path'/>
          <div class="fa fa-minus funcbtn" @click="del('starter',ind)"></div>
          <div v-if="ind>0 && isCanEmtpyLine" class="fa fa-reply funcbtn" @click="emptyline(ind)"></div>
          <i class="hidden">{{isCanEmtpyLine=true}}</i>
        </div>
        <div v-else>
          <span>{{ind}}:</span>
          <div class="fa fa-minus funcbtn" @click="del('starter',ind)"></div>
          <i class="hidden">{{isCanEmtpyLine=false}}</i>
        </div>
      </div>
      <br/>
      <div>
        <div class="fa fa-plus funcbtn" @click="add('starter')"></div>
      </div>

      <h2>menu</h2>
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

      <h2>boot</h2>
      <div v-for='(s,ind) in config.boot' :key='ind'>
        <span>{{ind}}:</span>
        <input @change='changeval($event,"boot",ind,"")' :value='s'/>
        <div class="fa fa-minus funcbtn" @click="del('boot',ind)"></div>
      </div>
      <br/>
      <div>
        <div class="fa fa-plus funcbtn" @click="add('boot')"></div>
      </div>
      <div class="fa fa-check" @click="setconf()"></div>
    </div>
  </div>
</template>

<script>
import Closebar from '../components/closebar.vue'
import Triback from '../components/triback.vue'
export default {
  name: 'Conf',
  components: {
    Closebar,
    Triback
  },
  data: function() {
    return {
      config: {},
      closetitle: 'confclose',
      isCanEmtpyLine: false
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
    },
    emptyline(i) {
      this.config.starter.splice(i, 0, '');
    }
  }
}
</script>

<style scoped lang="stylus">
.tlist
  position absolute
  width 90%
  height 85%
  margin 5%
  overflow auto
.funcbtn
  margin-left 10px
  cursor pointer
</style>
