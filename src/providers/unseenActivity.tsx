import { ReactNode, createContext, useContext, useState } from "react";

export type UnseenActivityContextData = {
  hasUnseenActivity: boolean;
  hasUnseenNotifications: boolean;
  hasUnseenRequests: boolean;
};

export const UnseenActivityContext = createContext<UnseenActivityContextData>(
  {} as UnseenActivityContextData
);

type UnseenActivityProviderProps = {
  children: ReactNode;
};

export default function UnseenActivityProvider({
  children,
}: UnseenActivityProviderProps) {
  // TODO: Check if there are any unseen activity on load and keep track with Websocket afterwards
  // TODO: Change initial state to false
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true);
  const [hasUnseenRequests, setHasUnseenRequests] = useState(true);

  const hasUnseenActivity = hasUnseenNotifications || hasUnseenRequests;

  return (
    <UnseenActivityContext.Provider
      value={{ hasUnseenActivity, hasUnseenNotifications, hasUnseenRequests }}
    >
      {children}
    </UnseenActivityContext.Provider>
  );
}

export function useUnseenActivity() {
  return useContext(UnseenActivityContext);
}
