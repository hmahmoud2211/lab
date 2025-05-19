import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const Colors = {
  primary: {
    main: '#0366D6',
    light: '#4D94E9',
    dark: '#004BA0',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#00BFA5',
    light: '#5DF2D6',
    dark: '#008E76',
    contrast: '#FFFFFF',
  },
  accent: {
    main: '#6200EA',
    light: '#9E47FF',
    dark: '#0000B7',
    contrast: '#FFFFFF',
  },
  success: {
    main: '#00C853',
    light: '#5EFF82',
    dark: '#009624',
    contrast: '#FFFFFF',
  },
  warning: {
    main: '#FF6D00',
    light: '#FF9E40',
    dark: '#C43C00',
    contrast: '#FFFFFF',
  },
  error: {
    main: '#D50000',
    light: '#FF5131',
    dark: '#9B0000',
    contrast: '#FFFFFF',
  },
  light: {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#24292E',
    border: '#E1E4E8',
    disabled: '#959DA5',
    placeholder: '#8B949E',
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2D2D2D',
    text: '#E1E4E8',
    border: '#30363D',
    disabled: '#6E7681',
    placeholder: '#8B949E',
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary.main,
    primaryContainer: Colors.primary.light,
    secondary: Colors.secondary.main,
    secondaryContainer: Colors.secondary.light,
    tertiary: Colors.accent.main,
    tertiaryContainer: Colors.accent.light,
    error: Colors.error.main,
    errorContainer: Colors.error.light,
    background: Colors.light.background,
    surface: Colors.light.surface,
    onSurface: Colors.light.text,
    surfaceVariant: Colors.light.card,
    outline: Colors.light.border,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.primary.main,
    primaryContainer: Colors.primary.dark,
    secondary: Colors.secondary.main,
    secondaryContainer: Colors.secondary.dark,
    tertiary: Colors.accent.main,
    tertiaryContainer: Colors.accent.dark,
    error: Colors.error.main,
    errorContainer: Colors.error.dark,
    background: Colors.dark.background,
    surface: Colors.dark.surface,
    onSurface: Colors.dark.text,
    surfaceVariant: Colors.dark.card,
    outline: Colors.dark.border,
  },
};