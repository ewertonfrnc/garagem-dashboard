<template>
  <div v-if="!props.state.loading">
    <h1>Overview</h1>
  </div>
</template>

<script setup lang="ts">
import type { StudentState } from "~/interfaces/user.interfaces";

type Props = { state: StudentState };
const props = defineProps<Props>();

definePageMeta({ pageTransition: false });
</script>
