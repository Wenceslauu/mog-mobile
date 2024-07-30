import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "./theme";
import CreateRoutineProvider from "./createRoutine";
import { ReactNode } from "react";
import ActionSheetProvider from "./actionSheet";
import UnseenNotificationsProvider from "./unseenActivity";
import OngoingLogProvider from "./ongoingLog";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <BottomSheetModalProvider>
        <ActionSheetProvider>
          <UnseenNotificationsProvider>
            <OngoingLogProvider>
              <CreateRoutineProvider>{children}</CreateRoutineProvider>
            </OngoingLogProvider>
          </UnseenNotificationsProvider>
        </ActionSheetProvider>
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
