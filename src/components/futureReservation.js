import { View, Text, StyleSheet } from "react-native";
import { useApi } from "../context/apiProvider";
import { colors } from "../utils/colors";

export default function FutureReservation({ selectedRoom }) {
  const { properties } = useApi();

  //Per trovare la proprietà selezionata
  const selectedProperty = properties?.find(
    (prop) => prop.name === selectedRoom
  );

  //Per controllare se esistono prenotazioni future
  const futureReservations = selectedProperty?.future_reservations;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Prenotazioni future:</Text>
      <Text style={styles.reservationText}>{futureReservations}€</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  reservationText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    margin: 10,
    padding: 20
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    textAlign: "center",
  },
});
