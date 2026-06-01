import { MD3LightTheme, type MD3Theme } from 'react-native-paper';

export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0a7e53',
    secondary: '#1f6f8b',
    tertiary: '#ba5f06',
    background: '#f8faf7',
    surface: '#ffffff',
  },
};
