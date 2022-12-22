import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Tab } from '@ui-kitten/components';
import LoginPage from './frontend/LoginPage';
import Register from './frontend/RegisterPage';
import Oils from './frontend/Oils';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Calculate from './frontend/CalculateOil';
import ShowOilPrice from './frontend/ShowOilPrice';
import MemoRoute from './frontend/MemoRoute';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MenuTab({route}) {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#E84545", tabBarShowLabel: false }}>
      <Tabs.Screen name="ShowOils" component={ShowOilPrice} initialParams={{ username: route.params.username }} options={{
        tabBarActiveBackgroundColor: "white",
        tabBarIcon: ({ color, size }) => {
          return <MaterialCommunityIcons name="oil" size={size} color={color} />;
        },
      }} />
      <Tabs.Screen name="Calculate" component={Calculate} initialParams={{ username: route.params.username }} options={{
        tabBarActiveBackgroundColor: "white",
        tabBarIcon: ({ color, size }) => {
          return <MaterialCommunityIcons name="calculator-variant-outline" size={size} color={color} />;
        },
      }} />
      <Tabs.Screen name="route" component={MemoRoute} initialParams={{ username: route.params.username }} options={{
        unmountOnBlur: true, tabBarActiveBackgroundColor: "white",
        tabBarIcon: ({ color, size }) => {
          return <MaterialCommunityIcons name="map-clock" size={size} color={color} />;
        },
      }} />
    </Tabs.Navigator>
  )
}
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={LoginPage} />
          <Stack.Screen name='Register' component={Register}/>
          <Stack.Screen name='Tab' component={MenuTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
