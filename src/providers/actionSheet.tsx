import ActionSheet from "@/components/ActionSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { Keyboard } from "react-native";

export type Action = {
  name: string;
  callback: () => void;
  isDisabled?: boolean;
  disabledText?: string;
};

export type ActionSheetContextData = {
  openActionSheet: (actions: Action[]) => void;
};

export const ActionSheetContext = createContext<ActionSheetContextData>(
  {} as ActionSheetContextData
);

type ActionSheetProviderProps = {
  children: ReactNode;
};

export default function ActionSheetProvider({
  children,
}: ActionSheetProviderProps) {
  const [actions, setActions] = useState<
    {
      name: string;
      callback: () => void;
    }[]
  >([]);

  const actionSheetRef = useRef<BottomSheetModal>(null);

  const openActionSheet = (actions: Action[]) => {
    Keyboard.dismiss();
    setActions(actions);

    actionSheetRef.current?.present();
  };

  const onCloseActionSheet = () => {
    setActions([]);
  };

  return (
    <ActionSheetContext.Provider value={{ openActionSheet }}>
      {children}
      <ActionSheet
        ref={actionSheetRef}
        actions={actions}
        onCloseActionSheet={onCloseActionSheet}
      />
    </ActionSheetContext.Provider>
  );
}

export function useActionSheet() {
  return useContext(ActionSheetContext);
}
