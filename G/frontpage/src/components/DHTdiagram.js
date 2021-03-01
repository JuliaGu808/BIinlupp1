import React from 'react'
import DiagramSrc from '../mytable.png'

function Diagram(){
    return (
        <div className="container" style={{height:"600px"}} >

            <div style={{width:"80%", height:"50px"}} className="border mt-3 mx-auto d-flex flex-row p-2">
                <div style={{height:"50%", width:"15%"}} className="border-bottom border-2 border-warning"></div>
                <div className="m-1">Humidity</div>
                <div style={{width:"10px"}}></div>
                <div style={{height:"50%", width:"15%"}} className="border-bottom border-2 border-info"></div>
                <div className="m-1">Temperature(°C)</div>

            </div>

<img style={{width:"100%"}} src={DiagramSrc} alt="img" />
</div>
    )
}

export default Diagram