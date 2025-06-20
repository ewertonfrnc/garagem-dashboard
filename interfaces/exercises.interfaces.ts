export type ExerciseModality = {
  id: number;
  label: string;
  code: string;
};

export type MuscleGroup = {
  id: number;
  label: string;
  code: string;
};

export type Exercise = {
  id: number;
  name: string;
  image: string;
  exerciseModality: ExerciseModality;
  muscleGroups: MuscleGroup[];
  category: ExerciseCategory;
};

export type ExerciseModalityResponse = {
  status: string;
  results: number;
  modalities: ExerciseModality[];
};

export type MuscleGroupResponse = {
  status: string;
  results: number;
  muscleGroups: MuscleGroup[];
};

export type CreateExercisePayload = {
  name: string;
  exerciseModalityId: number;
  muscleGroups: {
    connect: { id: number }[];
  };
};

export type CreateExerciseResponse = {
  status: string;
  exercise: Exercise;
};

export type GetAllExercisesResponse = {
  status: string;
  results: number;
  exercises: Exercise[];
};

export type ExerciseCategory = {
  id: number;
  label: string;
  code: string;
  fields: Field[];
};

export type Field = {
  id: number;
  label: string;
  code: string;
};

export type GetExerciseCategoriesResponse = {
  status: string;
  results: number;
  categories: ExerciseCategory[];
};
