import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/login";
import { ApiProvider } from "./src/context/api/apiProvider";
import Home from "./src/screens/home";


export default function App() {
  const Stack = createStackNavigator();

  return (
    <ApiProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  );
}
