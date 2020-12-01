import React from 'react';
import Sketch from "../sketch"
import {option, PlantManager} from '../plant-manager/plant-manager'
import './app.css';

interface AppState {
    selectedOptions: option[];

}
class App extends React.Component<any,AppState>{

    render() {
        return (
            <div className="App">
                <Sketch/>
                <PlantManager/>
            </div>
        );
    }
}

export default App;
