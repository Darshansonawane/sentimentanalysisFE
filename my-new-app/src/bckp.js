// import logo from './logo.svg';
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import PieChart from "./chart";

function App() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  console.log("chartData", chartData);

  useEffect(() => {
    setLoading(true);

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/data");
      console.log("darshanResponse ", response);
      if (response.status === 200) {
        setChartData(response?.data);
        setLoading(false);
      }
      if (response.status !== 200) {
        setLoading(false);
        setIsError(true);
      }

      const ddata = {
        labels: ["Positive", "Negative"],
        datasets: [
          {
            data: [response.data.positiveCnt, response.data.negativeCnt],
            backgroundColor: ["#36a2eb", "#ff6384"],
            hoverBackgroundColor: ["#36a2eb", "#ff6384"],
          },
        ],
      };

      console.log("response.data ", response.data);
      // setChartData(ddata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <header className="Sentiment Analysis on Smart DigiBook">
        <h1>Welcome to Smart Digibook Sentiment Analysis..!</h1>
        {loading && !chartData && (
          <div>
            <div class="spinner-container">
              {/* <div class="spinner"></div> */}
            </div>

            {/* <h1>Breath.. Its Loading...!</h1> */}

            <img src="https://gifdb.com/images/high/moving-hands-loading-dknfn3tdw6bzwql7.gif" />
          </div>
        )}

        {isError && !loading && !chartData && (
          <div>Something went wrong please try again later!</div>
        )}

        {!loading && chartData && (
          <PieChart
            positiveCnt={chartData?.positiveCnt}
            negativeCnt={chartData?.negativeCnt}
          />
        )}
      </header>
    </div>
  );
}

export default App;
