<template>
  <div class="calendar">
    <h1>Calendar</h1>

    <pre>{{ props }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { StudentState } from "~/interfaces/user.interfaces";

type Props = { state: StudentState };
const props = defineProps<Props>();

definePageMeta({ pageTransition: false });
</script>
