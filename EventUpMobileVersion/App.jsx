import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box } from 'native-base';
import { auth } from './src/service/firebase';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import HeaderRightActions from './src/components/HeaderRightActions';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerScreenOptions = {
  headerStyle: { backgroundColor: '#000' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff',
  headerRight: () => <HeaderRightActions />,
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...headerScreenOptions,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'EventUp',
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={headerScreenOptions}>
      <Stack.Screen name="MainTabs" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerTitle: 'Event Details' }} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <NativeBaseProvider>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#FF6B6B" />
        </Box>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {user ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
