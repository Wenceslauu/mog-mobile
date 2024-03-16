import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "./theme";
import CreateRoutineProvider from "./createRoutine";
import { ReactNode } from "react";
import ActionSheetProvider from "./actionSheet";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <BottomSheetModalProvider>
        <ActionSheetProvider>
          <CreateRoutineProvider>{children}</CreateRoutineProvider>
        </ActionSheetProvider>
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
