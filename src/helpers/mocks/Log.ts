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
import { EnduranceCriteriaEnum } from "@/types/Exercise";

export const createRandomExerciseLog = (): ExerciseLog => {
  const enduranceCriteria = faker.helpers.enumValue(EnduranceCriteriaEnum);

  return {
    id: faker.string.uuid(),
    exercise: createRandomExerciseSimple(),
    sets: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      createRandomSetLog(enduranceCriteria)
    ),

    enduranceCriteria,
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
  const enduranceCriteria = faker.helpers.enumValue(EnduranceCriteriaEnum);

  return {
    id: faker.string.uuid(),
    exercise: createRandomExerciseSimple(),
    sets: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      createRandomSetLog(enduranceCriteria)
    ),
    workoutLog: {
      id: faker.string.uuid(),
      loggedAt: faker.date.recent(),
      workout: {
        id: faker.string.uuid(),
        name: faker.vehicle.manufacturer(),
      },
    },

    enduranceCriteria,
  };
};

export const createRandomSetLog = (
  enduranceCriteria: EnduranceCriteriaEnum
): SetLog => {
  const randomSetLog: SetLog = {
    id: faker.string.uuid(),
    weight: faker.number.int({ min: 20, max: 100 }),
    isWarmup: false,
  };

  if (
    [
      EnduranceCriteriaEnum.Reps,
      EnduranceCriteriaEnum["Reps Range"],
      EnduranceCriteriaEnum.AMRAP,
    ].includes(enduranceCriteria)
  ) {
    randomSetLog.reps = faker.number.int({ min: 5, max: 8 });
  } else if (enduranceCriteria === EnduranceCriteriaEnum.Time) {
    randomSetLog.time = faker.number.int({ min: 30, max: 120 });
  }

  return randomSetLog;
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
