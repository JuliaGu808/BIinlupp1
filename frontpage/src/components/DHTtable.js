import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Table (){
    const [tableBody, setTableBody] = useState([])

    useEffect(() => {
        const bastURL = "https://juliafunctiondemo1.azurewebsites.net/api/GetAllFromCosmosDb?"
        getTableData(bastURL)
      }, []);

    function getTableData(url){
        //url = "/"
        axios.get(url)
        .then(res=>{
            let lists={}
            let tmp=[]
            let hum=[]
            let ts = []
            res.data.forEach(el=>{
                let date_time = new Date(el.ts*1000).toISOString()
               date_time = date_time.replace("T", " ")
               let date_time_index = date_time.lastIndexOf(".")
               date_time = date_time.substring(0, date_time_index)
               date_time_index = date_time.indexOf("-")
               date_time = date_time.substring(date_time_index+1)
                tmp.unshift(el.temperature) // add first
                hum.unshift(el.humidity)
                ts.unshift(date_time)
            })
            lists={tmp, hum, ts}
            send(lists)
            // 2021-02-28T10:22:00.000Z
            let results=res.data.map(each=>{
               
               let date_time = new Date(each.ts*1000).toISOString()
               date_time = date_time.replace("T", " ")
               let date_time_index = date_time.lastIndexOf(".")
               date_time = date_time.substring(0, date_time_index)

                return (
                    <tr key={each.id}>
                        <td>{each.id}</td>
                        <td>{each.deviceId}</td>
                        <td>{date_time}</td>
                        <td>{each.temperature}</td>
                        <td>{each.humidity}</td>
                    </tr>
                )
            })
            setTableBody(results)
        }).catch(err=>setTableBody([]))
    }

    function send(sendInfo){
        const url = "http://127.0.0.1:5000/python/diagram"

        axios.post(url, sendInfo).then((response) => {
            if(response.data==="ok"){
                console.log("ok")
            }
        })
      }


    return (
        <div className="container mt-4" >
        {tableBody.length ? (
            <table className="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">DeviceId</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </table>
        ) : (
            <div style={{height:"408px"}}>No data now</div>
        )}
    </div>
    )
}

export default Table