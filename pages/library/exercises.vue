<template>
  <div class="exercises">
    <div class="exercises__header">
      <h1>Exercícios</h1>
    </div>

    <div class="exercises__content">
      <LibraryExercisesActions />
      <LibraryExercisesTable />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.exercises {
  padding: 1rem;

  &__header {
    margin-bottom: 1rem;

    h1 {
      font-size: 1.5em;
    }
  }

  &__content {
    display: grid;
    gap: 2rem;
  }
}
</style>
