import { faker } from "@faker-js/faker";
import { createRandomExerciseSimple } from "./Exercise";
import {
  ExerciseLog,
  ExerciseLogDraft,
  ExerciseLogIsolated,
  ExerciseLogPreview,
  SetLog,
  SetLogDraft,
  WorkoutLogDraft,
} from "@/types/Log";
import dayjs from "@/lib/dayjs";

export const createRandomExerciseLog = (): ExerciseLog => {
  return {
    id: faker.string.uuid(),
    exercise: createRandomExerciseSimple(),
    sets: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      createRandomSetLog
    ),
  };
};

export const createRandomExerciseLogPreview = (): ExerciseLogPreview => {
  return {
    id: faker.string.uuid(),
    exercise: createRandomExerciseSimple(),

    sets: faker.number.int({ min: 1, max: 5 }),
  };
};

export const createRandomExerciseLogIsolated = (): ExerciseLogIsolated => {
  return {
    id: faker.string.uuid(),
    exercise: createRandomExerciseSimple(),
    sets: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      createRandomSetLog
    ),
    workoutLog: {
      id: faker.string.uuid(),
      loggedAt: faker.date.recent(),
      workout: {
        id: faker.string.uuid(),
        name: faker.vehicle.manufacturer(),
      },
    },
  };
};

export const createRandomSetLog = (): SetLog => {
  return {
    id: faker.string.uuid(),
    reps: faker.number.int({ min: 5, max: 8 }),
    weight: faker.number.int({ min: 20, max: 100 }),
    isWarmup: faker.datatype.boolean(),
  };
};

export const createRandomWorkoutLogDraft = (): WorkoutLogDraft => {
  return {
    id: faker.string.uuid(),
    exercises: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      createRandomExerciseLogDraft
    ),
    workout: {
      id: faker.string.uuid(),
      name: faker.vehicle.manufacturer(),
    },

    duration: dayjs()
      .hour(faker.number.int(2))
      .minute(faker.number.int(30))
      .toDate(),

    loggedAt: faker.date.recent(),
  };
};

export const createRandomExerciseLogDraft = (): ExerciseLogDraft => {
  return {
    exercise: createRandomExerciseSimple(),
    prescription: {
      restDuration: faker.number.int({ min: 30, max: 120 }),
      authorNotes: faker.lorem.sentence(),
    },
    sets: Array.from(
      {
        length: faker.number.int({ min: 1, max: 5 }),
      },
      createRandomSetLogDraft
    ),

    athleteNotes: faker.lorem.sentence(),
  };
};

export const createRandomSetLogDraft = (): SetLogDraft => {
  return {
    prescription: {
      minReps: faker.number.int({ min: 5, max: 8 }),
      rpe: faker.number.int({ min: 6, max: 10 }),
    },
    isWarmup: false,
    done: false,
  };
};
