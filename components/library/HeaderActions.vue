<template>
  <div class="exercises__actions">
    <div class="exercises__search-filter">
      <Form
        v-slot="$form"
        :initial-values="initialSearchValue"
        @submit="() => console.log('search')"
      >
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            fluid
            name="searchValue"
            placeholder="Procure por um exercício"
            size="small"
            variant="filled"
          />
        </IconField>
      </Form>
    </div>

    <Button
      icon="pi pi-plus"
      label="Adicionar treino"
      severity="contrast"
      size="small"
      @click="handleModalVisible"
    />
  </div>
</template>

<script lang="ts" setup>
enum EmittedEvents {
  ChangeWorkoutVisibility = "change-workout-visibility",
}

const emit = defineEmits([EmittedEvents.ChangeWorkoutVisibility]);

const initialSearchValue = reactive({
  searchValue: "",
});

function handleModalVisible() {
  emit(EmittedEvents.ChangeWorkoutVisibility);
}
</script>

<style lang="scss" scoped>
.exercises {
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__search-filter {
    width: 25%;
  }
}
</style>
