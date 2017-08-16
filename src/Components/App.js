import React, { Component } from "react"
import { Route } from "react-router-dom"
import "./App.css"
import Categories from "./Categories"
import Posts from "./Posts"
import PostNew from "./PostNew"

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                <Categories/>
                <br />
                <Posts category='all'/>
              </div>
            )
          }}
        />

        <Route
          exact
          path="/react"
          render={() => {
            return (
              <div>
                <Categories/>
                <br />
                <Posts category='react' />
              </div>
            )
          }}
        />

        <Route
          exact
          path="/redux"
          render={() => {
            return (
              <div>
                <Categories/>
                <br />
                <Posts category='redux' />
              </div>
            )
          }}
        />

        <Route
          exact
          path="/udacity"
          render={() => {
            return (
              <div>
                <Categories/>
                <br />
                <Posts category='udacity' />
              </div>
            )
          }}
        />

        <Route
          exact
          path="/post/new"
          render={() => {
            return <PostNew />
          }}
        />
      </div>
    )
  }
}

export default App
