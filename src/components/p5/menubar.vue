<template>
  <div>
    <span @click='handle()'>{{ m.name }}{{order}}{{num}}</span>
  </div>
</template>

<script>
export default {
  name: 'menubar',
  props: {
    m: {},
    order: Number,
    num: Number
  },
  methods: {
    handle: function() {
      if (this.m.url) {
        this.$ipc.send('tobrowser', this.m.url);
      }
    }
  }
};
</script>
<style scoped>
span{
    cursor: pointer;
}
</style>
