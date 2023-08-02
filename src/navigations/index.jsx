import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthNavigator from './auth';
import TabsNavigator from './tabs';

function RootNavigator() {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      {user?.localId ? <TabsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default RootNavigator;
