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
            p.ellipseMode(p.CENTER);


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
                    return;

                case ("lavender"):
                    drawlavender(age)
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

                case ("alovera"):
                    drawAlovera(age)
                    return;

                default:
                    drawPothos(age);
            }

        }

        const drawlavender = (age) => {
            p.translate(200,200);
            p.rotate(p.radians((age*100000)%360));
            p.ellipse(0, 0, (10 + age)/2 ,10 + age );
            p.rotate(p.radians(-(age*100000)%360));
            p.translate(-200,-200);

        }

        const drawPothos = (age) => {
            p.translate(200,200);
            p.rotate(p.radians((age*100000)%360));
            p.rect(0, 0, (10 + age)/2 ,10 + age );
            p.rotate(p.radians(-(age*100000)%360));
            p.translate(-200,-200);
        }

        const drawBatsheva = (age) => {
            p.translate(200,200);
            p.rotate(p.radians((age*100000)%360));
            p.rect(0, 0, 10 + age, 10 + age );
            p.rotate(p.radians(-(age*100000)%360));
            p.translate(-200,-200);
        }

        const drawPaperumia = (age) => {
            p.translate(200,200);
            p.rotate(p.radians((age*100000)%360));
            p.rect(0, 0, (10 + 300) /5,10 + 300 );
            p.rotate(p.radians(-(age*100000)%360));
            p.translate(-200,-200);
        }


        const drawSpider = (age) => {
            p.translate(200,200);
            p.rotate(p.radians((age*100000)%360));
            let s = age + 10;
            p.line(-s,-s, s,s);
            p.rotate(p.radians(-(age*100000)%360));
            p.translate(-200,-200);
        }


        const drawAlovera = (age) => {
            let radius = age; // (0 - 400)
            let numOfPlus = (age / 20) + 1;
            p.translate(200,200);
            p.rotate(p.radians((age*100000)%360));

            for (let i = 0; i < numOfPlus; i++){
                p.circle(radius,0,10);
            }

            p.rotate(p.radians(-(age*100000)%360));
            p.translate(-200,-200);
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
