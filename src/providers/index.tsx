import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "./theme";
import CreateRoutineProvider from "./createRoutine";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <BottomSheetModalProvider>
        <CreateRoutineProvider>{children}</CreateRoutineProvider>
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
