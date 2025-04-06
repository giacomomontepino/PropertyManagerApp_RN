import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useApi } from "../context/apiProvider";
import ButtonCustomized from "../components/ButtonCustomized";
import { colors } from "../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const { login } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      await AsyncStorage.setItem("usersSession", JSON.stringify(result));
      navigation.navigate("MainApp");
    }

    setEmail("");
    setPassword("");
  };

  const checkUserSession = async () => {
    const session = await AsyncStorage.getItem("usersSession");
    if (session) {
      navigation.navigate("MainApp");
    } 
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <View style={styles.general}>
      <View style={styles.container}>
        <Text style={styles.logo}>Rently</Text>
        <Text>Hey, siamo felici di rivederti 👋🏻</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Indirizzo Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <ButtonCustomized text="Accedi" onPress={handleLogin} />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>Password dimenticata?</Text>
          <Text style={styles.text}>Non sei ancora registrato? Registrati</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  general: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "80%",
    backgroundColor: colors.secondary,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 40,
    fontWeight: "bold",
    color: colors.primary,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
  },
  textError: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    paddingLeft: 4,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
  },
});
