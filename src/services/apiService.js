const BASE_URL = 'https://api.open-meteo.com/v1/forecast';


const handleResponse = (response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


export const getTemperature = (latitude, longitude) => {
    const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,rain,visibility,windspeed_10m&daily=sunrise,sunset,uv_index_max&timezone=GMT`;

    const requestOptions = {
        method: 'GET',
        headers: {
        },
    };

    return fetch(url, requestOptions).then(handleResponse);
};
