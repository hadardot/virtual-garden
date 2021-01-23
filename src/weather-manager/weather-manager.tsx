import * as React from "react";
import {doPicture, doRain, doSun} from "../sketch";

export type weather = 'rain' | 'sun' | null;
interface WeatherManagerProps {
    setWeather(currentWeather: weather): void;
}

export class WeatherManager extends React.Component<WeatherManagerProps, any> {
    constructor(props: any) {
        super(props);
    };


    render(){

        return(
            <div className="WeatherManager">

                <button className="WeatherButton" onClick={()=>doRain()}><img src="https://i.ibb.co/h9qd7dP/rain.png"/></button>
                <button className="WeatherButton" onClick={()=>doSun()}><img src="https://i.ibb.co/kMNTVt5/sun.png"/></button>
                <button className="WeatherButton" onClick={()=>doPicture()}><img src="https://i.ibb.co/Brfth2m/camera.png"/></button>
            </div>
        )
    }
}
