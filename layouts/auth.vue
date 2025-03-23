<template>
  <div class="container">
    <Toast />
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  transition: all 0.3s ease-in-out;
}
</style>
