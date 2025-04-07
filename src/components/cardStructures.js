import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/colors";

export default function CardStructures({ property }) {
  const getImage = () => {
    switch (property.name) {
      case "Mare Blu":
        return require("../../assets/mare-blu.png");
      case "Vista Lago":
        return require("../../assets/vista-lago.png");
      case "Alpine":
        return require("../../assets/alpine.png");
      default:
        return require("../../assets/mare-blu.png");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={getImage()} style={styles.image} />
      </View>
      <View style={styles.box1}>
        <Text style={styles.title}>{property.name}</Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.title}>Inizio collaborazione</Text>
        <Text style={styles.text}>{property.dateStartCollaboration}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
    flexDirection: "column",
    borderRadius: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 15,
  },
  box1: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 5,
  },
  box2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
