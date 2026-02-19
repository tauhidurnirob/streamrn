/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProviders } from './src/app/providers/AppProviders';
import MainNavigator from './src/app/navigation/MainNavigator';
import AppLayout from './src/app/layout/AppLayout';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppProviders>
          <AppContent />
        </AppProviders>
    </SafeAreaProvider>
  );
}

function AppContent() {

  return (
    <AppLayout>
      <MainNavigator />
    </AppLayout>
  );
}

export default App;
