import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./src/screens/login";
import { ApiProvider } from "./src/context/api/apiProvider";
import Home from "./src/screens/home";
import Profile from "./src/screens/profile";
import Reservation from "./src/screens/reservation";
import AccountStatement from "./src/screens/accountStatement";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "./src/screens/slashScreen";
import Structure from "./src/screens/structures";

//Creazione degli Stack Navigator per ogni sezione
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ReservationStack = createStackNavigator();
const AccountStatementStack = createStackNavigator();
const StructureStack = createStackNavigator();

//Componenti Stack per ogni tab
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

function ReservationStackScreen() {
  return (
    <ReservationStack.Navigator>
      <ReservationStack.Screen
        name="reservation"
        component={Reservation}
        options={{ headerShown: false }}
      />
    </ReservationStack.Navigator>
  );
}

function AccountStatementStackScreen() {
  return (
    <AccountStatementStack.Navigator>
      <AccountStatementStack.Screen
        name="accountStatement"
        component={AccountStatement}
        options={{ headerShown: false }}
      />
    </AccountStatementStack.Navigator>
  );
}

function StructureStackScreen() {
  return (
    <StructureStack.Navigator>
      <StructureStack.Screen
        name="structure"
        component={Structure}
        options={{ headerShown: false }}
      />
    </StructureStack.Navigator>
  );
}

//Creazione del Tab Navigator principale
function MainTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ReservationTab") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "AccountStatementTab") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "StructureTab") {
            iconName = focused ? "bed" : "bed-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="ReservationTab"
        component={ReservationStackScreen}
        options={{ tabBarLabel: "Prenotazioni" }}
      />
      <Tab.Screen
        name="AccountStatementTab"
        component={AccountStatementStackScreen}
        options={{ tabBarLabel: "Estratto Conto" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{ tabBarLabel: "Profilo" }}
      />
      <Tab.Screen
        name="StructureTab"
        component={StructureStackScreen}
        options={{ tabBarLabel: "Strutture" }}
      />
    </Tab.Navigator>
  );
}

//Stack Navigator principale
const MainStack = createStackNavigator();

export default function App() {
  return (
    <ApiProvider>
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MainApp"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  );
}
