import React from 'react'
import p5 from 'p5'
import {plants} from "./plant-manager/plant-manager";

const fast = 50000;
const TWO_PI = Math.PI * 2;
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
            // const time = 1;
            p.background(0);
            // this.setState({counter: this.state.counter + time});
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
            const age = GetPlantAge(plant.dateAdded);
            drawPerlinNoiseCircle();
        }

        const drawPerlinNoiseCircle = (N = 1) =>{
            p.stroke(255);
            p.noFill();
            p.beginShape();
            let noiseMax = 10; //todo: play with valuse
            for (let a = 0; a < TWO_PI; a+=0.1){
                let xoff = p.map(Math.cos(a), -1, 1, 0, noiseMax);
                let yoff = p.map(Math.sin(a), -1, 1, 0, noiseMax);
                let r = p.map(p.noise(xoff, yoff), 0, 1, 100, 200);
                let x = r*Math.cos(a);
                let y = r*Math.sin(a);
                p.vertex(x, y)
            }
            p.endShape(p.CLOSE);
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
