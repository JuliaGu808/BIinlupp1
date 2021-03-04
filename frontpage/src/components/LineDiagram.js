import React, { Component } from 'react';
import LineChart from 'react-linechart';
 
export default class LineDiagram extends Component {
    
    render() {
        console.log(this.props)
        const data = [
            {									
                color: "steelblue", 
                points: this.props.points
            }
        ];
        return (
            <div>
                <div>
                    <h1>{this.props.title}</h1>
                    <LineChart 
                        width={600}
                        height={400}
                        data={data}
                    />
                </div>				
            </div>
        );
    }
}
