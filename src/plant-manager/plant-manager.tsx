// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type plant = {value: string, label: string, datesAdded: Date[]}

export const plants: plant[] = [
    { value: 'pothos', label: 'פותוס', datesAdded: [] },
    { value: 'spider', label: 'ירקה' , datesAdded: []},
    { value: 'monstra', label: 'מונסטרה' , datesAdded: []},
    { value: 'lavender', label: 'לוונדר' , datesAdded: []},
    { value: 'bat-sheva', label: 'בת-שבע' , datesAdded: []},
    { value: 'paperumia', label: 'פפרומיה' , datesAdded: []},
    { value: 'ficus', label: 'פיקוס' , datesAdded: []},
    { value: 'alovera', label: 'אלוורה' , datesAdded: []},
]

interface PlantManagerState{
    currentPlants: plant[];
}

interface PlantManagerProps {
    onOptionsUpdate(options: plant[]): void;
}

export class PlantManager extends React.Component<PlantManagerProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentPlants: plants
            };};

    addPlant = (plant: any) => {
        const date = new Date();
        // @ts-ignore
        const current = this.state.currentPlants.map(curr => curr.label  === plant.label ? {...curr, datesAdded: [...curr.datesAdded, date]} : curr)
        this.setState({currentPlants: current});
        this.props.onOptionsUpdate(current);


    }

    render(){
        // @ts-ignore
        return (<div>{this.state.currentPlants.map(plant =>
                    <div>
                    <button onClick={()=>this.addPlant(plant)}>
                        {plant.label} - {plant.datesAdded.length}
                    </button>
                    </div>
                        )}
            </div>

        )
    }

}
