import React, { PropsWithChildren } from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from './paperTheme';

export function AppProviders({ children }: PropsWithChildren): React.JSX.Element {
  // Keep global providers centralized as the app grows.
  return (
    <PaperProvider
      theme={paperTheme}
      settings={{
        icon: props => <MaterialDesignIcons {...props} />,
      }}
    >
      {children}
    </PaperProvider>
  );
}
