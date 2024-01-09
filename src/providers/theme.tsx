import { ReactNode } from "react";
import { ThemeProvider as RestyleProvider } from "@shopify/restyle";
import { ThemeProvider as NavigationProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { reactNavigationTheme } from "@/constants/theme";
import { darkTheme, lightTheme } from "@/constants/theme";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <RestyleProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <NavigationProvider value={reactNavigationTheme[colorScheme]}>
        {children}
      </NavigationProvider>
    </RestyleProvider>
  );
}
