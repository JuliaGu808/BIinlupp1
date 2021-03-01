import './App.css';
import Navbar from './components/navbar'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './components/home'
import Table from './components/DHTtable'
import Diagram from './components/DHTdiagram'
import Footer from './components/footer'


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
            <Route path="/diagram" render={() => <Diagram />} />
            </Switch>
            <Footer />
            
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
