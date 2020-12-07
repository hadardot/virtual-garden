import React from 'react';
import Sketch from "../sketch"
import './app.css';
import {plant, PlantManager} from "../plant-manager/plant-manager";

interface GardenState {
    gardensPlants: plant[];

}
class Garden extends React.Component<any,GardenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            gardensPlants: []
        };};

    addPlantToGarden = (newPlant: plant) => {
        console.log("here with", newPlant)
        // @ts-ignore
        this.setState({gardensPlants: [...this.state.gardensPlants, newPlant]})
    }

    removePlantFromGarden = (plantToRemove: plant) => {
        console.log("here with", plantToRemove)
        // @ts-ignore
        const gardensPlants = this.state.gardensPlants.filter(plant => plant.dateAdded !== plantToRemove.dateAdded);
        this.setState({gardensPlants})
    }

    onMouseOverPlantFromGarden = (plantToRemove: plant) => {
        console.log("here with", plantToRemove)
        // @ts-ignore
        const gardensPlants = this.state.gardensPlants.map(plant => plant.dateAdded === plantToRemove.dateAdded ? {...plant, isHover: true}: plant);
        this.setState({gardensPlants})
    }

    onMouseOutPlantFromGarden = (plantToRemove: plant) => {
        console.log("here with", plantToRemove)
        // @ts-ignore
        const gardensPlants = this.state.gardensPlants.map(plant => plant.dateAdded === plantToRemove.dateAdded ? {...plant, isHover: false}: plant);
        this.setState({gardensPlants})
    }

    render() {
        return (
            <div className="App">
                <Sketch gardensPlants={this.state.gardensPlants}/>
                <PlantManager addPlant={this.addPlantToGarden}/>
                <div>
                    {this.state.gardensPlants.map(plant => <button>hi</button>)}
                </div>
            </div>
        );
    }
}

export default Garden;
