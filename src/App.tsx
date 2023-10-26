import React, { useEffect, useState } from 'react';
import './App.css';
import { CardMeteo } from './components/CardMeteo';
import { Input, AutoComplete, } from 'antd';
import { CardTemperature } from './components/CardTemperature';
import { useAxios } from './services/useAxios';

const { Search } = Input;
function App() {
  const [locations, setLocations] = useState(['Tunisia', 'MontReal', 'France', 'Italy']);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('')
  const [isTextDark, setIsTextDark] = useState(false)

  const {meteoData, getTemperatureAxios} = useAxios();


  const handleChange = (value: any) => {
    if(value.toLowerCase() === "italy") {
      setLatitude(42.8333)
      setLongitude(12.8333)
    } else if(value.toLowerCase() === 'montreal') {
      setLatitude(45.5088)
      setLongitude(-73.5878)
    } else if(value.toLowerCase() === 'tunisia') {
      setLatitude(34)
      setLongitude(9)
    }else if(value.toLowerCase() === 'france') {
      setLatitude(46)
      setLongitude(2)
    }

    setTimeout(() => {
      getTemperatureAxios(latitude, longitude);
    }, 500);
  };


  
  useEffect(() => {
    
    if (meteoData) {
      if (parseInt(meteoData?.hourly?.rain[0])  > 0) {
        setBackgroundImage('img-background-rainy')
        setIsTextDark(false)
      } else if (parseInt(meteoData?.hourly?.temperature_2m[0]) < 20 && parseInt(meteoData.hourly.temperature_2m[0]) >= 16) {
        setBackgroundImage('img-background-cloudly')
        setIsTextDark(false)
      } else if (parseInt(meteoData?.hourly?.temperature_2m[0]) >= 20) {
        setBackgroundImage('img-background-sunny')
        setIsTextDark(true)
      } else if (parseInt(meteoData?.hourly?.temperature_2m[0]) < 16) {
        setBackgroundImage('img-background-mostly-sunny')
        setIsTextDark(true)
      }

    }
    if(Math.trunc(meteoData.latitude) !== Math.trunc(latitude) ) {
      getTemperatureAxios(latitude, longitude);
    }
    if(meteoData.latitude > 0 ) return
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getTemperatureAxios(latitude, longitude);
      }, function (error) {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }

    

  }, [meteoData]);
  return (
    <div className="App">
      <img style={{ position: 'fixed' }} className={backgroundImage} />
      <div >
        <div style={{ marginTop: 72, display: 'inline-flex', alignItems: 'center' }}>
          <AutoComplete
            onChange={handleChange}
            className='input'
            placeholder="Search for places"
            style={{ marginRight: 9 }}
          >
            {locations.map((item) => (
              <AutoComplete.Option key={item}>{item}</AutoComplete.Option>
            ))}
            {/* <Input prefix={<SearchOutlined />}   ></Input> */}
          </AutoComplete>
          <Input className='input' placeholder="Search by ..." />
        </div>
        <div className='div-container' >
          <CardTemperature isTextDark={isTextDark} temperature={meteoData.hourly.temperature_2m[0]} backroundImage={backgroundImage} />
          <div className='separator-vertical'></div>
          <div>
            <p className={isTextDark ? 'title-temp' : 'title-temp-light'}>Today’s highlights</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <CardMeteo isTextDark={isTextDark} component='uv' uv={meteoData?.daily?.uv_index_max[0]} />
              <CardMeteo isTextDark={isTextDark} component='wind' wind={meteoData?.hourly?.windspeed_10m[0]} />
              <CardMeteo isTextDark={isTextDark} component='sunrise' sunrise={meteoData?.daily?.sunrise[0]?.split('T')[1]} sunset={meteoData?.daily?.sunset[0]?.split('T')[1]} />
              <CardMeteo isTextDark={isTextDark} component='Humidity' humidity={meteoData?.hourly?.relativehumidity_2m[0]} />
              <CardMeteo isTextDark={isTextDark} component='Visibility' visibility={meteoData?.hourly?.visibility[0]} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
