import React, { Component } from "react"
import './App.css'
import Categories from './Categories'
import Posts from './Posts'

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Categories />
        <br />
        <Posts />
      </div>
    )
  }
}

export default App
