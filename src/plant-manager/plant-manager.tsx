// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type plant = {value: string, label: string, dateAdded?: Date, isHover?: boolean}

export const plants: plant[] = [
    { value: 'pothos', label: 'פותוס'},
    { value: 'spider', label: 'ירקה' },
    { value: 'monstra', label: 'מונסטרה'},
    { value: 'lavender', label: 'לוונדר'},
    { value: 'bat-sheva', label: 'בת-שבע' },
    { value: 'paperumia', label: 'פפרומיה' },
    { value: 'ficus', label: 'פיקוס' },
    { value: 'alovera', label: 'אלוורה' },
]

interface PlantManagerState{

}

interface PlantManagerProps {
    onOptionsUpdate(options: plant): void;
}

export class PlantManager extends React.Component<PlantManagerProps, any> {
    constructor(props: any) {
        super(props);};

    addPlant = (plant: any) => {
        // @ts-ignore
        plant.dateAdded = new Date();
        this.props.onOptionsUpdate(plant);


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
