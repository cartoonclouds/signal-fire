import React from 'react';
import { Text } from 'react-native';
import { Screen } from '@/components/Screen';

export function MapScreen(): React.JSX.Element {
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Festival Map</Text>
      <Text>Offline map and friends’ last-known locations go here.</Text>
    </Screen>
  );
}
