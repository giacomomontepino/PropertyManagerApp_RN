import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../utils/colors";
import { useApi } from "../context/apiProvider";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";

//componenti
import SecondBarChart from "../components/secondBarChart";
import SlashScreen from "./slashScreen";
import GraficBarChart from "../components/graficBarChart";
import GraficPieChart from "../components/graficPieChart";
import FutureReservation from "../components/futureReservation";

export default function Home() {
  const { properties, currentUser, futureReservationsSum, totalTurnoverSum } =
    useApi();
  const [selectedProperty, setSelectedProperty] = useState(properties[0].name);
  const [showSlash, setShowSlash] = useState(true);


  const propertyNames = properties.map((prop) => prop.name);

  //per inviare le notifiche push
  const sendNotification = async () => {
    const response = await fetch("https://app.nativenotify.com/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appId: 29054,
        appToken: "eqVVQkbC9KvZcFxrpllUK8",
        title: "Fantastico",
        body: "Hai una nuova prenotazione!",
        dateSent: new Date().toLocaleString() 
      }),
    });
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlash(false);
      sendNotification();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSlash) {
    return <SlashScreen />;
  }




  return (
    <View style={styles.general}>
      <Text style={styles.title}>
        {currentUser.gender === "Male"
          ? `Bentornato ${currentUser.name}`
          : `Bentornata ${currentUser.name}`}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        decelerationRate="normal"
        scrollEventThrottle={20}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={styles.chart}>
          <GraficPieChart />
        </View>
        <Text style={styles.text}>Fatturato del mese</Text>
        <View style={styles.turnover}>
          <GraficBarChart selectedRoom={selectedProperty} />
          <View style={styles.firstBox}>
            <FutureReservation selectedRoom={selectedProperty} />
          </View>
        </View>
        <Picker
          selectedValue={selectedProperty}
          onValueChange={(itemValue) => setSelectedProperty(itemValue)}
          style={styles.picker}
        >
          {propertyNames.map((propertyName, index) => (
            <Picker.Item
              label={propertyName}
              value={propertyName}
              key={index}
            />
          ))}
        </Picker>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.text}>Fatturato da inizio anno</Text>
            <View style={styles.totalBox}>
              <Text style={styles.total}>{totalTurnoverSum}€</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Prenotazioni future totali</Text>
            <View style={styles.totalBox}>
              <Text style={styles.total}>{futureReservationsSum}€</Text>
            </View>
          </View>
        </View>
        <View style={styles.turnover}>
          <Text style={styles.text}>Fatturato Totale Mensile </Text>
          <SecondBarChart />
        </View>
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
  chart: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  turnover: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "50%",
    alignSelf: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  box: {
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: 162,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  firstBox: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
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
  totalBox: {
    margin: 10,
    padding: 20,
  },
  total: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
