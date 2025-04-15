<template>
  <div>
    <h1>Overview</h1>
    <pre>{{ props }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/interfaces/user.interfaces";

type Props = { user: User };
const props = defineProps<Props>();

// definePageMeta({ pageTransition: false });
</script>
