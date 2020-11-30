import React from 'react'
import p5 from 'p5'

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
            //Everyhting that normally happens in setup works
            p.createCanvas(400, 400);
            p.stroke(0); // Set line drawing color to black
            p.strokeWeight(0.5);
            p.frameRate(60);//?
            p.background(256);

        }

        p.draw = () => {
            const time = 2;
            let data = 2;
            // And everything that normally goes in draw in here
            p.background(256);
            this.setState({counter: this.state.counter + time}); // loop
            flower1(data); // (max 5 is nice )
        }

        const part1 = (petal) =>
        {
            let pase = this.state.counter/2;
            p.noFill();
            let n = pase - petal*50;
            if (n  < 0)
            {n = 0;}
            p.stroke(n%256);
            p.circle(200, 200,n%256);
        }


         const flower1 = (num) =>
        {
            for ( let i = 0 ; i < num ; i+= 1)
            {
                part1(i);
            }

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
