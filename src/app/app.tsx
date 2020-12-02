import React from 'react';
import Sketch from "../sketch"
import {option, PlantManager} from '../plant-manager/plant-manager'
import './app.css';

interface AppState {
    selectedOptions: option[];

}
class App extends React.Component<any,AppState>{

    constructor(props: any) {
        super(props);
        this.state = {
            selectedOptions: []
        };};

    onOptionsUpdate = (selectedOptions: option[]) => {
        console.log("here with", selectedOptions)
        this.setState({selectedOptions})
    }

    render() {
        return (
            <div className="App">
                <Sketch selectedOptions={this.state.selectedOptions}/>
                <PlantManager onOptionsUpdate={this.onOptionsUpdate}/>
            </div>
        );
    }
}

export default App;
