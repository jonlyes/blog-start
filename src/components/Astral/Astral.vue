<script setup lang="ts">

defineProps({
  style: {
    type: Object,
    default: {}
  }
})

</script>
<template>
  <div class="Astral" :style="style">
    <slot></slot>
  </div>
</template>


<style lang="scss" scoped>
/* 星空背景的样式 */
.Astral {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 !important;
  overflow: hidden;
  z-index: -1;
  background-color: black;
  background-image: url("../../assets/star.gif");
  background-repeat: repeat;
}
</style>
