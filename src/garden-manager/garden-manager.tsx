import {plant, plants} from "../plant-manager/plant-manager";
import * as React from "react";

interface GardenManagerProps {
    gardensPlants: plant[]
    removePlantFromGarden(plantToRemove: plant): void;
    onMouseOverPlantFromGarden(currentPlant: plant): void;
    onMouseOutPlantFromGarden(currentPlant: plant): void;

}

export class GardenManager extends React.Component<GardenManagerProps, any> {
    constructor(props: any) {
        super(props);
    };

    render(){

        return(
        <div>{this.props.gardensPlants.map(plant =>
            <div>
                <div onMouseOver={()=>this.props.onMouseOverPlantFromGarden(plant)} onMouseOut={()=>this.props.onMouseOutPlantFromGarden(plant)}>
                {plant.label + plant.dateAdded?.toTimeString()}
                </div>
                <button onClick={()=>this.props.removePlantFromGarden(plant)}>
                    x
                </button>
            </div>
        )}
        </div>
        )
    }
}
