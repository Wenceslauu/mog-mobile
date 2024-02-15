import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

export default function IndexScreenPlaceholder() {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // Must ensure root navigator has mounted before trying to navigate
    if (rootNavigationState?.key) {
      // <Redirect> was mounting home twice, so we use router.push instead
      router.push("/home/following");
    }
  }, [rootNavigationState]);

  return null;
}
