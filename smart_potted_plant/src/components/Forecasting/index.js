import React, { useState } from 'react';
// import NotifyMe from 'react-notification-timeline';



import './style.css'

export default function Forecasting() {
    const [temperature, setTemperatute] = useState('');
    const [airHumidity, setAirHumidity] = useState('');
    const [soilHumidity, setSoilHumidity] = useState('');
    const [light, setLight] = useState('');

    const [validTemperature, setValidTemperature] = useState(true);
    const [validAirHumidity, setValidAirHumidity] = useState(true);
    const [validSoilHumidity, setValidSoilHumidity] = useState(true);
    const [validLight, setValidLight] = useState(true);

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChangeInput = (e, setF, setValidF) => {
        if (isNaN(e.target.value)) {
            setValidF(false);
        }
        else {
            setValidF(true);
            setF(e.target.value);
        }
    }

    return (
        <div className='wrapper-container-forecast d-flex justify-content-center'>
            <form className='forecast-form'>
                <div className="form-group">
                    <label htmlFor="temperature" className='label-name'>Temperature (℃)</label>
                    <input type="text" className="form-control" id="temperature" placeholder="Enter temperature" onChange={ (event) => handleChangeInput(event, setTemperatute, setValidTemperature) } />
                    {
                        (
                            !validTemperature &&
                            <div className="alert alert-danger" role="alert">
                                Invalid temperature input field
                            </div>
                        )
                    }
                </div>



                <div className="form-group">
                    <label htmlFor="air-humidity" className='label-name'>Air humidity (%)</label>
                    <input type="text" className="form-control" id="air-humidity" placeholder="Enter air humidity" onChange={ (event) => handleChangeInput(event, setAirHumidity, setValidAirHumidity) } />
                    {
                        (
                            !validAirHumidity &&
                            <div className="alert alert-danger" role="alert">
                                Invalid air humidity input field
                            </div>
                        )
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="soil-humidity" className='label-name'>Soil humidity</label>
                    <input type="text" className="form-control" id="soil-humidity" placeholder="Enter soil humidity" onChange={ (event) => handleChangeInput(event, setSoilHumidity, setValidSoilHumidity) } />
                    {
                        (
                            !validSoilHumidity &&
                            <div className="alert alert-danger" role="alert">
                                Invalid soil humidity input field
                            </div>
                        )
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="light" className='label-name'>Light (AUX)</label>
                    <input type="text" className="form-control" id="light-humidity" placeholder="Enter light" onChange={ (event) => handleChangeInput(event, setLight, setValidLight) } />
                    {
                        (
                            !validLight &&
                            <div className="alert alert-danger" role="alert">
                                Invalid light input field
                            </div>
                        )
                    }
                
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary submit-forecast" onClick={ handleSubmit }>Submit</button>
                </div>
                
            </form>

        </div>
        
    );
}