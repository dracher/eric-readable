import React, { Component } from "react"
import { Route } from "react-router-dom"
import Categories from "./Categories"
import Posts from "./Posts"
import PostNew from "./PostNew"
import PostEdit from "./PostEdit"
import PostDetail from "./PostDetail"

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
          path="/posts/new"
          render={({ history }) => {
            return <PostNew history={history} />
          }}
        />

        <Route
          exact
          path="/posts/edit/:postId"
          render={({ match, history }) => {
            return <PostEdit postId={match.params.postId} history={history} />
          }}
        />

        <Route
          exact
          path="/post/:postId"
          render={({ match, history }) => {
            return <PostDetail postId={match.params.postId} history={history} />
          }}
        />
      </div>
    )
  }
}

export default App
