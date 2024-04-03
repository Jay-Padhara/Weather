import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import Weather from './Screens/Weather';
import BootSplash from 'react-native-bootsplash';

export default function App() {
  const stack = createNativeStackNavigator();

  useEffect(() => {
    BootSplash.hide();
  }, []);

  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <stack.Screen name="Weather" component={Weather} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
