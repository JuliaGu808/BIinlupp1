import React from 'react'
import DiagramSrc from '../distance.png'
import DataSrc from '../srcdata.png'

function DiatanceDiagram(){
    return (
        <div className="container" style={{height:"400px", padding:"6px"}} >
        <img style={{width:"30%"}} src={DataSrc} alt="dataimg" />
            

<img style={{width:"70%"}} src={DiagramSrc} alt="diagramimg" />
</div>
    )
}

export default DiatanceDiagram