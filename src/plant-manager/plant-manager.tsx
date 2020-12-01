// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Select from 'react-select';

export type option = {value: string, label: string}

const options: option[] = [
    { value: 'pothos', label: 'Pothos' },
    { value: 'spider', label: 'Spider plant' },
    { value: 'monstra', label: 'Monstra' }
]

interface PlantManagerState{
    selectedOptions: option[];
}

export class PlantManager extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedOptions: [options[0]]
            };};

    onChange = (selectedOptions: any) => {
        console.log(selectedOptions);
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
