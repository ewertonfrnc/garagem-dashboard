<template>
  <div class="workouts">
    <div class="workouts__header">
      <h1>Treinos</h1>
    </div>

    <LibraryHeaderActions
      @change-workout-visibility="handleModalVisible"
      @refreshWorkouts="getWorkouts"
    />

    <div class="workouts__content">
      <DataTable
        :value="state.workouts"
        striped-rows
        selection-mode="single"
        @row-select="onRowSelect"
      >
        <Column field="name" header="Nome" />

        <template #empty>
          <div>Nenhum exercício encontrado</div>
        </template>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="state.isWorkoutModalVisible"
      :draggable="false"
      :style="{ width: '40rem' }"
      header="Detalhes do treino"
      modal
    >
      <LibraryWorkoutsForm
        :selected-workout="state.selectedWorkout"
        @submit="onFormSubmit"
      />
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { DataTableRowSelectEvent } from "primevue/datatable";
import type {
  Workout,
  CreateWorkoutPayload,
} from "~/interfaces/workouts.interfaces";

const emit = defineEmits(["refreshWorkouts"]);

const store = useWorkoutsStore();
const toast = useToast();

const state = reactive({
  // Workout modal
  isWorkoutModalVisible: false,
  isWorkoutModalLoading: false,
  selectedWorkout: null as Workout | null,

  loading: false,
  workouts: [] as Workout[],
});

async function getWorkouts() {
  const { data, error } = await tryCatch(store.fetchAllWorkouts());

  if (error) {
    console.error("Error fetching workouts:", error);
    return;
  }

  state.workouts = data.workouts;
}

function onRowSelect(event: DataTableRowSelectEvent<Workout>) {
  if (!event.data) return;

  handleModalVisible();
  state.selectedWorkout = event.data;
}

async function onFormSubmit(payload: CreateWorkoutPayload) {
  const { error } = await tryCatch(store.createWorkout(payload));

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
  emit("refreshWorkouts");
}

function handleModalVisible() {
  state.isWorkoutModalVisible = !state.isWorkoutModalVisible;
  state.selectedWorkout = null;
}

onMounted(() => {
  getWorkouts();
});
</script>

<style lang="scss" scoped>
.workouts {
  padding: 1rem;

  h1 {
    font-size: 1.5em;
  }
}
</style>
