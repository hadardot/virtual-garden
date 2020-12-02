// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type option = {value: string, label: string}

const options: option[] = [
    { value: 'pothos', label: 'פותוס' },
    { value: 'spider', label: 'ירקה' },
    { value: 'monstra', label: 'מונסטרה' },
    { value: 'lavender', label: 'לוונדר' },
    { value: 'bat-sheva', label: 'בת-שבע' },
    { value: 'paperumia', label: 'פפרומיה' },
    { value: 'ficus', label: 'פיקוס' },
    { value: 'alovera', label: 'אלוורה' },

]

interface PlantManagerState{
    selectedOptions: option[];
}

interface PlantManagerProps {
    onOptionsUpdate(options: option[]): void;
}

export class PlantManager extends React.Component<PlantManagerProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedOptions: [options[0]]
            };};

    onChange = (selectedOptions: any) => {
        console.log(selectedOptions);
        this.props.onOptionsUpdate(selectedOptions)
        this.setState({selectedOptions})

    }
    render(){
        return (
            <div>
                <Select
                    defaultValue={this.state.selectedOptions}
                    isMulti
                    name="plants"
                    options={options}
                    className="basic-multi-select"
                    value={this.state.selectedOptions}
                    classNamePrefix="select"
                    onChange={this.onChange}
                />
            </div>

        )
    }

}
