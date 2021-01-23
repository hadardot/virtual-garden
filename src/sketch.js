import React from 'react'
import p5 from 'p5'
import {plants} from "./plant-manager/plant-manager";

const TWO_PI = Math.PI * 2;
let zOff = 0;

const MAX_RAIN = 2000;
const MAX_SUN = 2000;
var isRainTime = false;
var isSunTime = false;
let rainTimer = 0;
let sunTimer = 0;


export const doRain = () =>
{
    console.log("hadar is beautiful");
    isRainTime = true;
}

export const doSun = () =>
{
    isSunTime = true;
}

export const doPicture = () =>
{}


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


            if (isRainTime)
            {
                // rain
                // timerRain ++
                // if timer > max
                // timer = 0;
                // israintime = false;
            }

            if (this.props.gardensWeather === 'rain')
            {

                //if (!isRainTime)
                //{
                 //   rainTimer = 0;
                //}
                //if (rainTimer < MAX_RAIN)
                //{
                //    isRainTime = true;
                //}
                //rainTimer += 1;
            }


            if (this.props.gardensWeather === 'sun'){
                //start sun draw sun
            }


            if (this.props.isHover)
            {
                this.props.gardensPlants.map(plant => drawHoverPlant(plant));
            }
            else
            {
                this.props.gardensPlants.map(plant => drawPlant(plant));
            }




            zOff += 0.03;
            p.translate(-350,-350);
        }




        const drawPlant = (plant) => {
            let a = 0.04;  // let a = 0.04;
            let noise = 4;
            p.stroke(plant.color);
            for ( let i = 0; i < plant.index.length ; i ++)
            {
                let I = plant.index[i];
                if (I < 100)   // can be in app as well max current index is 110
                {
                    let rr = -Math.pow(I + 10, 2) / 40 + (I + 10) * 6 - 57;
                    drawPerlinNoiseCircle(noise + I / 15, zOff + (I / 5), rr, rr / 6 + 3, a);
                }
            }
        }

        const drawHoverPlant = (plant) => {
            if(plant?.isHover){
                drawPlant(plant);
            }
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
