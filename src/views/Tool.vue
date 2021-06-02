<template>
  <div id="app">
    <closebar :closetitle="closetitle" />
    <br/>
    <div>
      <input ref="inputCopy" value="for copy" style="opacity:0;position:absolute" />
      <div class="tlist">
        <div class="tbox">
          <h1>TIME</h1>
          <div>
            {{timestamps}}
            <a class="fa fa-copy" @click="copy(timestamps)"></a>
            <br/>
            {{timestamp}}
            <a class="fa fa-copy" @click="copy(timestamp)"></a>
            <br/>
            {{dateval}}
            <a class="fa fa-copy" @click="copy(dateval)"></a>
            <br/>
            <input class="wNine" v-model="dateval" /><br/>
            <a title='convert' class='fa fa-calendar-check-o' @click="convert()"></a>
            <br/>
            <a title='refresh' class='fa fa-refresh' @click="settime()"></a>
          </div>
        </div>
        <div class="tbox">
          <h1>base64</h1>
          <div>
            <input v-model="debase64val"/>
            <a class="fa fa-cog" @click="base64()"></a>
            <br />
            <input v-model="base64val"/>
            <a class="fa fa-cog" @click="debase64()"></a>
          </div>
          <h1>url</h1>
          <div>
            <input :value="deurlval" @change="url()" />
            <input :value="urlval" @change="deurl()" />
          </div>
          <h1>md5</h1>
          <div>
            <input v-model="md5str" />
            <a class="fa fa-cog" @click="md5()"></a>
            <a class="fa fa-copy" @click="copy(md5str)"></a>
          </div>
        </div>
      </div>
      <div class="tlist">
        <h1>JSON</h1>
        <div v-if='!jsonpage'>
          <a title='convert' class='fa fa-indent' @click='jsonconvert()'></a>
          <br/>
          <textarea rows="15" class="wNine" v-model='jsonstr' />
        </div>
        <div v-if='jsonpage'>
          <a class="fa fa-times" @click="jsonpage = !jsonpage"></a>
          <br/>
          <pre class="tl wNine ma">{{jsonstrd}}</pre>
        </div>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
import Closebar from '../components/closebar.vue'
import md5 from 'js-md5'
const base64 = require('js-base64').Base64;
// import Cb from 'clipboard'
export default {
  name: 'Tool',
  components: {
    Closebar
  },
  data: function() {
    return {
      dateval: '',
      timestamp: '',
      timestamps: '',
      jsonstr: '',
      jsonstrd: '',
      jsonpage: false,
      closetitle: 'toolclose',
      base64val: '',
      debase64val: '',
      urlval: '',
      deurlval: '',
      md5str: ''
    }
  },
  created: function() {
    this.settime()
  },
  methods: {
    settime: function() {
      this.timestamp = new Date().valueOf()
      this.timestamps = parseInt(this.timestamp / 1000)
      this.dateval = this.datefmt(new Date())
    },
    convert: function() {
      this.timestamp = Date.parse(this.dateval)
      this.timestamps = Date.parse(this.dateval) / 1000
      if (isNaN(this.timestamp)) {
        this.timestamps = this.datefmt(new Date(this.dateval * 1000))
      }
    },
    jsonconvert: function() {
      this.jsonstrd = JSON.parse(this.jsonstr)
      this.jsonpage = true
    },
    copy: function(text) {
      const input = this.$refs.inputCopy
      input.value = text
      input.select()
      document.execCommand('copy')
    },
    datefmt(date) {
      var fmt = 'yyyy-MM-dd hh:mm:ss'
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ''));
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
      return fmt;
    },
    base64: function() {
      this.debase64val = base64.encode(this.base64val)
    },
    debase64: function() {
      this.base64val = base64.decode(this.debase64val)
    },
    url: function() {
      this.urlval = encodeURIComponent(this.deurlval)
    },
    deurl: function() {
      this.deurlval = decodeURIComponent(this.urlval)
    },
    md5: function() {
      this.md5str = md5(this.md5str)
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
.wNine
  width 90%
.tl
  text-align left
.ma
  margin auto
</style>
