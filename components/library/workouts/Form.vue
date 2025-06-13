<template>
  <div class="workouts-form">
    <Form
      v-slot="$form"
      :initial-values="workoutData"
      :resolver="resolver"
      class="workouts-form__form"
      @submit="onFormSubmit"
    >
      <div class="workouts-form__field">
        <label for="name">Nome</label>
        <InputText
          id="name"
          v-model="workoutData.name"
          fluid
          name="name"
          size="small"
        />
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
          v-model="workoutData.description"
          cols="10"
          fluid
          name="description"
          rows="2"
          style="resize: none"
          size="small"
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

      <!-- Display Added Exercises -->
      <div
        v-if="!workoutData.exercises.length"
        class="workouts-form__empty-message"
      >
        <p>
          Nenhum exercício adicionado ainda. Selecione um exercício e clique em
          "Adicionar exercício".
        </p>
      </div>

      <div v-else class="workouts-form__exercises-list">
        <Card
          v-for="(exercise, exIndex) in workoutData.exercises"
          :key="exercise.exerciseId"
          class="workouts-form__exercise-card"
        >
          <template #content>
            <div class="workouts-form__exercise-card-header">
              <h4 class="workouts-form__exercise-card-title">
                {{ exercise.exerciseName }}
              </h4>
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                @click="removeExercise(exIndex)"
                aria-label="Remove exercise"
              />
            </div>

            <table class="workouts-form__exercise-card-sets-table">
              <thead>
                <tr>
                  <th>Série</th>
                  <th>Peso (kg)</th>
                  <th>Repetições</th>
                  <th>Descanso</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(set, setIndex) in exercise.sets" :key="setIndex">
                  <td>{{ set.setNumber }}</td>
                  <td>
                    <InputNumber
                      v-model="set.weight"
                      placeholder="-"
                      size="small"
                      :min="0"
                      :step="0.5"
                    />
                  </td>
                  <td>
                    <InputNumber
                      v-model="set.reps"
                      placeholder="-"
                      size="small"
                      :min="0"
                    />
                  </td>
                  <td>
                    <InputNumber
                      v-model="set.rest"
                      placeholder="30"
                      size="small"
                      :min="0"
                    />
                  </td>
                  <td>
                    <Button
                      v-if="exercise.sets.length > 1"
                      icon="pi pi-minus-circle"
                      severity="danger"
                      size="small"
                      rounded
                      text
                      aria-label="Remove set"
                      @click="removeSet(exIndex, setIndex)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <Button
              label="Adicionar Série"
              @click="addSet(exIndex)"
              icon="pi pi-plus"
              size="small"
              class="workouts-form__exercise-card-add-set-button"
            />

            <Textarea
              v-model="exercise.notes"
              placeholder="Adicione notas sobre este exercício"
              rows="2"
              fluid
              class="workouts-form__exercise-card-notes-area"
              size="small"
            />
          </template>
        </Card>
      </div>

      <!-- Add Exercise Section -->
      <div class="workouts-form__add-exercise-section">
        <Dropdown
          v-model="exerciseToAdd"
          :options="availableExercises"
          optionLabel="name"
          placeholder="Selecione um exercício"
          showClear
          size="small"
        />
        <Button
          label="Adicionar exercício"
          icon="pi pi-plus"
          @click="addExerciseToWorkout"
          :disabled="!exerciseToAdd"
          size="small"
        />
      </div>

      <div class="workouts-form__actions">
        <Button
          type="submit"
          label="Criar treino"
          severity="contrast"
          :loading="state.loading"
          size="small"
        />
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { FormSubmitEvent } from "@primevue/forms/form";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Message from "primevue/message";
import Form from "@primevue/forms/form";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import type { Exercise } from "~/interfaces/exercises.interfaces";

interface PrismaSetCreateInput {
  reps: number | null;
  weight: number | null;
  rest: number;
  duration: null;
  distance: null;
  notes: null;
}

interface PrismaWorkoutExerciseCreateInput {
  exercise: { connect: { id: number } };
  order: number;
  notes: string | null;
  sets: {
    create: PrismaSetCreateInput[];
  };
}

interface PrismaWorkoutCreateInput {
  name: string;
  description: string;
  workoutExercises: {
    create: PrismaWorkoutExerciseCreateInput[];
  };
}

interface WorkoutSet {
  setNumber: number;
  weight: number | null;
  reps: number | null;
  rest: number;
}

interface WorkoutExercise {
  exerciseId: number;
  exerciseName: string;
  sets: WorkoutSet[];
  notes: string;
}

interface WorkoutData {
  name: string;
  description: string;
  exercises: WorkoutExercise[];
}

const emit = defineEmits(["submit"]);

const store = useExercisesStore();
const toast = useToast();

const state = reactive({
  loading: false,
});

const workoutData = reactive<WorkoutData>({
  name: "",
  description: "",
  exercises: [],
});
const exerciseToAdd = ref<Exercise | null>(null);
const availableExercises = computed(() => store.exercises || []);

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().trim().min(1, { message: "Campo obrigatório" }),
      description: z.string().trim().min(1, { message: "Campo obrigatório" }),
    })
  )
);

async function fetchExerciseList() {
  state.loading = true;
  const { error } = await tryCatch(store.fetchAllExercises());
  if (error) {
    console.error("Error fetching exercises:", error);
    // Optionally, show a toast message to the user
  }
  state.loading = false;
}

function addExerciseToWorkout() {
  if (!exerciseToAdd.value) return;

  const currentExercise = exerciseToAdd.value;

  const isAlreadyAdded = workoutData.exercises.some(
    (ex) => ex.exerciseId === currentExercise.id
  );

  if (isAlreadyAdded) {
    toast.add({
      severity: "warn",
      summary: "Atenção",
      detail: "Este exercício já foi adicionado.",
      life: 3000,
    });

    // reset the dropdown selection
    exerciseToAdd.value = null;
    return;
  }

  const set =
    currentExercise.category.code === "strength" ||
    currentExercise.category.code === "bodyweight"
      ? { setNumber: 1, weight: 10, reps: 10, rest: 30 }
      : { setNumber: 1, weight: null, reps: 12, rest: 30 };

  workoutData.exercises.push({
    exerciseId: currentExercise.id,
    exerciseName: currentExercise.name,
    sets: [set],
    notes: "",
  });

  // Reset dropdown selection
  exerciseToAdd.value = null;
}

function removeExercise(index: number) {
  workoutData.exercises.splice(index, 1);
}

function addSet(exerciseIndex: number) {
  const exercise = workoutData.exercises[exerciseIndex];
  const nextSetNumber = exercise.sets.length
    ? Math.max(...exercise.sets.map((s) => s.setNumber)) + 1
    : 1;

  exercise.sets.push({
    setNumber: nextSetNumber,
    weight: null,
    reps: null,
    rest: 30,
  });
}

function removeSet(exerciseIndex: number, setIndex: number) {
  const exercise = workoutData.exercises[exerciseIndex];
  if (exercise.sets.length > 1) {
    exercise.sets.splice(setIndex, 1);
  } else {
    toast.add({
      severity: "warn",
      summary: "Atenção",
      detail:
        "Não é possível remover a última série. Remova o exercício ou adicione outra série primeiro.",
      life: 5000,
    });
  }
}

async function onFormSubmit({ valid, values, reset }: FormSubmitEvent) {
  if (!valid) {
    toast.add({
      severity: "error",
      summary: "Erro de Validação",
      detail: "Por favor, verifique todos os campos.",
      life: 3000,
    });
    return;
  }

  const dataToSubmit: PrismaWorkoutCreateInput = {
    name: values.name,
    description: values.description,
    workoutExercises: {
      create: workoutData.exercises.map((exercise, index) => ({
        exercise: { connect: { id: exercise.exerciseId } },
        order: index + 1,
        notes: exercise.notes || null,
        sets: {
          create: exercise.sets.map((set) => ({
            reps: set.reps,
            weight: set.weight,
            rest: set.rest || 0,
            duration: null,
            distance: null,
            notes: null,
          })),
        },
      })),
    },
  };

  emit("submit", dataToSubmit);

  Object.assign(workoutData, {
    name: "",
    description: "",
    exercises: [],
  });
  reset();
}

onMounted(() => {
  fetchExerciseList();
});
</script>

<style lang="scss" scoped>
.workouts-form {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  &__add-exercise-section {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__empty-message {
    text-align: center;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  &__exercises-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__exercise-card {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    &-title {
      margin: 0;
      font-size: 1.1rem;
    }

    &-sets-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;

      th,
      td {
        text-align: left;
        padding: 0.5rem 0.25rem;
      }

      th {
        font-size: 0.85rem;
      }
    }

    &-add-set-button {
      margin-bottom: 1rem;
    }

    &-notes-area {
      resize: none;
      margin-top: 0.5rem;
    }
  }
}

// Ensure InputNumber and InputText inside table cells are responsive
// These are PrimeVue components, so :deep is appropriate if targeting their internal structure.
:deep(.p-inputnumber-input),
:deep(.p-inputtext) {
  width: 100%;
}
</style>
