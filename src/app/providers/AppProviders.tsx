import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '../store/store';

type Props = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </ReduxProvider>
  );
};

export default AppProviders;
