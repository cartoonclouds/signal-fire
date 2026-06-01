import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import App from '../App';

const appName = 'SignalFireWeb';

if (!('global' in globalThis)) {
  (globalThis as { global?: typeof globalThis }).global = globalThis;
}

AppRegistry.registerComponent(appName, () => App);

type WebAppRegistry = typeof AppRegistry & {
  getApplication: (name: string) => { element: React.ReactElement };
};

const rootTag = document.getElementById('root');
if (!rootTag) {
  throw new Error('Missing root element');
}

const { element } = (AppRegistry as WebAppRegistry).getApplication(appName);
createRoot(rootTag).render(element);
