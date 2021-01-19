import {plant, plants} from "../plant-manager/plant-manager";
import * as React from "react";

interface GardenManagerProps {
    gardensPlants: plant[]
    removePlantFromGarden(plantToRemove: plant): void;
    onMouseOverPlantFromGarden(currentPlant: plant): void;
    onMouseOutPlantFromGarden(currentPlant: plant): void;

}



const GetPlantAge = (currentPlant: plant) => {
    // @ts-ignore
    let meeli =  new Date() - currentPlant.dateAdded;
    let sec = meeli/1000;
    let minutes = sec/60;
    return Math.floor(minutes);
}

export class GardenManager extends React.Component<GardenManagerProps, any> {
    constructor(props: any) {
        super(props);
    };

    render(){

        return(
        <div className="GardenManager">{this.props.gardensPlants.map(plant =>
            <div>
                <div className="GardenLog" onMouseOver={()=>this.props.onMouseOverPlantFromGarden(plant)} onMouseOut={()=>this.props.onMouseOutPlantFromGarden(plant)}>
                    <button className="DeletePlantButton" onClick={()=>this.props.removePlantFromGarden(plant)}>
                        x
                    </button>
                {plant.label + GetPlantAge(plant)}
                </div>

            </div>
        )}
        </div>
        )
    }
}
