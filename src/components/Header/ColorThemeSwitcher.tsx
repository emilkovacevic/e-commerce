"use client";

import { useColorThemeSwitcher } from "../../hooks/useColorTheme";

const ColorThemeSwitcher = () => {
  const { theme, handleThemeSwitch } = useColorThemeSwitcher();
  return (
    <button
      type="button"
      onClick={handleThemeSwitch}
      className="bg-indigo-500 hover:bg-indigo-700 text-lg p-3 px-[18px] rounded-md"
    >
      {theme === "dark" ? "🌙" : "🌞"}
    </button>
  );
};

export default ColorThemeSwitcher;
