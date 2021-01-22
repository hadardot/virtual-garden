// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type plant = {value: string, label: string, dateAdded?: Date, isHover?: boolean, color?: string, index?: number[]}
//let currentIndex = 0;
export let abandonedIndex = [];
export const plants: plant[] = [
    { value: 'Pothos', label: 'pothos',color: "#ff7dab"},
    { value: 'Spider plant', label: 'spider' ,color: "#f64483"},
    { value: 'monstra', label: 'monstra',color: "#ff71a4"},
    { value: 'lavender', label: 'lavender',color: "#ff84e0"},
    { value: 'batsheva', label: 'batsheva' ,color: "#b75bc6"},
    { value: 'paperumia', label: 'paperumia' ,color: "#6898d9"},
    { value: 'ficus', label: 'ficus' ,color: "#00b094"},
    { value: 'alovera', label: 'alovera' ,color: "#246d77"},
    { value: 'calathea', label:'calathea',color: "#ea6cff"},
    { value: 'aglaonema', label: 'aglaonema' ,color: "#54ffc0"},
    { value: 'asparagus-fern', label: 'asparagus fern' ,color: "#82b7ff"},
    { value: 'yucca', label: 'yucca' ,color: "#14e1ff"},
    { value: 'air-plant', label: 'air plant' ,color: "#6878d9"},
    { value: 'english-ivy', label: 'english ivy' ,color: "#c65bb7"},
    { value: 'dragon-tree', label: 'dragon tree' ,color: "#245577"},
    { value: 'bromeliad', label: 'bromeliad' ,color: "#009ab0"},
]

interface PlantManagerProps {
    addPlant(options: plant): void;
}


export class PlantManager extends React.Component<PlantManagerProps, any> {
    constructor(props: any) {
        super(props);};

    addPlant = (plant: any) => {
        // @ts-ignore
        const plantToAdd = JSON.parse(JSON.stringify(plant));//deep copy
        plantToAdd.dateAdded = new Date();
        plantToAdd.index = [];
        this.props.addPlant(plantToAdd);
    }





    render(){
        // @ts-ignore
        return (<div className="AddPlantButtons">{plants.map(plant =>
                    <button className="AddPlantButton" onClick={()=>this.addPlant(plant)}>
                        {plant.label}
                    </button>
                        )}
            </div>

        )
    }

}
