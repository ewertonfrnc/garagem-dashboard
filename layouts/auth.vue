<template>
  <div class="container">
    <BaseToast />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  transition: all 0.3s ease-in-out;
}
</style>
