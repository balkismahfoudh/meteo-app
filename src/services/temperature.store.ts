import { atom } from "jotai"

export const meteoTemperatureAtom = atom<{
    latitude: number
    hourly: {temperature_2m: [''], relativehumidity_2m: [''], visibility: [''], rain: [''], windspeed_10m: ['']}
    daily: {uv_index_max: [''], sunrise: [''], sunset: ['']}
}>({
    latitude: 0,
    hourly: {temperature_2m: [''], relativehumidity_2m: [''], visibility: [''], rain: [''], windspeed_10m: ['']},
    daily: {uv_index_max: [''], sunrise: [''], sunset: ['']}
  })