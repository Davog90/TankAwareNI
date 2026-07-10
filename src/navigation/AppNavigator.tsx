import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ForecastScreen } from '../screens/ForecastScreen';
import { MarketScreen } from '../screens/MarketScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { colors, typography } from '../theme';
import type { RootTabParamList } from './types';
import { alerts } from '../data/mockData';

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

type IconName = keyof typeof Ionicons.glyphMap;

const tabIcons: Record<
  keyof RootTabParamList,
  { active: IconName; inactive: IconName }
> = {
  Dashboard: { active: 'home', inactive: 'home-outline' },
  Forecast: { active: 'calendar', inactive: 'calendar-outline' },
  Market: { active: 'trending-up', inactive: 'trending-up-outline' },
  Alerts: { active: 'notifications', inactive: 'notifications-outline' },
};

const unreadAlerts = alerts.filter((alert) => !alert.read).length;

export function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarLabelStyle: styles.tabLabel,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused, color, size }) => {
            const icons = tabIcons[route.name];
            return (
              <Ionicons
                name={focused ? icons.active : icons.inactive}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen name="Forecast" component={ForecastScreen} />
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{
            tabBarBadge: unreadAlerts > 0 ? unreadAlerts : undefined,
            tabBarBadgeStyle: styles.badge,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingTop: 6,
    paddingBottom: 8,
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
  },
  tabLabel: {
    ...typography.tab,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.accent,
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
