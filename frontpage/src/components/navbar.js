import React, {useState, useEffect} from 'react'

function Navbar(){
  const [home, setHome] = useState(false)
  const [table, setTable] = useState(false);
  const [dht, setDht] = useState(false);
  const [distance, setDistance] = useState(false);
  const [storageTable, setStorageTable] = useState(false)
  
  useEffect(() => {
    const current_url = window.location.href
    const index = current_url.lastIndexOf("/")
    const text = current_url.substring(index+1)
    switch(text){
      case "home":
        setHome(true)
        break
      case "table":
        setTable(true)
        break
      case "dht_diagram":
        setDht(true)
        break
      case "distance_diagram":
        setDistance(true)
        break
      case "storage":
        setStorageTable(true)
        break
      default:
        break
    }
  }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a style={{textDecoration:`${home&&"underline"}`}} className="navbar-brand" href="/home">Inlämningskrav</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a style={{textDecoration:`${table&&"underline"}`}} className="nav-link" href="/table">Table</a>
        </li>
        <li className="nav-item">
          <a style={{textDecoration:`${dht&&"underline"}`}} className="nav-link" href="/dht_diagram">DHT Diagram</a>
        </li>
        <li className="nav-item">
          <a style={{textDecoration:`${distance&&"underline"}`}} className="nav-link" href="/distance_diagram">Distance Diagram</a>
        </li>
        <li className="nav-item">
          <a style={{textDecoration:`${storageTable&&"underline"}`}} className="nav-link" href="/storage">Storage Table</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    )
}

export default Navbar