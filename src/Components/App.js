import React, { Component } from "react"
import { Route } from "react-router-dom"
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
                <Categories />
                <br />
                <Posts />
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
