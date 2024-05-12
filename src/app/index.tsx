import { Redirect, useRootNavigationState } from "expo-router";

export default function IndexScreenPlaceholder() {
  // https://github.com/expo/router/issues/740
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={"/home/following"} />;
}
