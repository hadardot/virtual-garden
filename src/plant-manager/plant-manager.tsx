// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type plant = {value: string, label: string, dateAdded?: Date, isHover?: boolean, color?: string, index?: number[], info?: string}
//let currentIndex = 0;
export let abandonedIndex = [];
export const plants: plant[] = [
    { value: 'pothos', label: 'Pothos',color: "#ff7dab", info:"I am pothos"},
    { value: 'spider-plant', label: 'Spider plant' ,color: "#f64483"},
    { value: 'monstra', label: 'Monstra',color: "#ff71a4"},
    { value: 'lavender', label: 'Lavender',color: "#ff84e0"},
    { value: 'batsheva', label: 'Batsheva' ,color: "#b75bc6"},
    { value: 'paperumia', label: 'Paperumia' ,color: "#6898d9"},
    { value: 'ficus', label: 'Ficus' ,color: "#00b094"},
    { value: 'alovera', label: 'Alovera' ,color: "#246d77"},
    { value: 'calathea', label:'Calathea',color: "#ea6cff"},
    { value: 'aglaonema', label: 'Aglaonema' ,color: "#54ffc0"},
    { value: 'asparagus-fern', label: 'Asparagus Fern' ,color: "#82b7ff"},
    { value: 'yucca', label: 'Yucca' ,color: "#14e1ff"},
    { value: 'air-plant', label: 'Air plant' ,color: "#6878d9"},
    { value: 'english-ivy', label: 'English ivy' ,color: "#c65bb7"},
    { value: 'dragon-tree', label: 'Dragon tree' ,color: "#245577"},
    { value: 'bromeliad', label: 'Bromeliad' ,color: "#009ab0"},
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
                        {/*<span className="tooltiptext">{plant?.info}</span>*/}
                        <div className={plant.value}>{plant.label}</div>
                    </button>
                        )}
            </div>

        )
    }

}
