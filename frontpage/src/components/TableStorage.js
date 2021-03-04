import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LineDiagram from './LineDiagram'

function TableStorage() {
    const [type, setType] = useState("all")
    const [num, setNum] = useState(10)
    const [order, setOrder] = useState("asc")
    const [tableBody, setTableBody] = useState([])
    const [tableHeader, setTableHeader] = useState([])
    const [tempPoints, setTempPoints] = useState([])
    const [humiPoints, setHumiPoints] = useState([])
    const [distPoints, setDistPoints] = useState([])

    function getTableData() {
        console.log(tempPoints)
        //let url ="/"
        let url = "https://juliafunctiondemo1.azurewebsites.net/api/GetDataFromTableStorage?code=R9LL5khK0veInA0sCKgSClOMILWf8kh7Xu/ZLpVtU36ynOv/aCxKxQ=="
        url = url + `&orderby=${order}&type=${type}&limit=${num}`
        axios.get(url)
            .then(res => {
                let headers = []
                    if (type === "dht") {
                        headers = (
                            <tr>

                                <th scope="col">DeviceId</th>
                                <th scope="col">Timestamp</th>
                                <th scope="col">Temperature</th>
                                <th scope="col">Humidity</th>
                            </tr>

                        )
                    }
                    if (type === "distance") {
                        headers =  (
                            <tr>

                                <th scope="col">DeviceId</th>
                                <th scope="col">Timestamp</th>
                                <th scope="col">Distance</th>
                            </tr>

                        )
                    }
                    if (type === "all") {
                        headers =  (
                            <tr>

                                <th scope="col">DeviceId</th>
                                <th scope="col">Timestamp</th>
                                <th scope="col">Temperature</th>
                                <th scope="col">Humidity</th>
                                <th scope="col">Distance</th>
                            </tr>

                        )
                    }
                setTableHeader(headers)
                // 2021-02-28T10:22:00.000Z
                let results = res.data.map((each, index) => {

                    let date_time = new Date(each.created * 1000).toISOString()
                    date_time = date_time.replace("T", " ")
                    let date_time_index = date_time.lastIndexOf(".")
                    date_time = date_time.substring(0, date_time_index)

                    if (type === "dht") {
                        let temp = each.temperature.toFixed(2)
                        return (
                            <tr key={index}>
                                <td>{each.deviceId}</td>
                                <td>{date_time}</td>
                                <td>{temp}</td>
                                <td>{each.humidity}</td>
                            </tr>
                        )
                    }
                    if (type === "distance") {
                        return (
                            <tr key={index}>
                                <td>{each.deviceId}</td>
                                <td>{date_time}</td>
                                <td>{each.distance}</td>
                            </tr>
                        )
                    }
                    if (type === "all") {
                        let temp = each.temperature.toFixed(2)
                        return (
                            <tr key={index}>
                                <td>{each.deviceId}</td>
                                <td>{date_time}</td>
                                <td>{temp}</td>
                                <td>{each.humidity}</td>
                                <td>{each.distance}</td>
                            </tr>
                        )
                    }
                })
                let temps=[]
                let humis=[]
                let dists=[]
                res.data.forEach((each) => {

                    let date_time = new Date(each.created * 1000).toISOString()
                    date_time = date_time.replace("T", " ")
                    let date_time_index = date_time.lastIndexOf(".")
                    date_time = date_time.substring(0, date_time_index)

                    if (type === "dht") {
                        let temp = each.temperature.toFixed(2)
                        let temp_obj = {x:each.created, y:temp}
                        let humi_obj = {x:each.created, y:each.humidity}
                        temps.unshift(temp_obj)
                        humis.unshift(humi_obj)
                
                    }
                    if (type === "distance") {
                        let dist_obj = {x:each.created, y:each.distance}
                        dists.unshift(dist_obj)
                        
                    }
                    if (type === "all") {
                        let temp = each.temperature.toFixed(2)
                        let temp_obj = {x:each.created, y:temp}
                        let humi_obj = {x:each.created, y:each.humidity}
                        let dist_obj = {x:each.created, y:each.distance}
                        temps.unshift(temp_obj)
                        humis.unshift(humi_obj)
                        dists.unshift(dist_obj)
                    }
                })
                setDistPoints(dists)
                setTempPoints(temps)
                setHumiPoints(humis)
                setTableBody(results)
            }).catch(err => setTableBody([]))
    }

    function showType() {
        return (
            <select onChange={(e) => setType(e.target.value)} className="form-select" aria-label="Default select example">
                <option value="all">all</option>
                <option value="dht">dht</option>
                <option value="distance">distance</option>
            </select>
        )
    }

    function showNumbers() {
        return (
            <select onChange={(e) => setNum(e.target.value)} className="form-select" aria-label="Default select example">
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(each => {
                    return <option key={each} value={each}>{each}</option>
                })}
            </select>
        )
    }

    function showOrder() {
        return (
            <select onChange={(e) => setOrder(e.target.value)} className="form-select" aria-label="Default select example">
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
        )
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col">
                    {showType()}
                </div>
                <div className="col">
                    {showNumbers()}
                </div>
                <div className="col">
                    {showOrder()}
                </div>
            </div>
            <button onClick={() => getTableData()}>SÖK</button>
            {tableBody.length ? (
                <table className="table table-striped table-sm">
                    <thead>
                        {tableHeader}

                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            ) : (
                    <div style={{ height: "408px" }}>No data now</div>
                )}

        <div>

       {tempPoints.length && <LineDiagram points={tempPoints} title="Temperature" />} 
        </div>
        <div>
        {humiPoints.length && <LineDiagram points={humiPoints} title="Humidity" />} 
        
        </div>
        <div>

         {distPoints.length && <LineDiagram points={distPoints} title="Distance" />}   
        </div>

        </div>


    )
}

export default TableStorage