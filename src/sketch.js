import React from 'react'
import p5 from 'p5'
import {plants} from "./plant-manager/plant-manager";

const fast = 50000;
const TWO_PI = Math.PI * 2;
let zOff =0;
//let I = 0;

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
            p.createCanvas(700, 700);
            p.stroke(100);
            p.strokeWeight(1);
            p.fill(0,0,0,10);
            p.frameRate(30);
            p.rectMode(p.CENTER);
            p.ellipseMode(p.CENTER);


            //console.log(gardenStartDate);

            //let alternate = 1;
            //let direction = 0;
        }

        p.draw = () => {
            p.background(0);
            p.translate(350,350);
            p.rotate(0.2*zOff);
            // I = 0;
            // const time = 1;
            // this.setState({counter: this.state.counter + time});
            this.props.gardensPlants.map(plant => drawPlant(plant));
            zOff += 0.03;
            p.translate(-350,-350);
        }

        const GetPlantAge = (plantDateAdded) => {
            let meeli =  new Date() - plantDateAdded;
            let sec = meeli/1000;
            let minutes = sec/60;
            let size = minutes / 50;
            return size > 400 ? 400:size;
        }


        const drawPlant = (plant) => {
            let a = 0.04;
            let noise = 4;
            let I = plant.index;
            let rr = I*5 - Math.pow(I,2)/35 - 5;
            //let rr = I*2 + Math.pow(I,2)/10;
            p.stroke(plant.color);
            drawPerlinNoiseCircle(noise + I/20 , zOff + (I / 5), rr, rr/6 + 3 , a);

        }

        const drawPerlinNoiseCircle = (noiseMax, zOff, radius, radiusStep, aStep) =>{

            p.noFill();
            p.beginShape();
            for (let a = 0; a < TWO_PI; a+=aStep){
                let xoff = p.map(Math.cos(a), -1, 1, 0, noiseMax);
                let yoff = p.map(Math.sin(a), -1, 1, 0, noiseMax);
                let r = p.map(p.noise(xoff, yoff, zOff), 0, 1, radius-radiusStep, radius+radiusStep);
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
