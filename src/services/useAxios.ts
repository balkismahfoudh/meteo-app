import axios from 'axios';
import { useAtom } from "jotai"
import { meteoTemperatureAtom } from './temperature.store';

export function useAxios() {

    const [meteoData, setMeteoData] = useAtom(meteoTemperatureAtom)
    const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

    const getTemperatureAxios = (latitude: any, longitude: any) => {
        axios.get(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,rain,visibility,windspeed_10m&daily=sunrise,sunset,uv_index_max&timezone=GMT`)
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