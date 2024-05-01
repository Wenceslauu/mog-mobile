import {
  ExerciseDraft,
  ExerciseForceEnum,
  ExerciseMechanicEnum,
  ExercisePreview,
  ExerciseSelection,
  ExerciseSimple,
  ExerciseTargetMuscleEnum,
} from "@/types/Exercise";
import { faker } from "@faker-js/faker";

export const createRandomExerciseSimple = (): ExerciseSimple => {
  return {
    id: faker.string.uuid(),
    name: faker.vehicle.manufacturer(),
    image: faker.image.urlLoremFlickr({
      category: "gym",
    }),
  };
};

export const createRandomExercisePreview = (): ExercisePreview => {
  return {
    id: faker.string.uuid(),
    name: faker.vehicle.manufacturer(),
    image: faker.image.urlLoremFlickr({
      category: "gym",
    }),
    targetMuscle: faker.helpers.enumValue(ExerciseTargetMuscleEnum),
    mechanic: faker.helpers.enumValue(ExerciseMechanicEnum),
    force: faker.helpers.enumValue(ExerciseForceEnum),
    isFavorite: faker.datatype.boolean(),
  };
};

export const createRandomExerciseSelection = (): ExerciseSelection => {
  return {
    id: faker.string.uuid(),
    name: faker.animal.dog(),
    image: faker.image.urlLoremFlickr({
      category: "gym",
    }),
    isFavorite: faker.datatype.boolean(),
    targetMuscle: faker.helpers.enumValue(ExerciseTargetMuscleEnum),
  };
};

export const createRandomExerciseDraft = (): ExerciseDraft => {
  return {
    id: faker.string.uuid(),
    name: faker.vehicle.manufacturer(),
    instructions: faker.lorem.paragraph(),
    image: faker.image.urlLoremFlickr({
      category: "gym",
    }),
    targetMuscle: faker.helpers.enumValue(ExerciseTargetMuscleEnum),
    mechanic: faker.helpers.enumValue(ExerciseMechanicEnum),
    force: faker.helpers.enumValue(ExerciseForceEnum),
  };
};
