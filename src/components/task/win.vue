<template>
  <div class='space'>
    <div>
      <a class='tik tikall' @click='withtik(-1)' />
      <a class='tik tik0' @click='withtik(0)' />
      <a class='tik tik1' @click='withtik(1)' />
      <a class='tik tik2' @click='withtik(2)' />
      <a class='tik fa fa-plus' @click='add()' />
    </div>
    <lin v-for='(lin) in lins' :lin='lin' :key='lin.id'/>
  </div>
</template>
<script>
import lin from './lin';
import req from '../../com/js/vueex/req';
export default {
  name: 'home',
  props: {
    title: String
  },
  components: {
    lin
  },
  data: function() {
    return {
      pid: 0,
      lins: {}
    }
  },
  created: function() {
    this.getlins();
    this.$bus.on('new0', this.donew)
    this.$bus.on('edit0', this.doedit)
    this.$bus.on('del0', this.dodel)
  },
  methods: {
    getlins() {
      // console.log(this.pid);
      req.post('list', { id: this.pid }).then((res) => {
        // console.log(res)
        this.lins = res.data;
      });
    },
    withtik(tik) {
      this.$bus.emit('withtik', tik);
    },
    add() {
      this.$bus.emit('new', {pid: 0})
    },
    donew(da) {
      this.lins.push(da)
    },
    doedit(da) {
      var i = this.lins.map((item) => item.id).indexOf(da.id)
      this.lins[i] = da
    },
    dodel(id) {
      var i = this.lins.map((item) => item.id).indexOf(id)
      this.lins.splice(i, 1)
    }
  }
}
</script>
<style>
.tik0{
    background-color: gray;
    border: solid 1px gray;
}
.tik1{
    background-color: green;
    border: solid 1px green;
}
.tik2{
    background-color: red;
    border: solid 1px red;
}
.tikall{
    background-color: white;
    border: solid 1px black;
}
.tik{
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-left: 5px;
    /* border-radius:  50%; */
}
a{cursor: pointer;}
</style>
