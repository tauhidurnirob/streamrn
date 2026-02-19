import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../features/home/HomeScreen';
import SearchScreen from '../../features/search/SearchScreen';
import WatchlistScreen from '../../features/watchlist/WatchlistScreen';
import ShowDetailsScreen from '../../features/details/ShowDetailsScreen';
import PlayerScreen from '../../features/player/PlayerScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator() as any;
const Tab = createBottomTabNavigator() as any;

const HomeStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ShowDetails" component={ShowDetailsScreen} options={{ title: 'Show Details' }} />
    <Stack.Screen name="Player" component={PlayerScreen} options={{ title: 'Player' }} />
  </Stack.Navigator>
);

const SearchStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="SearchMain" component={SearchScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ShowDetails" component={ShowDetailsScreen} options={{ title: 'Show Details' }} />
    <Stack.Screen name="Player" component={PlayerScreen} options={{ title: 'Player' }} />
  </Stack.Navigator>
);

const WatchlistStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="WatchlistMain" component={WatchlistScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ShowDetails" component={ShowDetailsScreen} options={{ title: 'Show Details' }} />
    <Stack.Screen name="Player" component={PlayerScreen} options={{ title: 'Player' }} />
  </Stack.Navigator>
);
const makeTabBarIcon = (routeName: string) => ({ color, size }: { color: string; size: number }) => {
  const emoji = routeName === 'Home' ? '🏠' : routeName === 'Search' ? '🔎' : '🔖';
  return <Text style={{ color, fontSize: size }}>{emoji}</Text>;
};

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: makeTabBarIcon('Home'), tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ tabBarIcon: makeTabBarIcon('Search'), tabBarLabel: 'Search' }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStack}
        options={{ tabBarIcon: makeTabBarIcon('Watchlist'), tabBarLabel: 'Watchlist' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
