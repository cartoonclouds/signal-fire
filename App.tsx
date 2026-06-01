import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppProviders } from './src/app/AppProviders';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </SafeAreaView>
      </AppProviders>
    </SafeAreaProvider>
  );
}
