// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type plant = {value: string, label: string, dateAdded?: Date, isHover?: boolean, color?: string}

export const plants: plant[] = [
    { value: 'pothos', label: 'Pothos'},
    { value: 'spider', label: 'ירקה' },
    { value: 'monstra', label: 'מונסטרה'},
    { value: 'lavender', label: 'לוונדר'},
    { value: 'batsheva', label: 'בת-שבע' },
    { value: 'paperumia', label: 'פפרומיה' },
    { value: 'ficus', label: 'פיקוס' },
    { value: 'alovera', label: 'אלוורה' },
    {value: 'calathea', label:'קלתאה'}
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
