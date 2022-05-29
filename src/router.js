import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'

const Stack = createStackNavigator();
const screenOptionStyle = {
    
}

const Router = (props) => {
    return(
        <Stack.Navigator screenOptions={{
            headerTitleAlign:'center'
        }} >
            <Stack.Screen options={{title:'League of Legends'}} name="Home" component={Home} />
            <Stack.Screen  name="Detail" component={Detail} />
            

        </Stack.Navigator>
    )
}

export default Router;