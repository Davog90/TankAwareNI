import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ForecastScreen } from '../screens/ForecastScreen';
import { MarketScreen } from '../screens/MarketScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { useAlerts } from '../hooks';
import { colors, typography } from '../theme';
import type { RootTabParamList } from './types';

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

function MainTabs() {
  const { unreadCount } = useAlerts();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: ({ focused, color }) => {
          const icons = tabIcons[route.name];
          return (
            <Ionicons
              name={focused ? icons.active : icons.inactive}
              size={26}
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
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: styles.badge,
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <MainTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 88 : 72,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  tabItem: {
    paddingTop: 2,
  },
  tabLabel: {
    ...typography.tab,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.accent,
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    minWidth: 20,
    height: 20,
    lineHeight: 20,
    borderRadius: 10,
  },
});
