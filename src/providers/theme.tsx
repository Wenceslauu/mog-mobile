import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ThemeProvider as RestyleProvider } from "@shopify/restyle";
import { ThemeProvider as NavigationProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { reactNavigationTheme } from "@/constants/theme";
import { darkTheme, lightTheme } from "@/constants/theme";

export type Appearance = "System" | "Light" | "Dark";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeProviderData = {
  appearance: Appearance;
  setAppearance: Dispatch<SetStateAction<Appearance>>;
};

export const ThemeContext = createContext<ThemeProviderData>(
  {} as ThemeProviderData
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemTheme = useColorScheme() ?? "light";

  // Theme stands for different color schemes, i.e. light and dark

  // Appearance conveys how the user wants the color schemes to be applied, i.e.
  // manually, or automatically based on the system
  const [appearance, setAppearance] = useState<Appearance>("System");

  const darkMode =
    appearance === "System"
      ? systemTheme === "dark"
      : appearance === "Dark";

  return (
    <ThemeContext.Provider value={{ appearance, setAppearance }}>
      <RestyleProvider theme={darkMode ? darkTheme : lightTheme}>
        <NavigationProvider
          value={
            darkMode ? reactNavigationTheme.dark : reactNavigationTheme.light
          }
        >
          {children}
        </NavigationProvider>
      </RestyleProvider>
    </ThemeContext.Provider>
  );
}
