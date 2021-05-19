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
        </div>
        <h1>JSON</h1>
        <div>
        </div>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tool',
  components: {
  },
  data: function() {
    return {
      config: {}
    }
  },
  created: function() {
  },
  methods: {
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
