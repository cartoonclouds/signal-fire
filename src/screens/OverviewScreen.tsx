import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { Screen } from '@/components/Screen';

type OverviewProps = {
  navigation: {
    navigate: (route: string) => void;
  };
};

const screenCards = [
  {
    title: 'Map Screen',
    description: 'Offline map and friend location surface.',
    route: 'Map',
  },
  {
    title: 'Chat Screen',
    description: 'Group chat input and delivery flow.',
    route: 'Chat',
  },
  {
    title: 'Friends Screen',
    description: 'Friend invites and QR onboarding.',
    route: 'Friends',
  },
  {
    title: 'Settings Screen',
    description: 'Privacy controls and location sharing toggle.',
    route: 'Settings',
  },
];

export function OverviewScreen({ navigation }: OverviewProps): React.JSX.Element {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium">Component Overview</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          All existing app screens are listed here so you can quickly access each UI component set.
        </Text>

        <Card mode="outlined" style={styles.sharedCard}>
          <Card.Title title="Shared Screen Component" subtitle="src/components/Screen.tsx" />
          <Card.Content>
            <Text variant="bodyMedium">
              The Screen wrapper provides consistent spacing and layout for every screen below.
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.stack}>
          {screenCards.map(item => (
            <Card key={item.route} mode="contained" style={styles.card}>
              <Card.Title title={item.title} subtitle={item.description} />
              <Card.Actions>
                <Button mode="contained-tonal" onPress={() => navigation.navigate(item.route)}>
                  Open
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
    gap: 12,
  },
  subtitle: {
    opacity: 0.8,
  },
  sharedCard: {
    marginTop: 4,
  },
  stack: {
    gap: 10,
    marginTop: 4,
  },
  card: {
    borderRadius: 12,
  },
});
