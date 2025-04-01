export type WorkoutExercise = {
  id: number;
  name: string;
  image: string | null;
  video: string | null;
  createdAt: string; // ou Date, dependendo de como você lida com datas
  updatedAt: string;
  exerciseModality: number;
  exerciseCategory: number;
};

export type Workout = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  exercises: WorkoutExercise[];
};

export type WorkoutsResponse = {
  status: string;
  results: number;
  workouts: Workout[];
};
