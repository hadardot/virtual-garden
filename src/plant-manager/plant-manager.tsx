// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type plant = {value: string, label: string, dateAdded?: Date, isHover?: boolean, color?: string, index?: number}
let currentIndex = 0;
export let abandonedIndex = [];
export const plants: plant[] = [
    { value: 'pothos', label: 'Pothos',color: "#ffe3f9"},
    { value: 'spider', label: 'ירקה' ,color: "#f64483"},
    { value: 'monstra', label: 'מונסטרה',color: "#ff71a4"},
    { value: 'lavender', label: 'לוונדר',color: "#ff84e0"},
    { value: 'batsheva', label: 'בת-שבע' ,color: "#b75bc6"},
    { value: 'paperumia', label: 'פפרומיה' ,color: "#6898d9"},
    { value: 'ficus', label: 'פיקוס' ,color: "#00b094"},
    { value: 'alovera', label: 'אלוורה' ,color: "#246d77"},
    {value: 'calathea', label:'קלתאה',color: "#ffe3f9"}
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
        plantToAdd.index = ++currentIndex;
        this.props.addPlant(plantToAdd);
    }

    render(){
        // @ts-ignore
        return (<div>{plants.map(plant =>
                    <div>
                    <button onClick={()=>this.addPlant(plant)}>
                        {plant.label} +
                    </button>
                    </div>
                        )}
            </div>

        )
    }

}
