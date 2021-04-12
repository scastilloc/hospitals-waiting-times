import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Illnesses from './components/illnesses.component'
import NotFound from './components/notFound.component';
import PainLevels from './components/painLevels.component';
import Hospitals from './components/hospitals.component';
import Patient from './components/patient.component';

function App() {
  return (
    <Router>
      <Switch> 
        <Route exact path="/">
          <Redirect to="/illnesses" />
        </Route>        
        <Route exact path="/illnesses">
          <Illnesses />
        </Route>
        <Route exact path="/illnesses/:idIllness([0-9]+)/painlevels">
          <PainLevels />
        </Route>
        <Route exact path="/illnesses/:idIllness([0-9]+)/painlevels/:painLevel([0-9]+)/hospitals">        
          <Hospitals />
        </Route>
        <Route exact path="/patient">
          <Patient />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
