import { Text, View, StyleSheet, ScrollView } from "react-native";
import CardStatement from "../components/cardStatement";
import { colors } from "../utils/colors";
import { useApi } from "../context/apiProvider";

export default function AccountStatement() {
  const { properties, totalTurnoverByMonth } = useApi();

  //per estrarre fee e nome struttura
  const fee = properties.map((prop) => ({
    name: prop.name,
    fee: prop.fee,
  }));

  //per estrarre i mesi di guadagni
  const month = Object.keys(totalTurnoverByMonth);

  //per calcolare il totale guadagnato diviso in mesi
  const turnoverTrend = properties.map((prop) => prop.turnover_trend);
  const feeForRoom = properties.map((prop) => prop.fee);

  const totalWithoutFee = turnoverTrend.map((trend, index) => {
    return trend.map((month) => {
      return {
        monthly: month.monthly,
        turnover: (month.turnover * feeForRoom[index]) / 100,
      };
    });
  });

  //per sommare tutti i totali guadagnati al mese per ogni struttura
  const totalEarn = totalWithoutFee.reduce((acc, curr) => {
    curr.forEach((trend) => {
      acc[trend.monthly] = acc[trend.monthly] || 0;
      acc[trend.monthly] += trend.turnover;
    });
    return acc;
  }, {});
  

  return (
    <View style={styles.general}>
      <Text style={styles.title}>Estratto conto</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        decelerationRate="normal"
        scrollEventThrottle={20}
        contentContainerStyle={{ width: "90%" }}
      >
        {month.map((m) => (
          <CardStatement
            key={m}
            month={m}
            totalTurnover={totalTurnoverByMonth[m]}
            totalEarn={totalEarn[m]}
            fee={fee}
          />
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
