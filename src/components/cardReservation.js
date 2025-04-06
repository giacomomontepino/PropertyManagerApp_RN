import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/colors";

export default function CardReservation({ reservation }) {

  const getImage = () => {
    switch (reservation.roomName) {
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

  const getOta = () => {
    switch (reservation.ota) {
      case "airbnb":
        return require("../../assets/airbnb.png");
      case "booking":
        return require("../../assets/booking.png");
      default:
        return require("../../assets/airbnb.png");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={getOta()} style={styles.ota} />
      <View>
        <Image source={getImage()} style={styles.image} />
      </View>
      <View style={styles.box1}>
        <Text style={styles.title}>{reservation.guestName}</Text>
        <Text style={styles.title}>{reservation.roomName}</Text>
        <View style={styles.boxDate}>
            <Text style={styles.text}>{reservation.checkInDate}</Text>
            <Text style={styles.text}>{reservation.checkOutDate}</Text>
        </View>
        <Text style={styles.text}>Guests: {reservation.guestsNumber}</Text>
        <View style={styles.box2}>
            <View style={styles.confermed}>
                <Text style={styles.text2}>Confermata</Text>
            </View>
            <Text style={styles.title}>{reservation.totalPrice}€</Text>
        </View>
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
    flexDirection: "row",
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
    width: 100,
    height: 150,
    borderRadius: 15,
  },
  ota: {
    width: 50,
    height: 50,
    zIndex: 1,
    position: "absolute",
    top: 12,
    right: 10,
  },
  box1: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  text: {
    marginRight: 20,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10
  },
  boxDate: {
    flexDirection: "row",
    justifyContent: "start",
  },
  box2: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },
  confermed: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#3DBF55",
    marginRight:30
  },
  text2: {
    fontSize: 15,
    fontWeight: "bold",
  }
});
