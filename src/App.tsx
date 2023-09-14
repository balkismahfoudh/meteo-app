import React, { useEffect, useState } from 'react';
import './App.css';
import { CardMeteo } from './components/CardMeteo';
import { Input, AutoComplete, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getTemperature } from './services/apiService';
import { CardTemperature } from './components/CardTemperature';

const { Search } = Input;
function App() {
  const [dataMeteo, setDataMeteo] = useState({})
  const [locations, setLocations] = useState(['Tunisia', 'MontReal', 'France', 'Italy']);
  const [latitude, setLatitude] = useState(34);
  const [longitude, setLongitude] = useState(9);
  const [backgroundImage, setBackgroundImage] = useState('')
  const [temperature, setTemperature] = useState('')
  const [uv_index, setUvIndex] = useState('')
  const [wind, setWind] = useState('')
  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')
  const [humidity, setHumidity] = useState('')
  const [visibility, setVisibility] = useState('')
  const [isTextDark, setIsTextDark] = useState(false)


  const handleChange = (value: any) => {
    console.log(value, "value changed")
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
      getDataMeteo()
    }, 500);
  };

  const getDataMeteo = async () => {
    getTemperature(latitude, longitude)
    .then((data: any) => {
      if (data) {
        console.log(data, 'dataaa')
        setDataMeteo(data)
        setTemperature(data.hourly.temperature_2m[0])
        setUvIndex(data?.daily?.uv_index_max[0])
        setWind(data?.hourly?.windspeed_10m[0])
        setSunrise(data?.daily?.sunrise[0]?.split('T')[1])
        setSunset(data?.daily?.sunset[0]?.split('T')[1])
        setHumidity(data?.hourly?.relativehumidity_2m[0])
        setVisibility(data?.hourly?.visibility[0])
        if (data?.hourly?.rain[0] > 0) {
          setBackgroundImage('img-background-rainy')
          setIsTextDark(false)
        } else if (data?.hourly?.temperature_2m[0] < 20 && data.hourly.temperature_2m[0] >= 16) {
          setBackgroundImage('img-background-cloudly')
          setIsTextDark(false)
        } else if (data?.hourly?.temperature_2m[0] >= 20) {
          setBackgroundImage('img-background-sunny')
          setIsTextDark(true)
        } else if (data?.hourly?.temperature_2m[0] < 16) {
          setBackgroundImage('img-background-mostly-sunny')
          setIsTextDark(true)
        }

      }

    })
    .catch((error: any) => {
      console.error('Error:', error);
    });
  }
  
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, function (error) {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }

    getDataMeteo()

  }, []);
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
          <CardTemperature isTextDark={isTextDark} temperature={temperature} backroundImage={backgroundImage} />
          <div className='separator-vertical'></div>
          <div>
            <p className={isTextDark ? 'title-temp' : 'title-temp-light'}>Today’s highlights</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <CardMeteo isTextDark={isTextDark} component='uv' uv={uv_index} />
              <CardMeteo isTextDark={isTextDark} component='wind' wind={wind} />
              <CardMeteo isTextDark={isTextDark} component='sunrise' sunrise={sunrise} sunset={sunset} />
              <CardMeteo isTextDark={isTextDark} component='Humidity' humidity={humidity} />
              <CardMeteo isTextDark={isTextDark} component='Visibility' visibility={visibility} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
