<template>
    <div class="triback">
      <div class="triback back1"></div>
      <div class="triback back2"></div>
      <div class="triback back3"></div>
    </div>
</template>

<script>
export default {
  name: 'triback'
}
</script>

<style scoped lang="stylus">
.triback
  position absolute
  left 0px
  right 0px
  top 0px
  bottom 0px
  z-index -1
.back1
  background-color red
  clip-path polygon(4% 0,100% 3%,95% 100%,4% 96%);
.back2
  background-color black
  clip-path polygon(0 4%,97% 0%,99% 98%,1% 98%);
.back3
  background-color white
  clip-path polygon(2% 2%,98% 3%,94% 99%,0 94%);
</style>
