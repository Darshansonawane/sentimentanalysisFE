import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ positiveCnt, negativeCnt }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Positive", "Negative"],
          datasets: [
            {
              data: [positiveCnt, negativeCnt],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)", // Positive color
                "rgba(255, 99, 132, 0.6)", // Negative color
              ],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // You can add other options here
        },
      });
    }
  }, [positiveCnt, negativeCnt]);

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default PieChart;
