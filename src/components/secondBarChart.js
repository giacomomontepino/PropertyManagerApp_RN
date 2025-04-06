import { BarChart } from "react-native-chart-kit";
import { useApi } from "../context/apiProvider";

export default function SecondBarChart() {
  const { totalTurnoverByMonth } = useApi();

  const chartData = {
    labels: Object.keys(totalTurnoverByMonth),
    datasets: [
      {
        data: Object.values(totalTurnoverByMonth),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 0.5) => `rgba(0, 0, 73, ${opacity})`,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  const chartStyle = {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 10,
  };

  return (
    <BarChart
      style={chartStyle}
      data={chartData}
      width={360}
      height={220}
      chartConfig={chartConfig}
      showValuesOnTopOfBars={true}
    />
  );
}
