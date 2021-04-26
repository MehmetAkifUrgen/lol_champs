import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false
}

const Router = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle} >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
            

        </Stack.Navigator>
    )
}

export default Router;