import React, { useState } from "react";
import {Hoc} from "./Hoc";
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

function Dashboard() {
  const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 50000,
      userLost: 234
    },
    {
      id: 6,
      year: 2021,
      userGain: 85000,
      userLost: 350
    },
   ];
   const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "grey",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "black",
          "yellow",
          "pink"
        ],
        borderColor: "black",
        borderWidth: 1.5
      }
    ]
  });
  return (
    <>
    <div className='d-flex gap-1 py-3 mt-2'>
    
    <div className="chart-container text-center px-4" style={{width:'33%',height:'300px'}}>
      {/* <h3 style={{ textAlign: "center" }}>Pie Chart</h3> */}
      <Doughnut  className="text-center"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2021"
            }
          }
        }}
      />
    </div>

  <div className="chart-container px-3 pt-3" style={{width:'50%',height:'350px'}}>
      {/* <h3 style={{ textAlign: "center" }}> Doughnut Chart</h3> */}
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2021"
            }
          }
        }}
        />
    </div>
    <div className="chart-container text-center px-5 mt-2 ms-3" style={{width:'33%',height:'300px'}}>
      {/* <h3 style={{ textAlign: "center" }}>Pie Chart</h3> */}
      <Pie  className="text-center"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2021"
            }
          }
        }}
      />
    </div>
  </div>   
  {/* line chart */}


  <div className='d-flex justify-content-space-evenly g-2 mt-5' style={{height:'400px'}}>
    <div className="chart-container">
      <Line style={{height:'380px',width:"21%"}}
        data={chartData}
        options={{
          plugins: {
            title: {
              // display: true,
              // text: "Users Gained between 2016-2020"
            }
          }
        }}
        />
    </div>   
    <div className="chart-container">
      <Radar style={{height:'180px',width:"25%"}}
        data={chartData}
        options={{
          plugins: {
            title: {
              // display: true,
              // text: "Users Gained between 2016-2020"
            }
          }
        }}
        />
    </div>  
    <div className="chart-container">
      <Line style={{height:'380px',width:"10%"}}
        data={chartData}
        options={{
          plugins: {
            title: {
              // display: true,
              // text: "Users Gained between 2016-2020"
            }
          }
        }}
        />
    </div>     

    </div>
    </>
  );
}

export default Hoc(Dashboard);
