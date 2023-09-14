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

export const getDataChallengesAuto = (idUser) => {
    const url = `${BASE_URL}/recuperer_les infos_auto/${idUser}`;

    const requestOptions = {
        method: 'GET',
        headers: {
        },
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const postDataChallenge = (data) => {
    const url = `${BASE_URL}/suggestion_challenge_manuel`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const postDataChallengeAuto = (data) => {
    const url = `${BASE_URL}/suggestion_challenge_automatique`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions).then(handleResponse);
};


export const deleteChallengeSug = (idUser, challengeName) => {
    const url = `${BASE_URL}/supprimer_des_challenges_manuel?challenge_id=${idUser}&challenge_name=${challengeName}`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
        },
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const deleteChallengeAuto = (idUser, challengeName) => {
    const url = `${BASE_URL}/supprimer_des_challenges_automatiques?challenge_id=${idUser}&challenge_name=${challengeName}`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
        },
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const deleteJobTitle = (idUser, challengeName, jobTitle) => {
    const url = `${BASE_URL}/supprimer_des_jobs_manuel?challenge_id=${idUser}&challenge_name=${challengeName}&job_title=${jobTitle}`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
        },
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const deleteJobTitleAuto = (idUser, challengeName, jobTitle) => {
    const url = `${BASE_URL}/supprimer_des_jobs_automatiques?challenge_id=${idUser}&challenge_name=${challengeName}&job_title=${jobTitle}`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
        },
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const postDataJobTitle = (data) => {
    const url = `${BASE_URL}/ajouter_ des jobs_manuels`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const postDataJobTitleAuto = (data) => {
    const url = `${BASE_URL}/ajouter_ des jobs_automatiques`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions).then(handleResponse);
};