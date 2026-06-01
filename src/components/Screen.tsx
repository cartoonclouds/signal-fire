import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

export function Screen({ children }: PropsWithChildren): React.JSX.Element {
  return <View style={{ flex: 1, padding: 16 }}>{children}</View>;
}
