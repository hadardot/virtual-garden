import React from 'react'
import p5 from 'p5'
import {plants} from "./plant-manager/plant-manager";

const fast = 50000;
const mika = 'hadar';
class Sketch extends React.Component {
    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
        this.state={
            counter: 0
        }
    }

    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {

        const gardenStartDate = new Date();

        // Native p5 functions work as they would normally but prefixed with
        // a p5 object "p"
        p.setup = () => {
            p.createCanvas(400, 400);
            p.stroke(100);
            p.strokeWeight(0.5);
            p.fill(0,0,0,10);
            p.frameRate(30);
            p.background(256);
            p.rectMode(p.CENTER);
            p.ellipseMode(p.CENTER);


            //console.log(gardenStartDate);

            //let alternate = 1;
            //let direction = 0;
        }

        p.draw = () => {
            p.translate(200,200);
            const time = 1;
            p.background(256);
            this.setState({counter: this.state.counter + time});
            this.props.gardensPlants.map(plant => drawPlant(plant));
            p.translate(-200,-200);
        }

        const GetPlantAge = (plantDateAdded) => {
            let meeli =  new Date() - plantDateAdded;
            let sec = meeli/1000;
            let minutes = sec/60;
            let size = minutes / 50;
            return size > 400 ? 400:size;
        }


        const drawPlant = (plant) => {

            const age = GetPlantAge(plant.dateAdded)
            switch(plant.value){
                case ("pothos"):
                    drawPothos(age)
                    return;
                case ("ficus"):
                    drawFicus(age);
                    return;

                case ("lavender"):
                    drawLavender(age)
                    return;

                case ("batsheva"):
                    drawBatsheva(age)
                    return;

                case ("paperumia"):
                    drawPaperumia(age)
                    return;


                case ("spider"):
                    drawSpider(age)
                    return;

                // case ("alovera"):
                //     drawAlovera(age)
                //     return;

                default:
                    return;
            }

        }


        const drawLavender = (age) => {
            let size = age*fast;
            p.rotate(p.radians((age*100000)%360));
            p.ellipse(0, 0, (10 + size)/2 ,10 + size );
            p.rotate(p.radians(-(age*100000)%360));
        }

        const drawPothos = (age) => {
            let size = age*fast;
            p.rotate(p.radians((age*100000)%360));
            p.rect(0, 0, (10 + size)/2 ,10 + size );
            p.rotate(p.radians(-(age*100000)%360));
        }

        const drawBatsheva = (age) => {
            let size = age*fast;
            p.rotate(p.radians((age*100000)%360));
            p.rect(0, 0, 10 + size, 10 + size );
            p.rotate(p.radians(-(age*100000)%360));
        }

        const drawPaperumia = (age) => {
            let size = age*fast;
            p.rotate(p.radians((age*100000)%360));
            p.rect(0, 0, (10 + size) /5,10 + size );
            p.rotate(p.radians(-(age*100000)%360));

        }


        const drawSpider = (age) => {
            let size = age*fast;
            p.rotate(p.radians((age*100000)%360));
            let s = size + 10;
            p.line(-s,-s, s,s);
            p.rotate(p.radians(-(age*100000)%360));
        }


        // const drawAlovera = (age) => {
        //     let radius = age; // (0 - 400)
        //     let numOfPlus = (age / 20) + 1;
        //     p.translate(200,200);
        //     p.rotate(p.radians((age*100000)%360));
        //
        //     for (let i = 0; i < numOfPlus; i++){
        //         p.circle(radius,0,10);
        //     }
        //
        //     p.rotate(p.radians(-(age*100000)%360));
        //     p.translate(-200,-200);
        // }

        const drawFicus = (age) => {
            let size = age*fast;
            p.rotate(p.radians((age*100000)%360));
            p.triangle(0, 0, (size+10)/3, size+10, (-size-10)/3, size+10);
            p.rotate(p.radians(-(age*100000)%360));
        }

        const drawCalthea = (age) => {

        }



    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef}>

            </div>
        )
    }
}

export default Sketch
