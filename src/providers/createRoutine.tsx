import { randomRoutineDraftCreation } from "@/helpers/mocks/Routine";
import useImagePicker from "@/hooks/useImagePicker";
import { RoutineDraft } from "@/types/Routine";
import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";
import { DraftFunction, useImmer } from "use-immer";

export type CreateRoutineContextData = {
  routine: RoutineDraft;
  setRoutine: (
    immerRoutine: RoutineDraft | DraftFunction<RoutineDraft>
  ) => void;
  resetRoutine: () => void;

  isDirty: MutableRefObject<boolean>;

  image?: string;
  isLoadingImage: boolean;
  resetImage: () => void;
  generateChangeImageAlert: () => void;
};

export const CreateRoutineContext = createContext<CreateRoutineContextData>(
  {} as CreateRoutineContextData
);

type CreateRoutineProviderProps = {
  children: ReactNode;
};

// const mockedCreationRoutine = {
//   name: "",
//   description: "",
//   categories: [],
//   cycles: [
//     {
//       name: "New Cycle",
//       workouts: [
//         {
//           name: "New Workout",
//           exercises: [
//             {
//               id: 1,
//               name: "Bench Press",
//               image: "https://source.unsplash.com/random",
//               authorNotes: "Bend the bar!",
//               restDuration: 90,
//               sets: [
//                 {
//                   reps: undefined,
//                   intensity: undefined,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

const mockedCreationRoutine = randomRoutineDraftCreation;

export default function CreateRoutineProvider({
  children,
}: CreateRoutineProviderProps) {
  const [routine, setRoutine] = useImmer(mockedCreationRoutine);

  const { image, isLoadingImage, resetImage, generateChangeImageAlert } =
    useImagePicker([16, 9]);

  const isDirty = useRef(false);

  const resetRoutine = () => {
    setRoutine(mockedCreationRoutine);
    resetImage();
  };

  return (
    <CreateRoutineContext.Provider
      value={{
        routine,
        setRoutine,
        resetRoutine,
        isDirty,
        image,
        isLoadingImage,
        resetImage,
        generateChangeImageAlert,
      }}
    >
      {children}
    </CreateRoutineContext.Provider>
  );
}

export function useCreateRoutine() {
  return useContext(CreateRoutineContext);
}
