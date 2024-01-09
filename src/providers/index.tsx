import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "./theme";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </ThemeProvider>
  );
}
