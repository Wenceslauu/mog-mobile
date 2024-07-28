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
import { EnduranceCriteriaEnum, IntensityCriteriaEnum } from "@/types/Exercise";

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

    post: {
      id: faker.string.uuid(),
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
  const prescriptionIntensityCriteria = faker.helpers.enumValue(
    IntensityCriteriaEnum
  );
  const prescriptionEnduranceCriteria = faker.helpers.enumValue(
    EnduranceCriteriaEnum
  );

  let enduranceCriteria:
    | EnduranceCriteriaEnum.Reps
    | EnduranceCriteriaEnum.Time;

  if (
    [
      EnduranceCriteriaEnum.Reps,
      EnduranceCriteriaEnum["Reps Range"],
      EnduranceCriteriaEnum.AMRAP,
    ].includes(prescriptionEnduranceCriteria)
  ) {
    enduranceCriteria = EnduranceCriteriaEnum.Reps;
  } else {
    enduranceCriteria = EnduranceCriteriaEnum.Time;
  }

  return {
    exercise: createRandomExerciseSimple(),
    prescription: {
      restDuration: faker.number.int({ min: 30, max: 120 }),
      authorNotes: faker.lorem.sentence(),
      intensityCriteria: prescriptionIntensityCriteria,
      enduranceCriteria: prescriptionEnduranceCriteria,
    },
    sets: Array.from(
      {
        length: faker.number.int({ min: 1, max: 5 }),
      },
      () =>
        createRandomSetLogDraft(
          prescriptionIntensityCriteria,
          prescriptionEnduranceCriteria,
          enduranceCriteria
        )
    ),

    enduranceCriteria,

    athleteNotes: faker.lorem.sentence(),
  };
};

export const createRandomSetLogDraft = (
  prescriptionIntensityCriteria: IntensityCriteriaEnum,
  prescriptionEnduranceCriteria: EnduranceCriteriaEnum,
  enduranceCriteria: EnduranceCriteriaEnum.Reps | EnduranceCriteriaEnum.Time
): SetLogDraft => {
  const randomSetLogDraft: SetLogDraft = {
    prescription: {},
    isWarmup: false,
    done: faker.datatype.boolean(),
  };

  if (prescriptionIntensityCriteria === IntensityCriteriaEnum.RPE) {
    randomSetLogDraft.prescription!.rpe = faker.number.int({ min: 5, max: 9 });
  } else if (
    prescriptionIntensityCriteria === IntensityCriteriaEnum["% of 1RM"]
  ) {
    randomSetLogDraft.prescription!.prPercentage = faker.number.int({
      min: 50,
      max: 90,
    });
  }

  randomSetLogDraft.weight = faker.number.int({
    min: 20,
    max: 200,
  });

  switch (prescriptionEnduranceCriteria) {
    case EnduranceCriteriaEnum.Reps:
      randomSetLogDraft.prescription!.minReps = faker.number.int({
        min: 5,
        max: 8,
      });
      break;
    case EnduranceCriteriaEnum["Reps Range"]:
      randomSetLogDraft.prescription!.minReps = faker.number.int({
        min: 5,
        max: 8,
      });
      randomSetLogDraft.prescription!.maxReps = faker.number.int({
        min: 8,
        max: 12,
      });
      break;
    case EnduranceCriteriaEnum.Time:
      randomSetLogDraft.prescription!.targetTime = faker.number.int({
        min: 30,
        max: 120,
      });
      break;
    case EnduranceCriteriaEnum["AMRAP"]:
      randomSetLogDraft.prescription!.isAMRAP = true;
      break;
  }

  if (enduranceCriteria === EnduranceCriteriaEnum.Reps) {
    randomSetLogDraft.reps = faker.number.int({
      min: 5,
      max: 8,
    });
  } else {
    randomSetLogDraft.time = faker.number.int({
      min: 30,
      max: 120,
    });
  }

  return randomSetLogDraft;
};
