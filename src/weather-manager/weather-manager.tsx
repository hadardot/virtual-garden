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

                <button className="WeatherButton" onClick={()=>doRain()}><img src="https://i.ibb.co/RgTHm4z/rain-new.png"/></button>
                <button className="WeatherButton" onClick={()=>doSun()}><img src="https://i.ibb.co/VW0FMzt/sun-new.png"/></button>
                <button className="WeatherButton" onClick={()=>doPicture()}><img src="https://i.ibb.co/P4cfmgG/camera-black-new.png"/></button>

            </div>
        )
    }
}
