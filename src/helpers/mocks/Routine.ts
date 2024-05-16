import {
  Routine,
  RoutineCategoryEnum,
  RoutineCycle,
  RoutineCycleDraft,
  RoutineCyclePreview,
  RoutineDifficultyEnum,
  RoutineDraft,
  RoutineEquipmentEnum,
  RoutinePreview,
  RoutineReview,
  Workout,
  WorkoutDraft,
  WorkoutExercise,
  WorkoutExerciseDraft,
  WorkoutExercisePreview,
  WorkoutPreview,
  WorkoutSet,
  WorkoutSetDraft,
  WorkoutSetPreview,
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
  const intensityCriteria = faker.helpers.enumValue(IntensityCriteriaEnum);
  const enduranceCriteria = faker.helpers.enumValue(EnduranceCriteriaEnum);

  return {
    id: faker.string.uuid(),
    intensityCriteria,
    enduranceCriteria,
    exercise: createRandomExerciseSelectionSimple(),
    sets: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      createRandomWorkoutSet(intensityCriteria, enduranceCriteria)
    ),

    restDuration: faker.number.int(120),
    authorNotes: faker.lorem.sentence(),
  };
};

export const createRandomWorkoutSet = (
  intensityCriteria: IntensityCriteriaEnum,
  enduranceCriteria: EnduranceCriteriaEnum
): WorkoutSet => {
  const randomWorkoutSet: WorkoutSet = {
    id: faker.string.uuid(),
    isWarmup: false,
  };

  if (intensityCriteria === IntensityCriteriaEnum.RPE) {
    randomWorkoutSet.rpe = faker.number.int({ min: 5, max: 9 });
  } else if (intensityCriteria === IntensityCriteriaEnum["% of 1RM"]) {
    randomWorkoutSet.prPercentage = faker.number.int({ min: 50, max: 90 });
  }

  switch (enduranceCriteria) {
    case EnduranceCriteriaEnum.Reps:
      randomWorkoutSet.minReps = faker.number.int({ min: 5, max: 8 });
      break;
    case EnduranceCriteriaEnum["Reps Range"]:
      randomWorkoutSet.minReps = faker.number.int({ min: 5, max: 8 });
      randomWorkoutSet.maxReps = faker.number.int({ min: 8, max: 12 });
      break;
    case EnduranceCriteriaEnum.Time:
      randomWorkoutSet.targetTime = faker.number.int({ min: 30, max: 120 });
      break;
    case EnduranceCriteriaEnum["AMRAP"]:
      randomWorkoutSet.isAMRAP = true;
      break;
  }

  return randomWorkoutSet;
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

export const createRandomRoutineCyclePreview = (): RoutineCyclePreview => {
  return {
    id: faker.string.uuid(),
    workouts: Array.from(
      { length: faker.number.int({ min: 1, max: 4 }) },
      createRandomWorkoutPreview
    ),

    name: faker.animal.cat(),
    duration: faker.number.int({ min: 1, max: 4 }),
  };
};

export const createRandomWorkoutPreview = (): WorkoutPreview => {
  return {
    id: faker.string.uuid(),
    exercises: Array.from(
      { length: faker.number.int({ min: 1, max: 8 }) },
      createRandomWorkoutExercisePreview
    ),

    name: faker.animal.cat(),
  };
};

export const createRandomWorkoutExercisePreview =
  (): WorkoutExercisePreview => {
    const intensityCriteria = faker.helpers.enumValue(IntensityCriteriaEnum);
    const enduranceCriteria = faker.helpers.enumValue(EnduranceCriteriaEnum);

    return {
      id: faker.string.uuid(),
      intensityCriteria,
      enduranceCriteria,
      exercise: createRandomExerciseSelectionSimple(),
      sets: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
        createRandomWorkoutSetPreview(intensityCriteria, enduranceCriteria)
      ),
    };
  };

export const createRandomWorkoutSetPreview = (
  intensityCriteria: IntensityCriteriaEnum,
  enduranceCriteria: EnduranceCriteriaEnum
): WorkoutSetPreview => {
  const randomWorkoutSet: WorkoutSetPreview = {
    id: faker.string.uuid(),
    isWarmup: false,
    amount: faker.number.int({ min: 1, max: 3 }),
  };

  if (intensityCriteria === IntensityCriteriaEnum.RPE) {
    randomWorkoutSet.rpe = faker.number.int({ min: 5, max: 9 });
  } else if (intensityCriteria === IntensityCriteriaEnum["% of 1RM"]) {
    randomWorkoutSet.prPercentage = faker.number.int({ min: 50, max: 90 });
  }

  switch (enduranceCriteria) {
    case EnduranceCriteriaEnum.Reps:
      randomWorkoutSet.minReps = faker.number.int({ min: 5, max: 8 });
      break;
    case EnduranceCriteriaEnum["Reps Range"]:
      randomWorkoutSet.minReps = faker.number.int({ min: 5, max: 8 });
      randomWorkoutSet.maxReps = faker.number.int({ min: 8, max: 12 });
      break;
    case EnduranceCriteriaEnum.Time:
      randomWorkoutSet.targetTime = faker.number.int({ min: 30, max: 120 });
      break;
    case EnduranceCriteriaEnum["AMRAP"]:
      randomWorkoutSet.isAMRAP = true;
      break;
  }

  return randomWorkoutSet;
};
