import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Settings } from '../screens';

const Stack = createNativeStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
