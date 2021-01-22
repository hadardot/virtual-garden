import React from 'react';
import Sketch from "../sketch"
import './app.css';
import {plant, PlantManager} from "../plant-manager/plant-manager";
import {GardenManager, GetPlantAge} from "../garden-manager/garden-manager";
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



    componentDidMount() {
        setInterval(() => this.checkGardenPlantsIndex(5), 1000);
    }


    checkGardenPlantsIndex = (mik : number) =>
    {
        this.state.gardensPlants.map(plant => this.checkIndex(plant));
    }

    checkIndex = (currPlant : plant) =>
    {
        let age = GetPlantAge(currPlant);

        //  if age > 11000


        // @ts-ignore
        currPlant.index = [...currPlant.index,++currentIndex]
    }




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
        this.setState({gardensPlants, isHover: false})
    }

    setWeather = (currentWeather: weather) => {
        console.log(currentWeather);
        this.setState({gardensWeather: currentWeather});
    }

    render() {
        return (<>
            <div className="Header">
                <img className="Logo" src='https://i.ibb.co/BLgnTW2/grow-logo.png'/>
                <div className="About">ABOUT</div>
            </div>
            <div className="App">
                <div className="LeftSide">
                    <div className="SectionHeading">CONTROL PANEL</div>
                    <div className="HealthBars">

                        <progress id="file" value="32" max="100"/>22c
                        <progress id="file" value="32" max="100"/>46%
                        <progress id="file" value="32" max="100"/>77%
                    </div>
                    <WeatherManager setWeather={this.setWeather}/>
                    <div className="SectionHeading">ADD PLANTS</div>
                    <PlantManager addPlant={this.addPlantToGarden}/>
                </div>

                <Sketch gardensPlants={this.state.gardensPlants} isHover={this.state.isHover} gardensWeather={this.state.gardensWeather}/>

                <div className="RightSide">
                    <div className="SectionHeading">GARDEN MANAGER</div>
                <GardenManager gardensPlants={this.state.gardensPlants} removePlantFromGarden={this.removePlantFromGarden} onMouseOutPlantFromGarden={this.onMouseOutPlantFromGarden} onMouseOverPlantFromGarden={this.onMouseOverPlantFromGarden} />
                </div>
            </div>
                <div className="marquee">
                    <div>
                        <span>DONT FORGET TO WATER YOUR PLANTS ////////////////////////// DONT FORGET TO WATER YOUR PLANTS //////////////////////////</span>
                        <span>DONT FORGET TO WATER YOUR PLANTS ////////////////////////// DONT FORGET TO WATER YOUR PLANTS //////////////////////////</span>
                    </div>
                </div>
            </>
        );
    }
}

export default Garden;
