import React from 'react'
import p5 from 'p5'
import {plants} from "./plant-manager/plant-manager";

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

            //console.log(gardenStartDate);

            //let alternate = 1;
            //let direction = 0;
        }

        p.draw = () => {
            const time = 1;
            p.background(256);
            this.setState({counter: this.state.counter + time});
            this.props.gardensPlants.map(plant => drawPlant(plant));
        }

        const flower1 = (num) =>
        {
            let pase = this.state.counter/2;
            for ( let i = 0 ; i < num ; i+= 1)
            {
                let n = pase - i*50;
                if (n  < 0)
                {n = 0;}
                p.stroke(n%256);
                p.circle(200, 200,n%256);
                p.stroke(100);
            }

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
                default:
                    drawPothos(age);
            }

        }

        const drawPothos = (age) => {


            p.translate(200,200);
            p.rotate(p.radians((age*100000)%360));
            p.rect(0, 0, (10 + 300)/2 ,10 + 300 );
            p.rotate(p.radians(-(age*100000)%360));
            p.translate(-200,-200);

            //p.circle(200, 200,age + 10);
        }

        const flower2 = (num) =>
        {
            let c = this.state.counter;
            if (c < 256)
            {
                return;
            }
            if (c < 410 )
            {
                p.stroke(510-c); // 510-c
            }

            //   even = -1;
            //   if (mum%2 == 0)
            //   {
            //       even = 1;
            //   }

            // if ((this.state.counter)%256 == 0)
            // {
            //      this.alternate *= -1;
            //  }
            // this.direction += alternate;
            let direction = 210;


            let pase2 = this.state.counter/2; //pase

            p.translate(200,200);
            p.rotate(p.radians(pase2));
            p.rect(0, 0,direction/3,180);
            p.rotate(p.radians(-pase2));
            if (num > 4)  // num%2 !== 0
            {
                p.rotate(p.radians(-pase2));
                p.rect(0, 0, direction/3,180);
                p.rotate(p.radians(pase2));
            }
            p.stroke(100);
            p.translate(-200,-200);   // ?
        }

        const flower3 = () =>
        {
            let pase3 = this.state.counter/8;

            p.translate(200,200);
            p.rotate(p.radians(pase3));


            let a = p.sin((this.state.counter/360))*35 + 60;

            p.line(0,0,a,a);
            p.line(0,0,-a,-a);
            p.line(0,0,-a,a);
            p.line(0,0,a,-a);


            p.rotate(p.radians(-pase3));
            p.translate(-200,-200);
        }

        const flower4 = () =>
        {
            let pase4 = this.state.counter/8;

            p.translate(200,200);
            p.rotate(p.radians(45));
            p.rotate(p.radians(-pase4));


            let a = p.cos((this.state.counter/360))*35 + 60;

            p.line(0,0,a,a);
            p.line(0,0,-a,-a);
            p.line(0,0,-a,a);
            p.line(0,0,a,-a);


            p.rotate(p.radians(pase4));
            p.rotate(p.radians(-45));
            p.translate(-200,-200);
        }

        const flower5 = () =>
        {
            //p.stroke(220);
            let s = p.sin(this.state.counter/360)*256;
            p.stroke(p.abs(p.sin(this.state.counter/360))*128 + 128);
            p.rect(200, 200,s,s);
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
