import React from 'react';
import Sketch from "../sketch"
import './app.css';
import {plant, PlantManager} from "../plant-manager/plant-manager";
import {GardenManager} from "../garden-manager/garden-manager";
import {weather, WeatherManager} from "../weather-manager/weather-manager";

let currentIndex = 0;

interface GardenState {
    gardensPlants: plant[];
    gardensWeather: weather;
    isHover: boolean;

}
class Garden extends React.Component<any,GardenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            gardensPlants: [],
            gardensWeather: null,
            isHover:false,
        };};

    addPlantToGarden = (newPlant: plant) => {
        // @ts-ignore

        newPlant.index[0] = ++currentIndex;
        this.setState({gardensPlants: [...this.state.gardensPlants, newPlant]})
    }

    removePlantFromGarden = (plantToRemove: plant) => {
        // @ts-ignore
        const gardensPlants = this.state.gardensPlants.filter(plant => plant.dateAdded !== plantToRemove.dateAdded);
        this.setState({gardensPlants})
    }

    onMouseOverPlantFromGarden = (currentPlant: plant) => {
        // @ts-ignore
        const gardensPlants = this.state.gardensPlants.map(plant => plant.dateAdded === currentPlant.dateAdded ? {...plant, isHover: true}: plant);
        this.setState({gardensPlants, isHover: true})
    }

    onMouseOutPlantFromGarden = (currentPlant: plant) => {
        // @ts-ignore
        const gardensPlants = this.state.gardensPlants.map(plant => plant.dateAdded === currentPlant.dateAdded ? {...plant, isHover: false}: plant);
        this.setState({gardensPlants, isHover:false})
    }

    setWeather = (currentWeather: weather) => {
        console.log(currentWeather);
        this.setState({gardensWeather: currentWeather});
    }

    render() {
        return (<>
            <div className="Header">
                Grow header
            </div>
            <div className="App">
                <div className="LeftSide">
                    <div className="SectionHeading">ADD PLANTS</div>
                <PlantManager addPlant={this.addPlantToGarden}/>
                <WeatherManager setWeather={this.setWeather}/>
                </div>
                <Sketch gardensPlants={this.state.gardensPlants} isHover={this.state.isHover} gardensWeather={this.state.gardensWeather}/>
                <div className="RightSide">
                    <div className="SectionHeading">GARDEN MANAGER</div>
                <GardenManager gardensPlants={this.state.gardensPlants} removePlantFromGarden={this.removePlantFromGarden} onMouseOutPlantFromGarden={this.onMouseOutPlantFromGarden} onMouseOverPlantFromGarden={this.onMouseOverPlantFromGarden} />
                </div>
            </div>
            </>
        );
    }
}

export default Garden;
