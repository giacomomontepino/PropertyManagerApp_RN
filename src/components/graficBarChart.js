import { BarChart } from "react-native-chart-kit";
import { useApi } from "../context/apiProvider";

export default function GraficBarChart({ selectedRoom }) {
  const { properties } = useApi();

  const prepareChartData = () => {
    if (selectedRoom) {
      const selectedProperty = properties.find(
        (prop) => prop.name === selectedRoom
      );

      return {
        labels: selectedProperty.turnover_trend.map((t) => t.monthly),
        datasets: [
          {
            data: selectedProperty.turnover_trend.map((t) => t.turnover),
          },
        ],
      };
    }

    return {
      labels: properties[0].turnover_trend.map((t) => t.monthly),
      datasets: [
        {
          data: properties[0].turnover_trend.map((t) => t.turnover),
        },
      ],
    };
  };

  const chartData = prepareChartData();

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
