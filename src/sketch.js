import React from 'react'
import p5 from 'p5'
import {plants} from "./plant-manager/plant-manager";

const TWO_PI = Math.PI * 2;
let counter = 0;

const fps = 30;
const RAIN_TIME = 2;
const SUN_TIME = 1;
const SCREEN_SIZE = 700;
var isRainTime = false;
var isSunTime = false;
let rainTimer = 0;
let sunTimer = 0;
let rotation = 0;
let rainForce = 0;




export const doRain = () =>
{
    rainTimer = 0;
    isRainTime = true;
}

export const doSun = () =>
{
    sunTimer = 0;
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
            p.createCanvas(SCREEN_SIZE, SCREEN_SIZE);
            p.strokeWeight(1);
            p.fill(0,0,0,10);
            p.frameRate(fps);
            p.rectMode(p.CENTER);
            p.ellipseMode(p.CENTER);
        }


        
        p.draw = () => {
            // this.setState({counter: this.state.counter + time});
            p.background(0);
            p.translate(SCREEN_SIZE/2,SCREEN_SIZE/2);
            counter += 0.03;
            rotation += 0.01;
            p.rotate(rotation);   // regular rotation
            if (isRainTime)   // rain rotation
            {
                rainTimer += 1/fps;
                rainForce = rainForceOverTime(rainTimer);
                p.rotate(rainForce);
                if (rainTimer >= 2)  // 2 sec for rain
                {
                    rainTimer = 0;
                    isRainTime = false;
                    rotation += rainForce;
                }
            }

            if (this.props.isHover)   // hover
            {
                this.props.gardensPlants.map(plant => drawHoverPlant(plant));
            }
            else if (isSunTime)    // or sun
            {
                sunTimer += 1/fps;
                this.props.gardensPlants.map(plant => drawPlant(plant,sunTimer));
                if (sunTimer >= SUN_TIME)
                {
                    sunTimer = 0;
                    isSunTime = false;
                }
            }
            else    // or regular
            {
                this.props.gardensPlants.map(plant => drawPlant(plant));
            }

            p.translate(-SCREEN_SIZE/2,-SCREEN_SIZE/2);
        }
        
        
        const drawHoverPlant = (plant) => {
            if(plant?.isHover){
                drawPlant(plant);
            }
        }
        
        const drawPlant = (plant,sunTimer) => {
            let a = 0.04;  // change this over radius
            let noise = 4;
            p.stroke(plant.color);
            if (sunTimer)
            {
                setStrokeColorSun(plant.color,sunTimer);
            }
            for ( let i = 0; i < plant.index.length ; i ++)
            {
                let I = plant.index[i];
                if (I < 30)   // can be in app as well max current index is 110
                {
                    let rr = -Math.pow(I + 10, 2) / 40 + (I + 10) * 6 - 57;
                    drawPerlinNoiseCircle(noise + I / 15, counter + (I / 5), rr, rr / 6 + 3, a);
                }
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

        const setStrokeColorSun = (originalColor,sunTimer) =>
        {
            let rgb = p.color(originalColor);
            let r = rgb.levels[0];
            let g = rgb.levels[1];
            let b = rgb.levels[2];
            let x  = sunForceOverTime(sunTimer);
            r += (255-r)*(x/SUN_TIME);
            g += (255-g)*(x/SUN_TIME);
            b += (255-b)*(x/SUN_TIME);
            p.stroke(p.color(r,g,b));
        }

        const rainForceOverTime = (x) => {
            return 2*(erf(2*x-2)+1);
        }

        const sunForceOverTime = (x) =>
        {
            return Math.pow(2,-Math.pow((x-1/2)*5,2))/1.5;
        }

        const erf = (x) => {
            let m = 1;
            let s = 1;
            let sum = x;
            for(let i = 1; i < 20; i++){
                m *= i;
                s *= -1;
                sum += (s * Math.pow(x, 2 * i + 1.0)) / (m * (2 * i + 1));
            }
            return 2 * sum / Math.sqrt(3.1415);
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
