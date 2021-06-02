<template>
    <div class="hlight">
        <div class="hl hlight1"></div>
        <div class="hl hlight2"></div>
        <div class="hl hlight3"></div>
    </div>
</template>
<script>
export default {
  name: 'hlight'
}
</script>
<style lang="stylus" scoped>
.hl
    margin 6px 5%
    width 90%
    height 80%
    animation-fill-mode  forwards
    position absolute
.hlight1
    background-color rgba(255, 0, 247, 0.6)
    animation st-shadow 1s ease-in-out infinite
.hlight2
    background-color rgba(86, 252, 4, 0.5)
    animation st-shadow 2s ease-in-out 0.5s infinite
.hlight3
    background-color rgba(0, 221, 237, 0.6)
    animation  st-shadow 1.5s ease-in-out 0.2s infinite
@keyframes st-shadow {
    0% {
        clip-path: polygon(0 0,85% 20%,90% 100%,0% 80%);
    }
    25% {
        clip-path: polygon(0 20%,100% 0,90% 80%,10% 80%);
    }
    50% {
        clip-path: polygon(20% 20%,85% 0,100% 100%,10% 100%);
    }
    75% {
        clip-path: polygon(20% 0%,100% 20%,100% 80%,0 100%);
    }
    100% {
        clip-path: polygon(0 0,85% 20%,90% 100%,0% 80%);
    }
}
</style>
