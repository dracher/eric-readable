import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Posts.css"
import { connect } from "react-redux"
import * as api from "../Util/api"
import { unixToReadable } from "../Util/helper"
import { addPost } from "../Actions"

class Posts extends Component {
  componentDidMount() {
    api.fetchAllPosts().then(post => {
      this.props.addPost(post)
    })
  }

  render() {
    const { posts } = this.props
    return (
      <div>
        <button className="ui button primary">SortByVote</button>
        <button className="ui button primary">SortByDate</button>
        <div className="ui one column grid">
          {posts.length !== 0
            ? posts.map(post =>
                <div className="column" key={post.id}>
                  <div className="ui card fluid">
                    <div className="content">
                      <div className="right floated ui grey circular label">
                        {post.voteScore}
                      </div>

                      <div className="header">
                        <Link to={"/post/" + post.id}>
                          {post.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [{post.category}]
                        </Link>
                      </div>
                      <div className="meta">
                        {post.author} - {unixToReadable(post.timestamp)}
                      </div>
                      <div className="description">
                        <p>
                          {post.body}
                        </p>
                      </div>
                    </div>
                    <div className="extra content">
                      <span className="left floated like">
                        <i className="thumbs outline up icon" />
                      </span>
                      <span className="right floated star">
                        <i className="thumbs down icon" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            : <div />}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data))
    // updatePosts: data => dispatch(updatePosts(data)),
    // thunkVotePost: data => dispatch(thunkVotePost(data)),
    // sortVote: data => dispatch(sortPost(data)),
    // groupPost: data => dispatch(groupPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
