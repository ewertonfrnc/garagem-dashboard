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

  <Dialog
    v-model:visible="state.isModalVisible"
    :draggable="false"
    :style="{ width: '30rem' }"
    header="Detalhes do treino"
    modal
  >
    <LibraryWorkoutsForm @submit="onFormSubmit" />

    <template #footer>
      <Button label="Criar treino" severity="contrast" type="submit" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import type { CreateWorkoutPayload } from "~/interfaces/workouts.interfaces";

const initialSearchValue = reactive({
  searchValue: "",
});

const state = reactive({
  isModalVisible: false,
});

function handleModalVisible() {
  state.isModalVisible = !state.isModalVisible;
}

async function onFormSubmit(payload: CreateWorkoutPayload) {
  //   const { error } = await tryCatch(store.createExercise(payload));

  //   if (error) {
  //     toast.add({
  //       severity: "error",
  //       summary: "Erro ao criar exercício",
  //       detail: "Erro ao criar exercício, tente novamente",
  //       life: 3000,
  //     });

  //     return;
  //   }

  handleModalVisible();
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
