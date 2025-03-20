<template>
  <div class="exercises">
    <div class="exercises__header">
      <h1>Exercícios</h1>
    </div>

    <div class="exercises__actions">
      <div class="exercises__search-filter">
        <Form
          v-slot="$form"
          :initial-values="initialSearchValue"
          @submit="onFormSubmit"
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
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { FormSubmitEvent } from "@primevue/forms/form";

const initialSearchValue = reactive({
  searchValue: "",
});

const state = reactive({
  loading: false,
});

function onFormSubmit({ values }: FormSubmitEvent) {
  console.log("onFormSubmit", values);
}
</script>

<style lang="scss" scoped>
.exercises {
  padding: 1rem;

  &__header {
    margin-bottom: 1rem;

    h1 {
      font-size: 1.5em;
    }
  }

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
