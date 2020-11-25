// @ts-ignore
import * as React from 'react';

enum Plant {
    POTHOS = 'Pothos',
    SPIDER = 'Spider plant',
    MONSTRA = 'Monstra'
}

interface PlantManagerProps{};
interface PlantManagerState {plants: (string|null)[], highlight: string|null, inputValue: string}


export class PlantManager extends React.Component<PlantManagerProps, PlantManagerState> {
    constructor(props: PlantManagerProps) {
        super(props);
        this.state = {plants: [], highlight: null, inputValue: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // @ts-ignore
    handleChange(event: any) {
        this.setState({inputValue: event.target.value});
    }

    // @ts-ignore
    handleSubmit(event: any) {
        this.setState({plants: [...this.state.plants, this.state.inputValue], inputValue:""})
        event.preventDefault();
    }



    render(){
        const {plants} = this.state;
        return (
            <div>
                {plants && plants.map(plant => <div>{plant}</div>)}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        )
    }

}
