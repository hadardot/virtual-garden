import React from 'react';
import Sketch from "../sketch"
import {PlantManager} from '../plant-manager/plant-manager'
import './app.css';


class App extends React.Component{

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
