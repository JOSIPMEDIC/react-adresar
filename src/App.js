import React from 'react'
import './App.css'
import { Switch, Route, HashRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import FormValid from './components/FormValid'
import Adresar from './components/Adresar'






function App() {
  return (
     <HashRouter>
     <div className="App">
        <Switch>
            <Route exact path='/' component={FormValid} />
            <Route exact path='/Adresar' component={Adresar} />
            
          </Switch>
      </div>
      </HashRouter>
  );
}

export default App;
