import React from 'react';
import Sketch from "../sketch"
import './app.css';
import {plant, PlantManager} from "../plant-manager/plant-manager";
import {GardenManager, GetPlantAge} from "../garden-manager/garden-manager";
import {weather, WeatherManager} from "../weather-manager/weather-manager";
const arrows = '>>>>>';
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
let currentIndex = 0;

interface GardenState {
    gardensPlants: plant[];
    gardensWeather: weather;
    isHover: boolean;
    visitedOnboarding: boolean;

}

function Healthbars() {
    return <div className="HealthBars">
        <progress id="file" value="18 " max="100"/>
        18 °c
        <progress id="file" value="46" max="100"/>46% Humidity
        <progress id="file" value="0.17" max="100"/>0 days 0 hours
    </div>;
}

function Marquee() {
    return <div className="marquee">
        <div>
            <span>DONT FORGET TO WATER YOUR PLANTS {arrows} DONT FORGET TO WATER YOUR PLANTS {arrows} DONT FORGET TO WATER YOUR PLANTS {arrows}    </span>
            <span>DONT FORGET TO WATER YOUR PLANTS {arrows} DONT FORGET TO WATER YOUR PLANTS {arrows} DONT FORGET TO WATER YOUR PLANTS {arrows}    </span>
        </div>
    </div>;
}

class Garden extends React.Component<any,GardenState>{


    constructor(props: any) {
        super(props);
        this.state = {
            gardensPlants: [],
            gardensWeather: null,
            isHover:false,
            visitedOnboarding: false,
        };};

    date = new Date();



    componentDidMount() {
        setInterval(() => this.checkGardenPlantsIndex(5), 10000);
    }

    checkGardenPlantsIndex = (mik : number) =>
    {
        this.state.gardensPlants.map(plant => this.checkIndex(plant));
    }

    checkIndex = (currPlant : plant) =>
    {
        let age = GetPlantAge(currPlant);
        if (age < 10000 && currentIndex < 100)
        {
            // @ts-ignore
            currPlant.index = [...currPlant.index,++currentIndex]
        }
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
        this.setState({gardensWeather: currentWeather});
    }

    setOnboardingTrue = () => {
        this.setState({visitedOnboarding: true})
    }

    setOnboardingFalse = () => {
        this.setState({visitedOnboarding: false})
    }

    render() {
        return this.state.visitedOnboarding ? this.Homepage() : this.About();
    }


    private About(){
        return (<div className="About">
            <p>GROW is a data visualization project where you can GROW your own virtual garden.<br/>
           Each plant is represented as a color of ring made with perlin noise<br/>
  Add house plants from your real garden and watch how they GROW as time pass<br/> and more rings are added to your virtual garden. <br/>
  Take care of your plants by giving them sun and water.<br/>
            and don't forget to take a picture and make memories with your virtual garden</p>

            <button className="AddPlantButton" onClick={this.setOnboardingTrue}>start GROWing</button>


        </div>);
    }

    private Homepage() {
        return (
            <div className="Homepage">
                <div className="Header">
                    <img className="Logo" src='https://i.ibb.co/BLgnTW2/grow-logo.png'/>
                    <div className="About" onClick={this.setOnboardingFalse}>ABOUT</div>
                </div>
                <div className="App">
                    <div className="LeftSide">
                        <div className="SectionHeading">CONTROL PANEL</div>
                        {Healthbars()}
                        <WeatherManager setWeather={this.setWeather}/>
                        <div className="SectionHeading">ADD PLANTS</div>
                        <PlantManager addPlant={this.addPlantToGarden}/>
                    </div>
                    <div className="Sketch">
                        <Sketch gardensPlants={this.state.gardensPlants} isHover={this.state.isHover}
                                gardensWeather={this.state.gardensWeather}/>
                    </div>
                    <div className="RightSide">
                        <div className="SectionHeading">GARDEN MANAGER</div>
                        <GardenManager gardensPlants={this.state.gardensPlants}
                                       removePlantFromGarden={this.removePlantFromGarden}
                                       onMouseOutPlantFromGarden={this.onMouseOutPlantFromGarden}
                                       onMouseOverPlantFromGarden={this.onMouseOverPlantFromGarden}/>
                        <div className="Overview">
                            <img className="Cloudy" src="https://i.ibb.co/nsLsptq/cloudy-icon.png"/>
                            <div className="OverviewText">
                                <div className="Date">{monthNames[this.date.getMonth()]+' '+this.date.getDate()+', '+this.date.getFullYear()}</div>
                                <div className="Weather">Cloudy</div>
                            </div>

                        </div>
                    </div>
                </div>
                {Marquee()}
            </div>
        );
    }
}

export default Garden;
