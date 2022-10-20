import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY
  pageSize = "12"
  render() {
    console.log(this.apiKey)
    return (
      <Router>
        <NavBar/>
      <Routes>
        <Route exact path='/' element = {<News key= "general" pageSize={this.pageSize} country="in" category="general" apiKey={this.apiKey}/>}></Route>
        <Route exact path='/business' element = {<News  key= "business" pageSize={this.pageSize} country="in" category="business" apiKey={this.apiKey}/>}></Route>
        <Route exact path='/entertainment' element = {<News key= "entertainment" pageSize={this.pageSize} country="in" category="entertainment" apiKey={this.apiKey}/>}></Route>
        <Route exact path='/health' element = {<News key= "health" pageSize={this.pageSize} country="in" category="health" apiKey={this.apiKey}/>}></Route>
        <Route exact path='/science' element = {<News key= "science" pageSize={this.pageSize} country="in" category="science" apiKey={this.apiKey}/>}></Route>
        <Route exact path='/sports' element = {<News key= "sports" pageSize={this.pageSize} country="in" category="sports" apiKey={this.apiKey}/>}></Route>
        <Route exact path='/technology' element = {<News  key= "technology" pageSize={this.pageSize} country="in" category="technology" apiKey={this.apiKey}/>}></Route>
      </Routes>
      </Router>
    )
  }
}
