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
var isPictureTime = false;
let rainTimer = 0;
let sunTimer = 0;
let rotation = 0;
let rainForce = 0;
let shapes = {};




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
{
    isPictureTime= true;
}


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
        // Native p5 functions work as they would normally but prefixed with
        // a p5 object "p"
        p.setup = () => {
            p.createCanvas(SCREEN_SIZE, SCREEN_SIZE);
            p.strokeWeight(1);
            p.fill(0,0,0,10);
            p.frameRate(fps);
            p.rectMode(p.CENTER);
            p.ellipseMode(p.CENTER);
            p.noFill();
        }

        p.draw = () => {
            // this.setState({counter: this.state.counter + time});
            p.background(0);
            p.translate(SCREEN_SIZE/2,SCREEN_SIZE/2);
            counter += 1;  //0.03
            rotation += 0.01;
            p.rotate(rotation);
            if (isRainTime)
            {
                rainTimer += 1/fps;
                rainForce = rainForceOverTime(rainTimer);
                p.rotate(rainForce);     // rain rotation
                if (rainTimer >= RAIN_TIME)
                {
                    rainTimer = 0;
                    isRainTime = false;
                    rotation += rainForce;
                }
            }

            if (this.props.isHover)
            {
                this.props.gardensPlants.map(plant => drawHoverPlant(plant));
            }
            else if (isSunTime)
            {
                sunTimer += 1/fps;
                this.props.gardensPlants.map(plant => drawPlant(plant,sunTimer));
                if (sunTimer >= SUN_TIME)
                {
                    sunTimer = 0;
                    isSunTime = false;
                }
            }
            else
            {
                this.props.gardensPlants.map(plant => drawPlant(plant));
            }

            if(isPictureTime){
                p.save('grow');
                isPictureTime = false;
            }

            p.translate(-SCREEN_SIZE/2,-SCREEN_SIZE/2);
        }

        const drawHoverPlant = (plant) => {
            if(plant?.isHover){
                drawPlant(plant);
            }
        }

        const drawPlant = (plant,sunTimer) => {
            let noise = 4;
            p.stroke(plant.color);
            if (sunTimer)
            {
                setStrokeColorSun(plant.color,sunTimer);
            }
            for (let i = 0; i < plant.index.length; i++) {
                let I = plant.index[i];
                //if (counter % 2 !== 0 && shapes[I])
                //{
                //    drawPerlinNoiseData(I)
                //}
                //else  //if (counter === 1 || counter % 10 === 0) {
                //{
                if (I < 150)
                {
                    let rr = getRadius(I);
                    let aa = getStep(rr);
                    drawPerlinNoiseCircle(I, noise + I / 15, counter / 40 + (I / 5), rr, rr / 6 + 3, aa);  // was a not aa
                }
                //}
            }
        }

        const drawPerlinNoiseData = (index) =>
        {
            p.noFill();
            p.beginShape();
            let coords = shapes[index];
            coords && coords.map(c => {p.vertex(c.xVal,c.yVal)});
            p.endShape(p.CLOSE);
        }

        const drawPerlinNoiseCircle = (index,noiseMax, zOff, radius, radiusStep, aStep) =>
        {
            //let coords = [];
            p.beginShape();
            for (let a = 0; a < TWO_PI; a+=aStep){
                let xoff = p.map(Math.cos(a), -1, 1, 0, noiseMax);
                let yoff = p.map(Math.sin(a), -1, 1, 0, noiseMax);
                let r = p.map(p.noise(xoff, yoff, zOff), 0, 1, radius-radiusStep, radius+radiusStep);
                let x = r*Math.cos(a);
                let y = r*Math.sin(a);
                p.vertex(x, y)
                //coords.push({xVal:x,yVal:y})
            }
            //shapes[index] = coords;
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

        const getRadius = (i) =>
        {
            return -Math.pow(i + 10, 2) / 40 + (i + 10) * 6 - 57;
        }

        const getStep = (rr) =>
        {
            let aa = (-4/3875)*rr + 159/775;
            if (aa < 0.04)
            {
                aa = 0.04;
            }
            return aa;
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
