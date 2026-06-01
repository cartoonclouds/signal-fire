import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OverviewScreen } from '@/screens/OverviewScreen';
import { MapScreen } from '@/screens/MapScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { FriendsScreen } from '@/screens/FriendsScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Overview" component={OverviewScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
