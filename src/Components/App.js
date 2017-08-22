import React, { Component } from "react"
import { Route } from "react-router-dom"
import Categories from "./Categories"
import Posts from "./Posts"
import PostNew from "./PostNew"
import PostEdit from "./PostEdit"
import PostDetail from "./PostDetail"
import CommentEdit from "./CommentEdit"
import "./App.css"

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
          path="/:category"
          render={({ match, history }) => {
            return (
              <div>
                <Categories cat={match.params.category} />
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
          path="/post/:category/:postId"
          render={({ match, history }) => {
            return (
              <PostDetail
                postCat={match.params.category}
                postId={match.params.postId}
                history={history}
              />
            )
          }}
        />

        <Route
          exact
          path="/comments/edit/:commentId"
          render={({ match, history }) => {
            return (
              <CommentEdit
                commentId={match.params.commentId}
                history={history}
              />
            )
          }}
        />
      </div>
    )
  }
}

export default App
