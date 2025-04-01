<template>
  <div v-if="!props.loading">
    <h1>Overview</h1>
  </div>
</template>

<script setup lang="ts">
type Props = { loading: boolean };
const props = defineProps<Props>();

definePageMeta({ pageTransition: false });
</script>
