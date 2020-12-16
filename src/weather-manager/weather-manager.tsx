import * as React from "react";

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
            <div>
                <button onClick={()=>this.props.setWeather('rain')}>rain</button>
                <button onClick={()=>this.props.setWeather('sun')}>sun</button>
            </div>
        )
    }
}
