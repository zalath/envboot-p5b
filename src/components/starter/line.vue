<template>
    <div>
        <br v-if="line == ''" />
        <div class="stline" v-else @click="openProject(line.path)"
                    @contextmenu="openFolder(line.path)">
          {{line.name}}
          </div>
    </div>
</template>
<script>
export default {
  name: 'stLine',
  props: {
    line: {}
  },
  methods: {
    openProject: function(path) {
      this.$ipc.send('openProject', path)
    },
    openFolder: function(path) {
      this.$ipc.send('openFolder', path)
    }
  }
}
</script>
<style lang="stylus" scoped>
.stline
  cursor pointer
  &:hover
    background-color red
    color white
</style>
