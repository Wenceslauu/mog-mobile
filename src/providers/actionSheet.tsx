import ActionSheet from "@/components/ActionSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, createContext, useContext, useRef, useState } from "react";

export type ActionSheetContextData = {
  openActionSheet: (
    actions: {
      name: string;
      callback: () => void;
    }[]
  ) => void;
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

  const openActionSheet = (
    actions: {
      name: string;
      callback: () => void;
    }[]
  ) => {
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
