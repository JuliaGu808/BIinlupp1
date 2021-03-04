import './App.css';
import Navbar from './components/navbar'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './components/home'
import Table from './components/DHTtable'
import DHTDiagram from './components/DHTdiagram'
import Footer from './components/footer'
import DistanceDiagram from './components/DistanceDiagram'
import TableStorage from './components/TableStorage'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
          <div>
          <Navbar /> 
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />            
            <Route path="/home" render={() => <Home />} />
            <Route path="/table" render={() => <Table />} />
            <Route path="/dht_diagram" render={() => <DHTDiagram />} />
            <Route path="/distance_diagram" render={() => <DistanceDiagram />} />
            <Route path="/storage" render={() => <TableStorage />} />
            </Switch>
            <Footer />
            
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
