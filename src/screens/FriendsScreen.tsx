import React from 'react';
import { Button, Text } from 'react-native';
import { Screen } from '@/components/Screen';

export function FriendsScreen(): React.JSX.Element {
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Friends</Text>
      <Text>Add friends by QR code before the event.</Text>
      <Button title="Scan QR Code" onPress={() => undefined} />
    </Screen>
  );
}
