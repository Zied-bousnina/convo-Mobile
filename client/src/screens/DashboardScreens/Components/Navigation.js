// Navigation.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import FirstPage from '../SideBarComponents/FirstPage';
import SecondPage from '../SideBarComponents/SecondPage';


const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="FirstDrawerPage">
        <Drawer.Screen
          name="FirstDrawerPage"
          options={{ drawerLabel: 'First Page Option' }}
          component={FirstPage}
        />
        <Drawer.Screen
          name="SecondDrawerPage"
          options={{ drawerLabel: 'Second Page Option' }}
          component={SecondPage}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
