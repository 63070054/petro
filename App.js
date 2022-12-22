import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import LoginPage from './frontend/LoginPage';
import Register from './frontend/RegisterPage';
import Oils from './frontend/Oils';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculate from './frontend/CalculateOil';
import ShowOilPrice from './frontend/ShowOilPrice';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Login' component={LoginPage} />
          <Stack.Screen name='Register' component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Calculate></Calculate> */}
      {/* <ShowOilPrice></ShowOilPrice> */}
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
