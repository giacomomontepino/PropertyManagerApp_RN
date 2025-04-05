import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export default function SlashScreen() {
  return (
    <View>
      <Image source={require("../../assets/loading.png")} style={styles.image} />
      <ActivityIndicator color={colors.primary} size={"large"} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
    marginTop: 120,
    zIndex: -1,
  },
  loader: {
    position: "absolute",
    top: "75%",
    left: "50%",
  }
});