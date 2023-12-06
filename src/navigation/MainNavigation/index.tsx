import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen} from '../../screens/MainScreen';
import {PersonModal} from '../../modals/PersonModal';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="PersonModal"
          component={PersonModal}
          options={{
            headerShown: false,
            headerTransparent: true,
            contentStyle: {
              marginTop: '10%',
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
