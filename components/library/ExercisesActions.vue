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
            name="searchValue"
            placeholder="Procure por um exercício"
            fluid
            size="small"
            variant="filled"
          />
        </IconField>
      </Form>
    </div>

    <Button
      label="Adicionar exercício"
      icon="pi pi-plus"
      size="small"
      severity="contrast"
      @click="handleModalVisible"
    />
  </div>

  <Dialog
    v-model:visible="state.isModalVisible"
    modal
    header="Detalhes do exercício"
    :style="{ width: '25rem' }"
  >
    <LibraryExercisesForm @submit="onFormSubmit" />
  </Dialog>
</template>

<script setup lang="ts">
import type { CreateExercisePayload } from "~/interfaces/exercises.interfaces";

const toast = useToast();
const store = useExercisesStore();

const initialSearchValue = reactive({
  searchValue: "",
});

const state = reactive({
  isModalVisible: false,
});

function handleModalVisible() {
  state.isModalVisible = !state.isModalVisible;
}

async function onFormSubmit(payload: CreateExercisePayload) {
  const { error } = await tryCatch(store.createExercise(payload));

  if (error) {
    toast.add({
      severity: "error",
      summary: "Erro ao criar exercício",
      detail: "Erro ao criar exercício, tente novamente",
      life: 3000,
    });

    return;
  }

  handleModalVisible();
}
</script>

<style scoped lang="scss">
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
