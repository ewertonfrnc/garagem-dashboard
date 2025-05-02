<template>
  <div class="workouts-form">
    <Form
      v-slot="$form"
      :initial-values="initialValues"
      :resolver="resolver"
      class="workouts-form__form"
      @submit="onFormSubmit"
    >
      <div class="workouts-form__field">
        <label for="name">Nome</label>
        <InputText id="name" fluid name="name" size="small" />
        <Message
          v-if="$form.name?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.name.error?.message }}
        </Message>
      </div>

      <div class="workouts-form__field">
        <label for="description">Descrição</label>
        <Textarea
          id="description"
          cols="10"
          fluid
          name="description"
          rows="2"
          style="resize: none"
        />
        <Message
          v-if="$form.description?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.description.error?.message }}
        </Message>
      </div>

      <Divider />

      <div>
        <div style="padding: 1rem; border: 1px solid #ddd; border-radius: 6px">
          <div>
            <Select
              :options="store.exercises"
              filter
              fluid
              name="exercises"
              option-label="name"
              placeholder="Escolher exercício"
            />
            <Message
              v-if="$form.exercises?.name?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.city.name.error?.message }}</Message
            >
          </div>
        </div>
      </div>

      <div class="workouts-form__actions">
        <Button fluid label="Adicionar exercício" severity="contrast" />
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { FormSubmitEvent } from "@primevue/forms/form";

const emit = defineEmits(["submit"]);

const store = useExercisesStore();

const exercises = ref([1]);

const state = reactive({
  loading: false,
  showEmptyState: false,
});

const initialValues = reactive({
  name: "",
  description: "",
});

const formValues = reactive({
  name: "",
  description: "",
  exercises: [],
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().trim().min(1, { message: "Campo obrigatório" }),
      description: z.string().trim().min(1, { message: "Campo obrigatório" }),
    }),
  ),
);

async function fetchExerciseList() {
  state.loading = true;

  const { error } = await tryCatch(store.fetchAllExercises());

  if (error) {
    console.log("error", error);
    return;
  }

  state.loading = false;
}

async function onFormSubmit({ valid, values, reset }: FormSubmitEvent) {
  if (!valid) return;

  console.log("values", values);

  emit("submit", { ...formValues, name: values.name });
  reset();
}

onMounted(() => {
  fetchExerciseList();
});
</script>

<style lang="scss" scoped>
.workouts-form {
  min-height: 30rem;

  &__form {
    display: grid;
    gap: 1rem;
  }
}
</style>
