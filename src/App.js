import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default class App extends Component {
  pageSize = 12;
  apikey= process.env.REACT_APP_API_KEY;
  state ={
    progress : 10
  }

 setProgress= (progress)=>{
   this.setState({
     progress : progress
   })
 }
  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apikey={this.apikey}  pageSize={this.pageSize} country= {"in"} category="general" key="general" /></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apikey={this.apikey}  pageSize={this.pageSize} country= {"in"} category="business" key="business" /></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apikey={this.apikey}  pageSize={this.pageSize} country= {"in"} category="entertainment" key="entertainment" /></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apikey={this.apikey}  pageSize={this.pageSize} country= {"in"} category="health" key="health" /></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apikey={this.apikey}  pageSize={this.pageSize} country= {"in"} category="science" key="science" /></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apikey={this.apikey}  pageSize={this.pageSize} country= {"in"} category="sports" key="sports" /></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apikey={this.apikey}  pageSize={this.pageSize} country= {"in"} category="technology" key="technology" /></Route>
         </Switch> 
        </Router>
      </div>
    )
  }
}
  