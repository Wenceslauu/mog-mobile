import Select from "@/components/Select";
import { Appearance, ThemeContext } from "@/providers/theme";
import { useContext } from "react";

export default function ThemeSettings() {
  const { appearance, setAppearance } = useContext(ThemeContext);

  return (
    <Select<Appearance>
      options={["System", "Light", "Dark"]}
      selected={appearance}
      setSelected={setAppearance}
    />
  );
}
