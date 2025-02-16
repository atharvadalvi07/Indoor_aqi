import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MenuItem, Select, FormControl, InputLabel, Tooltip, IconButton, Card } from "@mui/material";
import './globals.css';
import Co2DataCard from './components/co2data';
import GuidelineInfo from './guidelineInfo';
import LoadingJS from './components/Loading';
import config from './components/config';

async function fetchPythonBackendData(indoorImei, outdoorImei, guideline) {
  try {
    const res = await fetch(`${config.backendUrl}/data?imei=${indoorImei}&outdoor_imei=${outdoorImei}&guideline=${guideline}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return res.json();
  } catch (err) {
    console.error("Error fetching data from Python backend:", err);
    throw err;
  }
}

function App() {
  const [sensorData, setSensorData] = useState(null);
  const [outdoorData, setOutdoorData] = useState(null);
  const [co2Data, setCo2Data] = useState([]);
  const [outdoorCo2Data, setOutdoorCo2Data] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState('4C11AE131B88');
  const [selectedOutdoorDevice, setSelectedOutdoorDevice] = useState('2CF4328C5A18');
  const [selectedGuideline, setSelectedGuideline] = useState('ISHRAE_A');
  const [selectedIEWGuideline, setSelectedIEWGuideline] = useState('Wellness');
  const [lastRefreshTime, setLastRefreshTime] = useState('');
  const [dataFromChild, setDataFromChild] = useState("");

  const handleGuidelineChange = (event) => {
    setSelectedGuideline(event.target.value);
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleOutdoorDeviceChange = (event) => {
    setSelectedOutdoorDevice(event.target.value);
  };

  const handleIEWGuidelineChange = (event) => {
    setSelectedIEWGuideline(event.target.value);
  }

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }
  console.log("time", dataFromChild)

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPythonBackendData(selectedDevice, selectedOutdoorDevice, selectedIEWGuideline);
        setSensorData(data);
        setOutdoorData(data); 
        setCo2Data(data.co2_prev_day);
        setOutdoorCo2Data(data.co2_prev_day);
        console.log("sensor data", data);
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
        setLastRefreshTime(formattedDate);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
    //const interval = setInterval(getData, 6000000); // Fetch data every 5 minutes
    //return () => clearInterval(interval);
  }, [selectedDevice, selectedOutdoorDevice]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="page-header" style={{ scrollPaddingTop: '5px', paddingBottom: '5px' }}>
              <Card className=" pb-6 shadow-none rounded-none">
                <div className="flex items-center p-2">
                  <Link to="/">
                    <img
                      className="w-12 h-12 rounded-full"
                      height={48}
                      width={48}
                      src="respirer.png"
                      alt="Respirer logo"
                    />
                  </Link>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 10,
                    }}
                  >
                    <div
                      style={{
                        paddingTop: 7,
                        color: 'black',
                        fontSize: 24,
                        fontFamily: 'Calibri',
                        fontWeight: '700',
                        wordWrap: 'break-word',
                        paddingRight: 20,
                      }}
                    >
                      Indoor Air Quality Dashboard
                    </div>
                    <div className="flex gap-4">
                      <FormControl variant="outlined" style={{ minWidth: 200 }}>
                        <InputLabel id="device-select-label">Select Indoor Device</InputLabel>
                        <Select
                          labelId="device-select-label"
                          value={selectedDevice}
                          onChange={handleDeviceChange}
                          label="Select Indoor Device"
                        >
                          {/* <MenuItem value="18FE34E3DFC1">1st floor</MenuItem> */}
                          <MenuItem value="4C11AE131B88">Ground floor</MenuItem>
                        </Select>
                      </FormControl>
                      {/* <FormControl variant="outlined" style={{ minWidth: 200 }}>
                        <InputLabel id="outdoor-device-select-label">Select Outdoor Device</InputLabel>
                        <Select
                          labelId="outdoor-device-select-label"
                          value={selectedOutdoorDevice}
                          onChange={handleOutdoorDeviceChange}
                          label="Select Outdoor Device"
                        >
                          <MenuItem value="2CF4328C5A18">Outdoor Device 1</MenuItem>
                          <MenuItem value="500291EC2742">Outdoor Device 2</MenuItem>
                        </Select>
                      </FormControl> */}
                      <FormControl variant="outlined" style={{ minWidth: 200 }}>
                        <InputLabel id="device-select-label">Select IEW guideline</InputLabel>
                        <Select
                          labelId="device-select-label"
                          value={selectedIEWGuideline}
                          onChange={handleIEWGuidelineChange}
                          label="Select IEW guideline"
                        >
                          <MenuItem value="TC">Thermal Comfort Focus</MenuItem>
                          <MenuItem value="AQ">Air Quality Focus</MenuItem>
                          <MenuItem value="PP">Pollution Protection</MenuItem>
                          <MenuItem value="GG">Green Guardian</MenuItem>
                          <MenuItem value="Wellness">Overall Wellness</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="outlined" style={{ minWidth: 200 }}>
                        <InputLabel id="device-select-label">Select Compliance</InputLabel>
                        <Select
                          labelId="device-select-label"
                          value={selectedGuideline}
                          onChange={handleGuidelineChange}
                          label="Select Compliance"
                        >
                          <MenuItem value="ISHRAE_A">ISHRAE Class A</MenuItem>
                          <MenuItem value="ISHRAE_B">ISHRAE Class B</MenuItem>
                          <MenuItem value="ISHRAE_C">ISHRAE Class C</MenuItem>
                          <MenuItem value="LEED_min">LEED (min)</MenuItem>
                          <MenuItem value="LEED_EN">LEED (enhanced)</MenuItem>
                          <MenuItem value="RESET_min">RESET (min)</MenuItem>
                          <MenuItem value="RESET_hp">RESET (high performance)</MenuItem>
                          <MenuItem value="IGBC">IGBC</MenuItem>
                          {/* <MenuItem value="GRIHA">GRIHA</MenuItem> 
                          <MenuItem value="WHO">WHO</MenuItem>*/} 
                          <MenuItem value="ASHRAE">ASHRAE</MenuItem>
                          {/* <MenuItem value="US_EPA">US EPA</MenuItem> */}
                          <MenuItem value="NBC_INDIA">NBC INDIA</MenuItem>
                          <MenuItem value="WELL">WELL</MenuItem>
                        </Select>
                        
                      </FormControl>
                      <Tooltip
                        title={<GuidelineInfo selectedGuideline={selectedGuideline} />}
                        placement="right"
                      >
                        <IconButton>
                          <img
                            className=" p-0 w-10 h-10 rounded-full"
                            height={15}
                            width={15}
                            src="images.png"
                            alt="Information icon"
                          />
                        </IconButton>
                      </Tooltip>
                      
                      
                    </div>
                    <div style={{ display: 'flex', alignItems: 'right', marginLeft: 100}}>
                        <p>Last updated: {dataFromChild}</p>
                      </div>
                  </div>
                </div>
              </Card>
            </div>
          } />
        </Routes>
        <div style={{ padding: 20 }}>
          {loading ? (
            <p><LoadingJS /></p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : sensorData ? (
            <div>
              <Co2DataCard selectedDevice={selectedDevice} selectedOutdoorDevice={selectedOutdoorDevice} selectedGuideline={selectedGuideline} selectedIEWGuideline={selectedIEWGuideline} sendDataToParent={handleDataFromChild}/>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </Router>
    );
}

export default App;
