import { useState, useEffect } from 'react';

export const useColorThemeSwitcher = () => {
	const [theme, setTheme] = useState("");

	const handleThemeSwitch = () => {
		if (theme === 'dark') {
			localStorage.setItem('theme', 'light');
			setTheme('light');
		} else {
			localStorage.setItem('theme', 'dark');
			setTheme('dark');
		}
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		if (
			savedTheme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			setTheme('dark');
			localStorage.setItem('theme', 'dark');
			document.documentElement.classList.add('dark');
		} else {
			setTheme('light');
			localStorage.setItem('theme', 'light');
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	return { theme, handleThemeSwitch };
};