import React, { useEffect, useState } from 'react';
import cloud from '../assets/images/weather-types/cloud_desktop.png'
import mostlySunny from '../assets/images/weather-types/mostly_sunny_desktop.png'
import rainy from '../assets/images/weather-types/rainy_desktop.png'
import sunny from '../assets/images/weather-types/sunny_desktop.png'

export interface CardTemperatureProps {
    variant?: "default" | "center"
    temperature?: string
    backroundImage?: string
    isTextDark?: boolean
}

export const CardTemperature = ({ variant, temperature, backroundImage, isTextDark }: CardTemperatureProps) => {
    const [currentDay, setCurrentDay] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [weatherType, setWeatherType] = useState('')
    


    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const currentDayOfWeek = daysOfWeek[now.getDay()];

            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const currentTimeString = `${hours}:${minutes}`;

            setCurrentDay(currentDayOfWeek);
            setCurrentTime(currentTimeString);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    
    if (variant === "center") {
        return (
            <div></div>
        )
    }

    return <div>
        <p style={{textAlign: "left", fontWeight: 400, marginLeft: 20}} className={isTextDark ? 'title-temp' : 'title-temp-light'}>{currentDay}, {currentTime}</p>
        <div className='card-temp'>
        
        {backroundImage === 'img-background-rainy' && <img className='img-temp' src= {rainy}/>}
        {backroundImage === 'img-background-cloudly' && <img className='img-temp' src= {cloud}/>}
        {backroundImage === 'img-background-sunny' && <img className='img-temp' src= {sunny}/>}
        {backroundImage === 'img-background-mostly-sunny' && <img className='img-temp' src= {mostlySunny}/>}
        <p className={isTextDark ? 'temp-text' : 'temp-text-light' }>{temperature}°C</p>
        {backroundImage === "img-background-rainy" && <p className={isTextDark ? 'sub-text-temp' : 'sub-text-temp-light'}>Rainy</p>}
        {backroundImage === "img-background-cloudly" && <p className={isTextDark ? 'sub-text-temp' : 'sub-text-temp-light'}>Cloudy</p>}
        {backroundImage === "img-background-sunny" && <p className={isTextDark ? 'sub-text-temp' : 'sub-text-temp-light'}>Sunny</p>}
        {backroundImage === "img-background-mostly-sunny" && <p className={isTextDark ? 'sub-text-temp' : 'sub-text-temp-light'}>Mostly sunny</p>}
        </div>
        
    </div>
}
