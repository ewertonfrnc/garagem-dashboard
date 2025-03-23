<template>
  <div class="exercises">
    <Form
      v-slot="$form"
      :resolver
      :initial-values="initialValues"
      @submit="onFormSubmit"
      class="exercises__form"
    >
      <div class="exercises__form-field">
        <InputText
          name="name"
          placeholder="Nome do exercício"
          fluid
          size="small"
          variant="filled"
        />
        <Message
          v-if="$form.name?.invalid"
          size="small"
          variant="simple"
          severity="error"
        >
          {{ $form.name.error?.message }}
        </Message>
      </div>

      <Divider />

      <div class="exercises__form-group">
        <h4>Foco principal</h4>

        <div class="exercises__form-field">
          <Select
            name="exerciseModalityId"
            placeholder="Modalidade"
            fluid
            size="small"
            variant="filled"
            option-label="label"
            :loading="state.loading"
            :options="selectOptions.modalities"
            @change="handleExerciseModalityChange"
          />
          <Message
            v-if="$form.exerciseModalityId?.invalid"
            size="small"
            variant="simple"
            severity="error"
          >
            {{ $form.exerciseModalityId.error.message }}
          </Message>
        </div>

        <div class="exercises__form-field">
          <MultiSelect
            fluid
            filter
            name="muscleGroups"
            size="small"
            variant="filled"
            optionLabel="label"
            placeholder="Grupos Musculares"
            :loading="state.loading"
            :selectionLimit="3"
            :options="selectOptions.muscleGroups"
            @change="handleMuscleGroupChange"
          />
          <Message
            v-if="$form.muscleGroups?.invalid"
            size="small"
            variant="simple"
            severity="error"
          >
            {{ $form.muscleGroups.error.message }}
          </Message>
        </div>
      </div>

      <Divider />

      <div class="exercises__form-group">
        <Button
          type="submit"
          :disabled="store.loading"
          :loading="store.loading"
          severity="contrast"
          label="Submit"
        />
      </div>
    </Form>

    <!-- <div class="exercises__upload">
        <InputText
          name="instructions"
          placeholder="Add exercise instructions"
          fluid
          size="small"
          variant="filled"
        />
        <InputText
          name="videoLink"
          placeholder="Vimeo or Youtube link"
          fluid
          size="small"
          variant="filled"
        />
      </div> -->
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { FormSubmitEvent } from "@primevue/forms/form";
import type { MultiSelectChangeEvent } from "primevue/multiselect";
import type { SelectChangeEvent } from "primevue/select";
import type {
  CreateExercisePayload,
  Exercise,
  ExerciseModality,
  MuscleGroup,
} from "~/interfaces/exercises.interfaces";

const toast = useToast();

const emit = defineEmits(["submit"]);

const store = useExercisesStore();

const state = reactive({
  loading: false,
});

const initialValues = reactive({
  name: "",
  exerciseModalityId: { label: null },
  muscleGroups: [],
});

const formValues = reactive<CreateExercisePayload>({
  name: "",
  exerciseModalityId: 0,
  muscleGroups: { connect: [] },
});

const selectOptions = reactive({
  modalities: [] as ExerciseModality[],
  muscleGroups: [] as MuscleGroup[],
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().trim().min(1, { message: "Campo obrigatório" }),
      exerciseModalityId: z.union([
        z.object({ label: z.string().min(1, "Campo obrigatório") }),
        z.any().refine((val) => false, { message: "Campo obrigatório" }),
      ]),
      muscleGroups: z
        .array(z.object({ label: z.string().min(1, "Campo obrigatório") }))
        .min(1, "Campo obrigatório"),
    })
  )
);

async function fetchFormInitialValues() {
  state.loading = true;

  const { data: modalitiesData, error: modalitiesError } = await tryCatch(
    store.fetchExerciseModalities()
  );
  const { data: muscleGroupData, error: muscleGroupError } = await tryCatch(
    store.fetchMuscleGroups()
  );

  if (modalitiesError || muscleGroupError) {
    toast.add({
      severity: "error",
      summary: "Erro ao carregar os dados",
      detail: "Tente novamente mais tarde",
      life: 3000,
    });
    state.loading = false;
    return;
  }

  selectOptions.modalities = modalitiesData.modalities;
  selectOptions.muscleGroups = muscleGroupData.muscleGroups;
  state.loading = false;
}

function handleExerciseModalityChange({ value }: SelectChangeEvent) {
  const selectedModality = value as MuscleGroup;
  formValues.exerciseModalityId = selectedModality.id;
}

function handleMuscleGroupChange({ value }: MultiSelectChangeEvent) {
  const selectedMuscleGrous = value as MuscleGroup[];

  const groupIds = selectedMuscleGrous.map((group) => ({ id: group.id }));
  formValues.muscleGroups.connect = groupIds;
}

async function onFormSubmit({ valid, values, reset }: FormSubmitEvent) {
  if (!valid) return;

  const submitedValues = values as Exercise;
  emit("submit", { ...formValues, name: submitedValues.name });
  reset();
}

onMounted(() => {
  fetchFormInitialValues();
});
</script>

<style scoped lang="scss">
.exercises {
  &__form {
    &-group {
      display: grid;
      gap: 0.5rem;
    }

    &-field {
    }

    &-upload {
      display: grid;
    }
  }
}
</style>
