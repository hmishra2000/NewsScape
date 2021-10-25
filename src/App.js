import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


 const App =(props) => {
  const pageSize = 12;
  const apikey= process.env.REACT_APP_API_KEY;

  const[progress, setProgres]= useState(10);

 const setProgress= (progres)=>{
   setProgres(progres);
 }
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apikey={apikey}  pageSize={pageSize} country= {"in"} category="general" key="general" /></Route>
          <Route exact path="/business"><News setProgress={setProgress} apikey={apikey}  pageSize={pageSize} country= {"in"} category="business" key="business" /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apikey={apikey}  pageSize={pageSize} country= {"in"} category="entertainment" key="entertainment" /></Route>
          <Route exact path="/health"><News setProgress={setProgress} apikey={apikey}  pageSize={pageSize} country= {"in"} category="health" key="health" /></Route>
          <Route exact path="/science"><News setProgress={setProgress} apikey={apikey}  pageSize={pageSize} country= {"in"} category="science" key="science" /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apikey={apikey}  pageSize={pageSize} country= {"in"} category="sports" key="sports" /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apikey={apikey}  pageSize={pageSize} country= {"in"} category="technology" key="technology" /></Route>
         </Switch> 
        </Router>
      </div>
    )
  
}
  export default App