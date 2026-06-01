import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';
import { Screen } from '@/components/Screen';

export function SettingsScreen(): React.JSX.Element {
  const [locationSharing, setLocationSharing] = useState(false);

  return (
    <Screen>
      <Text variant="headlineMedium">Privacy Settings</Text>
      <View style={styles.row}>
        <List.Item
          title="Share my location with selected groups"
          style={styles.item}
          right={() => <Switch value={locationSharing} onValueChange={setLocationSharing} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 16,
  },
  item: {
    paddingHorizontal: 0,
  },
});
