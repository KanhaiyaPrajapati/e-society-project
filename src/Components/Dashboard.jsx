import React, { useEffect, useState } from "react";
import { Hoc } from "./Hoc";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import propertyimage from '../images/property1.png';
import Tenets from '../images/homeLogo4.png';
import manager from '../images/manager8.png';
import workers from '../images/manager7.png';
import blocksimg from '../images/Property.png';
import unitsimg from '../images/home3.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import Swal from 'sweetalert2';

function Dashboard() {
  const [dashboarddata, setdashboarddata] = useState('');
  const [blocks, setblocks] = useState('');
  const [units, setunits] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  let GetLoginAdminMangerResponse = JSON.parse(localStorage.getItem('LoginRes'));
  console.log(GetLoginAdminMangerResponse.userRole);
  let condition =GetLoginAdminMangerResponse.userRole;
  let token = JSON.parse(localStorage.getItem('token'));
  console.log(token);
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blocks/count/blocks', auth);
        console.log(response.data);
        setblocks(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUnitData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/units/available/units', auth);
        console.log(response.data);
        setunits(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUnitData();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/property/count/property', auth)
      .then((res) => {
        console.log(res.data);
        setdashboarddata(res.data);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }, []);
  
  useEffect(() => {
    if(condition === 'Admin' || condition === 'Manager' ){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: `${condition} Login SuccessFully`,
    });
    }
    else{
      console.log('User ID password is not Valid');
    }
  },[])

  const Data = [
    { id: 1, year: 2016, userGain: 80000, userLost: 823 },
    { id: 2, year: 2017, userGain: 45677, userLost: 345 },
    { id: 3, year: 2018, userGain: 78888, userLost: 555 },
    { id: 4, year: 2019, userGain: 90000, userLost: 4555 },
    { id: 5, year: 2020, userGain: 50000, userLost: 234 },
    { id: 6, year: 2021, userGain: 85000, userLost: 350 },
  ];

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [{
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
    }]
  });

  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  return (
    <>
    <div className="container-fluid">
        <div className="m-0 p-0 px-3 py-3 d-flex ">
          <div className="ms-2 mb-3" style={{ width: '100%', maxWidth: '60%' }} data-aos="fade-up-right">
            <div className="row">
              <div className="col-12 col-lg-4 col-sm-12 mb-3" data-aos='zoom-in-up'>
                <Card style={{ width: '18rem', height: '11rem' }} className="box1 ">
                  <Card.Body className="ms-2">
                    <Card.Img variant="top" src={propertyimage} className="img-fluid" style={{ maxWidth: '100px', maxHeight: '70px' }} />
                    <Card.Title>Properties</Card.Title>
                    <Card.Text>
                      <h3 className="mt-2 ms-2">{dashboarddata?.totalProperties}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 col-lg-4 col-sm-12 mb-3" data-aos='fade-down'>
                <Card style={{ width: '18rem', height: '11rem' }} className="box1 ">
                  <Card.Body className="mt-2 ms-2">
                    <Card.Img variant="top" src={manager} className="img-fluid mt-2" style={{ width: '85px', height: '55px' }} />
                    <Card.Title>Mangers</Card.Title>
                    <Card.Text>
                      <h3 className="mt-2 ms-2">{dashboarddata?.totalManagers}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 col-lg-4 col-sm-12 mb-3" data-aos='fade-up-right'>
                <Card style={{ width: '18rem', height: '11rem' }} className="box1 ">
                  <Card.Body className="mt-2 ms-2">
                    <Card.Img variant="top" src={workers} className="img-fluid mt-2" style={{ width: '85px', height: '50px' }} />
                    <Card.Title>Workers</Card.Title>
                    <Card.Text>
                      <h3 className="mt-2 ms-2">{dashboarddata?.totalWorkers}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 col-lg-4 col-sm-12 mb-3" data-aos="fade-up"
                data-aos-duration="3000">
                <Card style={{ width: '18rem', height: '11rem' }} className="box1 ">
                  <Card.Body className="ms-2">
                    <Card.Img variant="top" src={Tenets} className="img-fluid mt-2" style={{ width: '150px', height: '70px' }} />
                    <Card.Title>Tenats</Card.Title>
                    <Card.Text>
                      <h3 className="mt-2 ms-2">{dashboarddata?.totalTenants}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 col-lg-4 col-sm-12 mb-3" data-aos='zoom-in-up'>
                <Card style={{ width: '18rem', height: '11rem' }} className="box1 ">
                  <Card.Body className="mt-2 ms-2">
                    <Card.Img variant="top" src={blocksimg} className="img-fluid mt-2 mb-2 mt-2" style={{ width: '95px', height: '45px' }} />
                    <Card.Title>Blocks</Card.Title>
                    <Card.Text>
                      <h3 className="mt-2 ms-2">{blocks?.totalBlocks}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 col-lg-4 col-sm-12 mb-3" data-aos='zoom-in-left'>
                <Card style={{ width: '18rem', height: '11rem' }} className="box1 ">
                  <Card.Body className="mt-2 ms-2">
                    <Card.Img variant="top" src={unitsimg} className="img-fluid mt-2 mb-1" style={{ width: '100px', height: '55px' }} />
                    <Card.Title><span className="ms-3">Units</span> </Card.Title>
                    <Card.Text>
                      <h3 className="mt-2 ms-4">{units?.totalUnits}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <div className="box1 ms-2 mb-3 mt-1 border border-warning" style={{ width: '100%', maxWidth: '40%', height: '364px' }} data-aos="zoom-in-left">
            <div className="row">
              <div className="col-12 px-5">
                <ProgressBar striped variant="success" animated now={90} className="mt-5 mb-3" />
                <ProgressBar striped variant="info"    animated now={80} className="mb-4" />
                <ProgressBar striped variant="warning" animated now={70} className="mb-4" />
                <ProgressBar striped variant="danger"  animated now={60} className="mb-4" />
                <ProgressBar striped variant="success" animated now={50} className="mt-3 mb-4" />
                <ProgressBar striped variant="info"    animated now={45} className="mb-4" />
                <ProgressBar striped variant="warning" animated now={38} className="mb-4" />
                <ProgressBar striped variant="danger"  animated now={30} className="mb-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid charts border border-warning">
        <div className='d-flex justify-content-evenly mx-auto' style={{ width: '100%' }}   >
          <div className="chart-container mt-5" style={{ width: '33%', height: '300px', }}>
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: false, // Make the chart responsive
                plugins: {
                  title: {
                    display: true,
                    text: "Line Chart between 2016-2020"
                  }
                }
              }}
            />
          </div>
          <div className="chart-container mt-5" style={{ width: '33%' }}>
            <Radar
              data={chartData}
              options={{
                maintainAspectRatio: false, // Make the chart responsive
                plugins: {
                  title: {
                    display: true,
                    text: "Radar chart between 2020-2022"
                  }
                }
              }}
            />
          </div>
          <div className="chart-container mt-5" style={{ width: '33%' }}>
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: false, // Make the chart responsive
                plugins: {
                  title: {
                    display: true,
                    text: "Line chart between 2022-2024"
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
  </>
  );
}

export default Hoc(Dashboard);


// <div className='d-flex gap-1 py-3 mt-2 ms-auto' data-aos='fade-up'>
//     <div className="chart-container text-center px-4" style={{width:'33%',height:'300px'}}>

//       <Doughnut  className="text-center"
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Users Gained between 2016-2021"
//             }
//           }
//         }}
//       />
//     </div>

//   <div className="chart-container px-3 pt-3" style={{width:'50%',height:'350px'}}>
   
//       <Bar
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Users Gained between 2016-2021"
//             }
//           }
//         }}
//         />
//     </div>
//     <div className="chart-container text-center px-5 mt-2 ms-3" style={{width:'33%',height:'300px'}}>
    
//       <Pie  className="text-center"
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Users Gained between 2016-2021"
//             }
//           }
//         }}
//       />
//     </div>
//   </div>
