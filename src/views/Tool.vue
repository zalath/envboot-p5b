<template>
  <div id="app">
    <div class="move"></div>
    <div class="closebtn" @click="close()">
      <a class='fa fa-times close'></a>
    </div>
    <br/>
    <div>
      <div class="tlist">
        <h1>TIME</h1>
        <div>
          {{timestamps}}
          <br/>
          {{timestamp}}
          <br/>
          {{dateval}}
          <br/>
          <input class="wNine" v-model="dateval" /><br/>
          <a title='convert' class='fa fa-calendar-check-o' @click="convert()"></a>
          <br/>
          <a title='refresh' class='fa fa-refresh' @click="settime()"></a>
        </div>
        <h1>JSON</h1>
        <div v-if='!jsonpage'>
          <a title='convert' class='fa fa-indent' @click='jsonconvert()'></a>
          <br/>
          <textarea rows="15" class="wNine" v-model='jsonstr' />
        </div>
        <div v-if='jsonpage'>
          <a class="fa fa-times" @click="jsonpage = !jsonpage"></a>
          <pre class="tl wNine ma">{{jsonstrd}}</pre>
        </div>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
// import Cb from 'clipboard'
export default {
  name: 'Tool',
  components: {
  },
  data: function() {
    return {
      dateval: '',
      timestamp: '',
      timestamps: '',
      jsonstr: '',
      jsonstrd: '',
      jsonpage: false
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
        this.timestamps = Date(this.dateval)
      }
    },
    jsonconvert: function() {
      this.jsonstrd = JSON.parse(this.jsonstr)
      console.log(this.jsonstrd)
      this.jsonpage = true
    },
    copy: function(cls) {
      // var clipboard = new Cb('.' + cls)
      // clipboard.on('success', (e) => {
      // })
    },
    close: function() {
      this.$ipc.send('confclose');
    },
    datefmt(date) {
      var fmt = 'yyyy-MM-dd hh:mm:ss'
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ''));
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
      return fmt;
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
