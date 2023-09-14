import React from 'react';
import UV1_dark from '../assets/images/components/UV1_dark.png'
import UV2_dark from '../assets/images/components/UV2_dark.png'
import UV3_dark from '../assets/images/components/UV3_dark.png'
import UV4_dark from '../assets/images/components/UV4_dark.png'
import UV5_dark from '../assets/images/components/UV5_dark.png'
import UV6_dark from '../assets/images/components/UV6_dark.png'
import UV7_dark from '../assets/images/components/UV7_dark.png'
import UV8_dark from '../assets/images/components/UV8_dark.png'
import UV9_dark from '../assets/images/components/UV9_dark.png'
import UV10_dark from '../assets/images/components/UV10_dark.png'
import UV11_dark from '../assets/images/components/UV11_dark.png'
import UV12_dark from '../assets/images/components/UV12_dark.png'
import UV13_dark from '../assets/images/components/UV13_dark.png'
import UVFull from '../assets/images/components/UVFULL_dark.png'
import sunriseImg from '../assets/images/components/sunrise.png'
import sunsetImg from '../assets/images/components/sunset.png'

export interface CardMeteoProps {
    component: "uv" | "wind" | "sunrise" | "predictions" | "Humidity" | "Visibility"
    uv?: string
    wind?: string
    sunrise?: string
    sunset?: string
    humidity?: string
    visibility?: string
}

export const CardMeteo = ({ component, uv, wind, sunrise, sunset, humidity, visibility }: CardMeteoProps) => {
    if (component === "uv") {
        return (
            <div className='card-component'>
                <p className='title-card-meteo'>Uv index</p>
                {parseInt(uv as string) >= 1 && parseInt(uv as string) < 2 && <img className='img-uv' src={UV1_dark} />}
                {parseInt(uv as string) >= 2 && parseInt(uv as string) < 3 && <img className='img-uv' src={UV2_dark} />}
                {parseInt(uv as string) >= 3 && parseInt(uv as string) < 4 && <img className='img-uv' src={UV3_dark} />}
                {parseInt(uv as string) >= 4 && parseInt(uv as string) < 5 && <img className='img-uv' src={UV4_dark} />}
                {parseInt(uv as string) >= 5 && parseInt(uv as string) < 6 && <img className='img-uv' src={UV5_dark} />}
                {parseInt(uv as string) >= 6 && parseInt(uv as string) < 7 && <img className='img-uv' src={UV6_dark} />}
                {parseInt(uv as string) >= 7 && parseInt(uv as string) < 8 && <img className='img-uv' src={UV7_dark} />}
                {parseInt(uv as string) >= 8 && parseInt(uv as string) < 9 && <img className='img-uv' src={UV8_dark} />}
                {parseInt(uv as string) >= 9 && parseInt(uv as string) < 10 && <img className='img-uv' src={UV9_dark} />}
                {parseInt(uv as string) >= 10 && parseInt(uv as string) < 11 && <img className='img-uv' src={UV10_dark} />}
                {parseInt(uv as string) >= 11 && parseInt(uv as string) < 12 && <img className='img-uv' src={UV11_dark} />}
                {parseInt(uv as string) >= 12 && parseInt(uv as string) < 13 && <img className='img-uv' src={UV12_dark} />}
                {parseInt(uv as string) >= 13 && parseInt(uv as string) < 14 && <img className='img-uv' src={UV13_dark} />}
                {parseInt(uv as string) >= 14 && <img src={UVFull} />}
                <p className='uv-text'>{parseInt(uv as string)}</p>
                <p className='uv-sub-title'>High level</p>
            </div>
        )
    } else if (component === "wind") {
        return (
            <div className='card-component'>
                <p className='title-card-meteo'>Wind statut</p>
                <p className='text-wind'>{wind}km/h </p>
            </div>
        )

    } else if (component === "sunrise") {
        return (
            <div className='card-component'>
                <p className='title-card-meteo'>Sunrise & Sunset</p>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>
                        <img src={sunriseImg} />
                        <p>{sunrise}</p>
                    </div>
                    <div>
                        <img src={sunsetImg} />
                        <p>{sunset} </p>
                    </div>
                </div>
            </div>
        )

    }else if (component === "Humidity") {
        return (
            <div className='card-component'>
                <p className='title-card-meteo'>Humidity</p>
                <p className='text-wind'>{humidity}% </p>
            </div>
        )

    }else if (component === "Visibility") {
        return (
            <div className='card-component'>
                <p className='title-card-meteo'>Visibility</p>
                <p className='text-wind'>{parseInt(visibility as string) / 1000}km </p>
            </div>
        )

    }


    return <div> </div>
}
