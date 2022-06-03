import React, { useEffect, useState } from 'react';
// import NotifyMe from 'react-notification-timeline';


import Matrix from 'ml-matrix';
import LogisticRegression from 'ml-logistic-regression'

import './style.css'
import { AiOutlineConsoleSql } from 'react-icons/ai';

export default function Forecasting(props) {
    const [temperature, setTemperatute] = useState('');
    const [airHumidity, setAirHumidity] = useState('');
    const [soilHumidity, setSoilHumidity] = useState('');
    const [light, setLight] = useState('');

    const [validTemperature, setValidTemperature] = useState(true);
    const [validAirHumidity, setValidAirHumidity] = useState(true);
    const [validSoilHumidity, setValidSoilHumidity] = useState(true);
    const [validLight, setValidLight] = useState(true);

    const [canDisplay, setCanDisplay] = useState(false);
    const [ledMessage, setLedMessage] = useState('');
    const [pumpMessage, setPumpMessage] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        if (validTemperature && validAirHumidity && validSoilHumidity && validLight && temperature && airHumidity && soilHumidity && light) {
            setCanDisplay(true);
            let temp = [props.temperature, props.humiAir, props.humiSoil, props.light, props.ledStatus, props.pumpStatus];
            // let minLength = Math.min(...temp);
            let tempLength = temp.map((value, index) => {
                return value.length;
            })
            let minLength = Math.min(...tempLength);
            if (minLength > 0) {
                let x = [];
                let yLed = [];
                let yPump = [];
            
                // for (let i = 0; i < minLength; i++) x.push([]);
                for (let i = 0; i < minLength; i++) {
                    x.push([]);
                    yLed.push(temp[4][i].value);
                    yPump.push(temp[5][i].value);
                    for (let j = 0; j < temp.length - 2; j++) {
                        x[i].push(temp[j][i].value);     
                    }
                }

                const input = new Matrix([
                    [temperature, airHumidity, soilHumidity, light],
                ]);

                const X = new Matrix(x);
                const YLed = Matrix.columnVector(yLed);
                const YPump = Matrix.columnVector(yPump);
                const logreg = new LogisticRegression({ numSteps: 40, learningRate: 5e-3 });
                logreg.train(X, YLed);
                const resLed = logreg.predict(input);
                logreg.train(X, YLed);
                const resPump = logreg.predict(input);
                // const finalResults = logreg.predict(Xtest);
                // console.log(finalResults)
                console.log('Led message', resLed);
                console.log('Pump message', resPump);

                if (resLed[0] == 0) setLedMessage('You should turn off the LED');
                else setLedMessage('You should turn on the LED');
                if (resPump[0] == 0) setPumpMessage('You should turn on the PUMP');
                else setPumpMessage('You should turn off the PUMP');
            }
        }
        else {
            setCanDisplay(false);
        }

        


        // console.log(props.temperature)
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

    useEffect(() => {
        if (props.temperature.length > 1) console.log(props.temperature);
    }, [props]);

    return (
        <div className='wrapper-container-forecast'>
            <div className='d-flex justify-content-center'>
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
            <div className='d-flex justify-content-center'>
                <div className='recommend d-flex flex-column align-items-center justify-content-center'>
                    <h2
                        style={
                            {
                                color: 'white'
                            }
                        }
                    >System's suggestion</h2>
                    {
                        canDisplay && 
                        (
                            <div className='custom'>
                                <div class="alert alert-info d-flex justify-content-center custom-child" role="alert">
                                    {ledMessage}
                                </div>

                                <div class="alert alert-info d-flex justify-content-center custom-child" role="alert">
                                    {pumpMessage}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

        
    );
}