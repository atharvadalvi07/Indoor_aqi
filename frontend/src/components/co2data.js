import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Snackbar, Alert, Button, IconButton} from '@mui/material';
import { ResponsiveContainer, AreaChart, defs, linearGradient, stop, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Area } from 'recharts';
import getColor from './colorscale';
import Co2BarChart from './barChart';
import AnimatedNumber from './AnimatedNumber';
import './index.css';
import GaugeChart from './gaugeChart';
import SpiderChart from './radarChart';
// import Slide from '@mui/material/Slide';
import config from './config';
import getGuidelineColor from './guidelineColor';
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Warning = ({ text }) => (
  <div className="warning">
    <span className="justify-between">{text}</span>
  </div>
);

// const AlertWarning = ({text}) => (
//   <div className="warning">
//     <AiOutlineWarning className="warning-icon" size={30}/>
//     <span className="warning-text">{text}</span>
//   </div>
// );

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

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

const theme = createTheme({
  palette: {
    grey: {
      main: '#757575',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '2px 4px',
          fontSize: '10px',
          minWidth: 'auto',
        },
        startIcon: {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});

const Co2DataCard = ({ selectedDevice, selectedOutdoorDevice, selectedGuideline, selectedIEWGuideline}) => {
    const [co2Data, setCo2Data] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [pm25Data, setPm25Data] = useState([]);
    const [tvocData, setTVOCData] = useState([]);
    const [sensorData, setSensorData] = useState({});
    const [showAdvice, setShowAdvice] = useState(false);
    const [adviceMessage, setAdviceMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [histCo2Data, setHistCo2Data] = useState([]);
    const [iew, setIewData] = useState([]);
    const [cachedSensorData, setCachedSensorData] = useState({});
    const [lastRefreshTime, setLastRefreshTime] = useState('');
    const [selectedPollutantData, setSelectedPollutantData] = useState({co2Data});
    const [selectedValue, setSelectedPollutantValue] = useState({});
    const [selectedGuide, setSelectedGuideValue] = useState({selectedGuideline});
    const [showGraph, setShowGraph] = useState(false);
    const [pollutantName, setPollutantName] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPythonBackendData(selectedDevice, selectedOutdoorDevice, selectedIEWGuideline);
        setCo2Data(data.co2_prev_day);
        setTempData(data.temp_prev_day);
        setHumidityData(data.humidity_prev_day);
        setPm25Data(data.pm25_prev_day);
        setTVOCData(data.TVOC_prev_day);

        setSensorData({
          timestamp: data.timestamp,
          indoor_co2: data.indoor_co2,
          indoor_pm25: data.indoor_pm25,
          indoor_temperature: data.indoor_temperature,
          humidity: data.humidity,
          tvoc: data.tvoc,
          outdoor_co2: data.outdoor_co2,
          co2_advice: data.co2_advice,
          temp_advice: data.temp_advice,
          aqi_advice: data.aqi_advice,
          iew: data.iew,
          iew_temp: data.iew_temp,
          iew_humidity: data.iew_humidity,
          iew_pm25: data.iew_pm25,
          iew_co2: data.iew_co2,
          iew_ach: data.iew_ach,
          iew_tvoc: data.iew_tvoc,
          wellness_index: data.wellness_index
        });

        setIewData(data.iew);
        console.log('iew', iew);

        setHistCo2Data(data.historical_co2_indoor);
        console.log('Historical CO2 Data:', data.historical_co2_indoor);
        setCachedSensorData(data);
        

        if (data.co2_advice) {
          setShowAdvice(true);
          setAdviceMessage(data.co2_advice);
        }

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
        
      } catch (error) {
        setError(error.message);
        if (Object.keys(cachedSensorData).length > 0) {
          setSensorData(cachedSensorData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, [selectedDevice, selectedOutdoorDevice, selectedIEWGuideline]);

  const getSafeValue = (value) => (isNaN(value) ? 0 : value);

  const handleClose = () => {
    setShowAdvice(false);
  };

  const guidelines = {
    ISHRAE_A: {
        co2: getSafeValue(sensorData.outdoor_co2) + 350,
        pm25: 15,
        temp: { min: 23, max: 27 },
        humidity: { min: 30, max: 70 },
        tvoc: 200,
    },
    ISHRAE_B: {
        co2: getSafeValue(sensorData.outdoor_co2) + 500,
        pm25: 25,
        temp: { min: 23, max: 27 },
        humidity: { min: 30, max: 70 },
        tvoc: 400,
    },
    ISHRAE_C: {
      co2: getSafeValue(sensorData.outdoor_co2) + 700,
      pm25: 25,
      temp: { min: 23, max: 27 },
      humidity: { min: 30, max: 70 },
      tvoc: 500,
  },
    LEED_min: {
      co2: 1000,
      pm25: 25,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 120,
  },
    LEED_EN: {
      co2: 800,
      pm25: 12,
      temp: { min: 23, max: 27 },
      humidity: { min: 30, max: 70 },
      tvoc: 'n/a',
    },
    RESET_min: {
      co2: 1000,
      pm25: 35,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 500,
    },
    RESET_hp: {
      co2: 600,
      pm25: 25,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 400,
    },
    IGBC: {
      co2: sensorData.outdoor_co2 + 530,
      pm25: 25,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 500,
    },
    GRIHA: {
      co2: 1000,
      pm25: 25,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 500,
    },
    WHO: {
      co2: 'n/a',
      pm25: 10,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 500,
    },
    ASHRAE: {
      co2: 1000,
      pm25: 15,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 'n/a',
    },
    US_EPA: {
      co2: 1000,
      pm25: 12,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 'n/a',
    },
    NBC_INDIA: {
      co2: 1000,
      pm25: 15,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 600,
    },
    WELL: {
      co2: 800,
      pm25: 15,
      temp: { min: 22, max: 28 },
      humidity: { min: 35, max: 65 },
      tvoc: 500,
    },
  };

  const selectedThresholds = guidelines[selectedGuideline];

  const handlePollutantClick = (pollutantData, colorValue, guide, name) => {
    setSelectedPollutantData(pollutantData);
    setSelectedPollutantValue(colorValue);
    setSelectedGuideValue(guide);
    setPollutantName(name);
    setShowGraph(true);
  };

  return (
    <Card className="p-2 m-1 shadow-none rounded-lg">
      <div className="flex gap-6">
        <div className="w-4/5 pb-0">
            {/* <CO2AreaChart 
                co2Data={selectedPollutantData} 
                sensorData={selectedValue} 
                selectedThresholds={selectedGuide} 
            /> */}
          {!showGraph ? (
            <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={co2Data}>
              <defs>
                <linearGradient id='co2level' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset="5%" stopColor={getGuidelineColor(sensorData.indoor_co2, 'co2', 'ISHRAE_A')} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={getGuidelineColor(sensorData.indoor_co2, 'co2', 'ISHRAE_A')} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => {
                  const hours = new Date(time).getHours();
                  return `${hours}`;
                }} 
              />
              <YAxis 
                label={{ 
                  value: `CO₂ conc in last 24 hrs`, 
                  angle: -90, 
                  position: 'Center', 
                  dx: -20, 
                  dy: 8 
                }} 
              />
              <Tooltip />
              <ReferenceLine 
                y={selectedThresholds.co2} 
                label={{ 
                  value: "Threshold limit", 
                  position: "insideRight", 
                  fill: "black", 
                  fontSize: 12, 
                  fontWeight: "bold", 
                  dy: -10 
                }} 
                stroke="red" 
                strokeDasharray="3 3" 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={getGuidelineColor(sensorData.indoor_co2, 'co2', 'ISHRAE_A')} 
                fill="url(#co2level)" 
                dot={true}
              />
            </AreaChart>
          </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={selectedPollutantData}>
                <defs>
                  <linearGradient id='co2level' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset="5%" stopColor={selectedValue} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={selectedValue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  tickFormatter={(time) => {
                    const hours = new Date(time).getHours();
                    return `${hours}`;
                  }} 
                />
                <YAxis 
                  label={{ 
                    value: `${pollutantName} in last 24 hrs`, 
                    angle: -90, 
                    position: 'Center', 
                    dx: -20, 
                    dy: 8 
                  }} 
                />
                <Tooltip />
                <ReferenceLine 
                  y={selectedGuide} 
                  label={{ 
                    value: "Threshold limit", 
                    position: "insideRight", 
                    fill: "black", 
                    fontSize: 12, 
                    fontWeight: "bold", 
                    dy: -10 
                  }} 
                  stroke="red" 
                  strokeDasharray="3 3" 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={selectedValue} 
                  fill="url(#co2level)" 
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className='w-1/5'>
          <Card className="shadow-none rounded-lg md:flex gap-6">
            <div className="p-2 flex justify-between w-full">
              <div className="ml-6">
                <p className="mt-[18px] text-l font-bold">Ambient CO<sub>2</sub> Levels (ppm)</p>
                <div className="pt-3">
                  {sensorData ? (
                    <h3 className="text-s">
                      Outdoor Carbon Dioxide levels
                    </h3>
                  ) : (
                    <Skeleton
                      varitant="text"
                      sx={{
                        fontSize: "30px !important",
                        lineHeight: "32px !important",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center ">
                <div className="border-l-2 border-gray-300 h-full ml-0 mr-4"></div>
                {sensorData ? (
                  <p className="text-3xl font-bold" style={{ color: getGuidelineColor(sensorData.outdoor_co2, 'co2', selectedGuideline) }}>
                    <AnimatedNumber value={getSafeValue(sensorData.outdoor_co2)} duration={1000} /> <span className="text-l align-text-bottom"> ppm </span>
                  </p>
                ) : (
                  <Skeleton
                    varitant="text"
                    sx={{
                      fontSize: "30px !important",
                      lineHeight: "32px !important",
                    }}
                  />
                )}
              </div>
            </div>
          </Card>

          <Card className="shadow-none rounded-lg md:flex gap-6">
            {sensorData.temp_advice && <Warning text={sensorData.temp_advice} />}
            {sensorData.aqi_advice && <Warning text={sensorData.aqi_advice} />}
          </Card>
        </div>
      </div>
      <div className="flex overflow-x-auto">
        <Card className=" shadow-none rounded-lg flex gap-6">
          <div>
            <Card className="shadow-none rounded-lg flex p-0">
            
              <div className="flex justify-between w-full ">
                <div className="ml-6 mr-0">
                  <p className="mt-[18px] text-l font-bold" style={{color:'black'}}>CO<sub>2</sub> Levels (ppm)</p>
                  <div className="">
                    {sensorData ? (
                      <h3 className="text-s ">
                        Indoor threshold limit: <span className='text-red-500'>{selectedThresholds.co2} ppm</span>
                        
                      </h3>
                      
                    ) : (
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: "30px !important",
                          lineHeight: "32px !important",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="border-l-2 border-gray-300 h-full"></div>
                  {sensorData ? (
                    <p className="text-3xl font-bold ml-2 mr-0" style={{ color: getGuidelineColor(sensorData.indoor_co2, 'co2', selectedGuideline) }}>
                      <AnimatedNumber value={getSafeValue(sensorData.indoor_co2)} duration={1000} /> <span className="text-l align-text-bottom"> ppm </span>
                      <ThemeProvider theme={theme}>
                      <p><Button 
                        variant="outlined" 
                        color="grey" 
                        size='small' 
                        sx={{ padding: 1, fontSize: '10px', minWidth: 'auto' }}
                        onClick={() => handlePollutantClick(co2Data, getGuidelineColor(sensorData.indoor_co2, 'co2', selectedGuideline), selectedThresholds.co2, 'CO₂ conc')}>
                      <ShowChartIcon sx={{ padding: 0, margin: 0 }}/>
                      </Button></p>
                      </ThemeProvider>
                    </p>
                  ) : (
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "30px !important",
                        lineHeight: "32px !important",
                      }}
                    />
                  )}
                </div>
                
              </div>
              
            {/* </Button> */}
            </Card>
          </div>
          <div>
            <Card className="shadow-none rounded-lg flex gap-6">
              <div className="flex justify-between w-full">
                <div className="ml-6 mr-0">
                  <p className="mt-[18px] text-l font-bold">PM<sub>2.5</sub> Concentration</p>
                  <div className="mr-0">
                    {sensorData ? (
                      <h3 className=" text-s">Indoor threshold limit: <span className='text-red-500'>{selectedThresholds.pm25} µg/m³</span>
                      
                      </h3>
                    ) : (
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: "30px !important",
                          lineHeight: "32px !important",
                        }}
                      />
                    )}
                    
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="border-l-2 border-gray-300 h-full"></div>
                  {sensorData ? (
                    <p className="text-3xl font-bold ml-2" style={{ color: getGuidelineColor(sensorData.indoor_pm25, 'pm25', selectedGuideline) }}>
                      <AnimatedNumber value={getSafeValue(sensorData.indoor_pm25)} duration={1000} /> <span className="text-l align-text-bottom"> µg/m³ </span>
                      <ThemeProvider theme={theme}>
                      <p><Button variant="outlined" 
                        color="grey" 
                        size='small' 
                        sx={{ padding: 1, fontSize: '10px', minWidth: 'auto'}}
                        onClick={() => handlePollutantClick(pm25Data, getGuidelineColor(sensorData.indoor_pm25, 'pm25', selectedGuideline), selectedThresholds.pm25, "PM<sub>2.5</sub> conc")}>
                        <ShowChartIcon sx={{ padding: 0, margin: 0 }}/>
                      </Button></p>
                      </ThemeProvider>
                    </p>
                    
                  ) : (
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "30px !important",
                        lineHeight: "32px !important",
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="shadow-none rounded-lg flex gap-6">
              <div className="flex justify-between w-full">
                <div className="ml-6 mr-0">
                  <p className="mt-[18px] text-l font-bold">Zone air temperature</p>
                  <div className="mr-0">
                    {sensorData ? (
                      <h3 className="text-s">Comfort range: <span className='text-green-500'>{selectedThresholds.temp.min}°C - {selectedThresholds.temp.max}°C</span>
                      
                      </h3>
                    ) : (
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: "30px !important",
                          lineHeight: "32px !important",
                        }}
                      />
                    )}

                  </div>
                </div>
                <div className="flex items-center">
                  <div className="border-l-2 border-gray-300 h-full"></div>
                  {sensorData ? (
                    <p className="text-3xl font-bold ml-2" style={{ color: getGuidelineColor(sensorData.indoor_temperature, 'temp', selectedGuideline) }}>
                      <AnimatedNumber value={getSafeValue(sensorData.indoor_temperature)} duration={1000} /> <span className="text-l align-text-bottom"> °C </span>
                      <ThemeProvider theme={theme}>
                      <p><Button variant="outlined" 
                        color="grey" 
                        size='small' 
                        sx={{ padding: 1, fontSize: '10px', minWidth: 'auto' }}
                        onClick={() => handlePollutantClick(tempData, getGuidelineColor(sensorData.indoor_temperature, 'temp', selectedGuideline), 23, "Temperature value")}>
                        <ShowChartIcon sx={{ padding: 0, margin: 0 }}/>
                      </Button></p>
                      </ThemeProvider>
                    </p>
                  ) : (
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "30px !important",
                        lineHeight: "32px !important",
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="shadow-none rounded-lg flex gap-6">
              <div className="flex justify-between w-full">
                <div className="ml-6 mr-0">
                  <p className="mt-[18px] text-l font-bold">Humidity</p>
                  <div className="mr-0">
                    {sensorData ? (
                      <h3 className=" text-s">Comfort range: <span className='text-green-500'>{selectedThresholds.humidity.min}% - {selectedThresholds.humidity.max}%</span>
                      
                      </h3>
                    ) : (
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: "30px !important",
                          lineHeight: "32px !important",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="border-l-2 border-gray-300 h-full"></div>
                  {sensorData ? (
                    <p className="text-3xl font-bold ml-2" style={{ color: getGuidelineColor(sensorData.humidity, 'humidity', selectedGuideline) }}>
                      <AnimatedNumber value={getSafeValue(sensorData.humidity)} duration={1000} /> 
                      <p></p><span className="text-l align-text-bottom"> % </span>
                      <ThemeProvider theme={theme}>
                      <p><Button variant="outlined" 
                        color="grey" 
                        size='small' 
                        sx={{ padding: 1, fontSize: '10px', minWidth: 'auto' }}
                        onClick={() => handlePollutantClick(humidityData, getGuidelineColor(sensorData.humidity, 'humidity', selectedGuideline), 70, "Humidity value")}>
                        <ShowChartIcon sx={{ padding: 0, margin: 0 }}/>
                      </Button></p>
                      </ThemeProvider>
                    </p>
                  ) : (
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "30px !important",
                        lineHeight: "32px !important",
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="shadow-none rounded-lg flex p-0">
              <div className="flex justify-between w-full ">
                <div className="ml-6 mr-0">
                  <p className="mt-[18px] text-l font-bold">TVOC index</p>
                  <div className="">
                    {sensorData ? (
                      <h3 className="text-s">
                        Indoor threshold limit: <span className='text-red-500'>{selectedThresholds.tvoc} µg/m³</span>
                        
                      </h3>
                    ) : (
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: "30px !important",
                          lineHeight: "32px !important",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="border-l-2 border-gray-300 h-full"></div>
                  {sensorData ? (
                    <p className="text-3xl font-bold ml-2 mr-0" style={{ color: getGuidelineColor(sensorData.tvoc, 'tvoc', selectedGuideline) }}>
                      <AnimatedNumber value={getSafeValue(sensorData.tvoc)} duration={1000} /> <span className="text-l align-text-bottom"> µg/m³</span>
                      <ThemeProvider theme={theme}>
                      <p ><Button variant="outlined" 
                        color="grey" 
                        size='small' 
                        sx={{ padding: 1, fontSize: '10px', minWidth: 'auto' }}
                        onClick={() => handlePollutantClick(tvocData, getGuidelineColor(sensorData.tvoc, 'tvoc', selectedGuideline), selectedThresholds.tvoc, "TVOC")}>
                      <ShowChartIcon sx={{ padding: 0, margin: 0 }}/>
                      </Button></p>
                      </ThemeProvider>
                    </p>
                  ) : (
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "30px !important",
                        lineHeight: "32px !important",
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
      <div className="charts-container">
        <div className='chart-wrapper flex '>
            <GaugeChart value = {sensorData.wellness_index}/>
            <SpiderChart data = {sensorData} color={getGuidelineColor(sensorData.wellness_index, 'iew', selectedGuideline)}/>   
        </div>
        <div className="chart-wrapper">
          <Co2BarChart co2Data={histCo2Data} /> 
        </div>
      </div>
      
      {/* <Dialog
        open={showAdvice}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >Advice to maintain air quality</DialogTitle>
        <DialogContent>
          <AlertWarning text={adviceMessage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>  */}

      {sensorData.co2_advice && (
        <Snackbar open={showAdvice} autoHideDuration={null} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2em', alignItems: 'center', justifyContent: 'center' }}>
            {adviceMessage}
          </Alert>
        </Snackbar>
      )}
    </Card>
  );
};

export default Co2DataCard;