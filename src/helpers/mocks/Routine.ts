import {
  Routine,
  RoutineCategoryEnum,
  RoutineCycle,
  RoutineCycleDraft,
  RoutineDifficultyEnum,
  RoutineDraft,
  RoutineEquipmentEnum,
  RoutinePreview,
  RoutineReview,
  Workout,
  WorkoutDraft,
  WorkoutExercise,
  WorkoutExerciseDraft,
  WorkoutSet,
  WorkoutSetDraft,
} from "@/types/Routine";
import { faker } from "@faker-js/faker";
import { createRandomExerciseSelectionSimple } from "./Exercise";
import { createRandomUserSimple } from "./User";
import {
  EnduranceCriteriaEnum,
  ExerciseForceEnum,
  IntensityCriteriaEnum,
} from "@/types/Exercise";

export const createRandomRoutine = (): Routine => {
  return {
    id: faker.string.uuid(),
    author: createRandomUserSimple(),

    name: faker.vehicle.manufacturer(),
    description: faker.lorem.paragraphs({
      min: 2,
      max: 3,
    }),
    thumbnail: faker.image.urlLoremFlickr({
      category: "gym",
    }),
    category: faker.helpers.enumValue(RoutineCategoryEnum),
    difficulty: [faker.helpers.enumValue(RoutineDifficultyEnum)],
    equipment: faker.helpers.enumValue(RoutineEquipmentEnum),
    duration: faker.number.int(12),
    minFrequency: faker.number.int({ min: 1, max: 3 }),
    maxFrequency: faker.number.int({ min: 4, max: 7 }),
    rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.5 }),
    numberOfReviews: faker.number.int({ min: 5, max: 50 }),
    reviewsSample: Array.from({ length: 5 }, createRandomRoutineReview) as [
      RoutineReview,
      RoutineReview,
      RoutineReview,
      RoutineReview,
      RoutineReview
    ],

    createdAt: faker.date.recent(),
  };
};

export const createRandomRoutineCycle = (): RoutineCycle => {
  return {
    id: faker.string.uuid(),
    workouts: Array.from(
      { length: faker.number.int({ min: 1, max: 4 }) },
      createRandomWorkout
    ),

    name: faker.animal.cat(),
    duration: faker.number.int({ min: 1, max: 4 }),
  };
};

export const createRandomWorkout = (): Workout => {
  return {
    id: faker.string.uuid(),
    exercises: Array.from(
      { length: faker.number.int({ min: 1, max: 8 }) },
      createRandomWorkoutExercise
    ),

    name: faker.animal.cat(),
  };
};

export const createRandomWorkoutExercise = (): WorkoutExercise => {
  return {
    id: faker.string.uuid(),
    intensityCriteria: faker.helpers.enumValue(IntensityCriteriaEnum),
    enduranceCriteria: faker.helpers.enumValue(EnduranceCriteriaEnum),
    exercise: createRandomExerciseSelectionSimple(),
    sets: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      createRandomWorkoutSet
    ),

    restDuration: faker.number.int(120),
    authorNotes: faker.lorem.sentence(),
  };
};

export const createRandomWorkoutSet = (): WorkoutSet => {
  return {
    id: faker.string.uuid(),

    minReps: faker.number.int({ min: 5, max: 8 }),
    rpe: faker.number.int({ min: 5, max: 9 }),
    isWarmup: false,
  };
};

export const createRandomRoutinePreview = (): RoutinePreview => {
  return {
    id: faker.string.uuid(),
    author: createRandomUserSimple(),

    name: faker.vehicle.manufacturer(),
    thumbnail: faker.image.urlLoremFlickr({
      category: "gym",
    }),
    category: faker.helpers.enumValue(RoutineCategoryEnum),
    difficulty: [faker.helpers.enumValue(RoutineDifficultyEnum)],
    equipment: faker.helpers.enumValue(RoutineEquipmentEnum),
    duration: faker.number.int(12),
    minFrequency: faker.number.int({ min: 1, max: 3 }),
    maxFrequency: faker.number.int({ min: 4, max: 7 }),

    numberOfAthletes: faker.number.int(100),
    rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.5 }),
  };
};

export const createRandomRoutineReview = (
  isHighlighted: boolean = false
): RoutineReview => {
  return {
    id: faker.string.uuid(),
    author: createRandomUserSimple(),

    rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.5 }),
    description: faker.lorem.paragraph(),
    isHighlighted,

    createdAt: faker.date.recent(),
  };
};

export const randomRoutineDraftCreation: RoutineDraft = {
  name: "",
  description: "",
  difficulty: [],
  cycles: [
    {
      name: "New Cycle",
      workouts: [
        {
          id: faker.string.uuid(),
          name: "New Workout",
          exercises: [
            {
              id: faker.string.uuid(),
              intensityCriteria: IntensityCriteriaEnum.RPE,
              enduranceCriteria: EnduranceCriteriaEnum.Reps,
              exercise: {
                id: faker.string.uuid(),
                name: "Bench Press",
                image: "https://source.unsplash.com/random",
                force: ExerciseForceEnum.Push,
              },
              sets: [
                {
                  minReps: undefined,
                  rpe: undefined,
                  isWarmup: false,
                },
              ],
              restDuration: 120,
              authorNotes: "Bend the bar!",
            },
          ],
        },
      ],
    },
  ],
};

export const createRandomRoutineDraftEdition = (): RoutineDraft => {
  return {
    id: faker.string.uuid(),
    cycles: Array.from(
      { length: faker.number.int({ min: 1, max: 4 }) },
      createRandomCycleDraft
    ),

    name: faker.animal.dog(),
    description: faker.lorem.paragraph(),
    category: faker.helpers.enumValue(RoutineCategoryEnum),
    difficulty: [faker.helpers.enumValue(RoutineDifficultyEnum)],
    equipment: faker.helpers.enumValue(RoutineEquipmentEnum),

    updatedAt: faker.date.recent(),
  };
};

export const createRandomCycleDraft = (): RoutineCycleDraft => {
  return {
    id: faker.string.uuid(),
    workouts: [createRandomWorkoutDraft()],

    name: faker.animal.cat(),
    duration: faker.number.int(4),
  };
};

export const createRandomWorkoutDraft = (): WorkoutDraft => {
  return {
    id: faker.string.uuid(),
    exercises: [createRandomExerciseDraft()],

    name: faker.animal.cat(),
  };
};

export const createRandomExerciseDraft = (): WorkoutExerciseDraft => {
  return {
    id: faker.string.uuid(),
    intensityCriteria: faker.helpers.enumValue(IntensityCriteriaEnum),
    enduranceCriteria: faker.helpers.enumValue(EnduranceCriteriaEnum),
    exercise: createRandomExerciseSelectionSimple(),
    sets: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      createRandomSetDraft
    ),

    restDuration: faker.number.int(120),
    authorNotes: faker.lorem.sentence(),
  };
};

export const createRandomSetDraft = (): WorkoutSetDraft => {
  return {
    id: faker.string.uuid(),

    minReps: faker.number.int({ min: 5, max: 8 }),
    rpe: faker.number.int({ min: 5, max: 9 }),
    isWarmup: false,
  };
};
