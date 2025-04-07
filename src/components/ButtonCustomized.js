import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";

export default function ButtonCustomized({ text, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <Text style={styles.button}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    margin: 10
  },
  button: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
  },
});