import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/colors";

export default function CardStatement({
  month,
  totalEarn,
  fee,
  totalTurnover,
}) {

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/calendar.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{month}</Text>
        <Text style={styles.text}>Importo totale: € {totalTurnover}</Text>
        <View style={styles.feeContainer}>
          {fee.map((f, index) => (
            <Text key={index} style={styles.textFee}>
              {f.name}: {f.fee}%
            </Text>
          ))}
        </View>
        <Text style={styles.total}>Importo erogato: € {totalEarn}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 10,
    alignItems: "center",
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
    height: 100,
    borderRadius: 15,
  },
  box: {
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  text: {
    marginRight: 13,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
  },
  textFee: {
    marginRight: 13,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
    color: "grey"
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 5,
  },
  feeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start"
  },
});
