import axios from 'axios';
import { useAtom } from "jotai"
import { meteoTemperatureAtom } from './temperature.store';

export function useAxios() {

    const [meteoData, setMeteoData] = useAtom(meteoTemperatureAtom)
    const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

    const getTemperatureAxios = (latitude: any, longitude: any) => {
        axios.get(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weathercode,cloudcover,pressure_msl,surface_pressure,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,visibility&daily=sunrise,sunset,uv_index_max,rain_sum&timezone=GMT`)
        .then((response) => {
          setMeteoData(response.data) ;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return {
        meteoData,
        getTemperatureAxios
    };
}