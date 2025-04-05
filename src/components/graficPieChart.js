import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useApi } from "../context/api/apiProvider";
import { useEffect, useState } from "react";

export default function GraficPieChart() {
  const { properties } = useApi();
  const [chartData, setChartData] = useState([]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const updateChartData = properties.map((item) => ({
      name: item.name,
      occupation: item.employment_percentage,
      color: getRandomColor(),
      legendFontColor: "#888C91",
      legendFontSize: 15,
    }));

    setChartData(updateChartData);
  }, []);

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
  };

  return (
    <PieChart
      data={chartData}
      width={385}
      height={230}
      chartConfig={chartConfig}
      accessor="occupation"
      backgroundColor="transparent"
      paddingLeft="5"
      center={[15, 0]}
      absolute={false}
    />
  );
}
