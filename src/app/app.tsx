import React from 'react';
import Sketch from "../sketch"
import './app.css';
import {plant, PlantManager} from "../plant-manager/plant-manager";

interface AppState {
    gardensPlants: plant[];

}
class App extends React.Component<any,AppState>{

    constructor(props: any) {
        super(props);
        this.state = {
            gardensPlants: []
        };};

    onOptionsUpdate = (newPlant: plant) => {
        console.log("here with", newPlant)
        // @ts-ignore
        this.setState({gardensPlants: [...this.state.gardensPlants, newPlant]})
    }

    render() {
        return (
            <div className="App">
                <Sketch gardensPlants={this.state.gardensPlants}/>
                <PlantManager onOptionsUpdate={this.onOptionsUpdate}/>
                <div>
                    {this.state.gardensPlants.map(plant => <button>hi</button>)}
                </div>
            </div>
        );
    }
}

export default App;
