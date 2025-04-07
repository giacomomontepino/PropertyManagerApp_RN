import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../utils/colors";
import { useApi } from "../context/apiProvider";
import { useState, useEffect } from "react";

//componenti
import CardReservation from "../components/cardReservation";
import SlashScreen from "./slashScreen";

export default function Reservation() {
  const { reservations } = useApi();
  const [showSlash, setShowSlash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSlash) {
    return <SlashScreen />;
  }


  const reservationsArray = reservations?.reservations || [];

  return (
    <View style={styles.general}>
      <Text style={styles.title}>Prossime prenotazioni</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        decelerationRate="normal"
        scrollEventThrottle={20}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {reservationsArray.map((reservation, id) => (
          <CardReservation key={id} reservation={reservation} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  general: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    textAlign: "center",
    marginBottom: 20,
  },
});
