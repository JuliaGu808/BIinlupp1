import React from 'react'

function Footer(){
    return (

        <footer className="bg-light" style={{height:"100px", width:"100%"}}>
        <div className="row p-4">
                    <div className="col-5 text-start lh-1">&copy; Copyright Julia Gu 2021, All rights reserved</div>
                    <div className="col-7 text-start text-break lh-1">
                        Source (public repo): &nbsp;&nbsp; https://github.com/JuliaGu808
                    </div>
                </div>
        </footer>
        )
}

export default Footer