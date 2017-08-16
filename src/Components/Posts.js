import React, { Component } from "react"
import { Link } from 'react-router-dom'
import "./Posts.css"
import { connect } from "react-redux"
import * as api from "../Util/api.js"
import { updatePosts, thunkVotePost, sortPost, groupPost } from "../Actions"

class Posts extends Component {
  componentDidMount() {
    api
      .fetchAllPosts()
      .then(posts => {
        this.props.updatePosts(posts)
      })
      .then(() => this.props.groupPost(this.props.category))
      .then(() => this.props.sortVote({ col: "voteScore" }))
      
  }
  unixToReadable(param) {
    let d = new Date(param)
    return d.toDateString()
  }
  render() {
    const { posts } = this.props
    return (
      <div>
        <button
          className="ui button primary"
          onClick={() => this.props.sortVote({ col: "voteScore" })}
        >
          SortByVote
        </button>
        <button
          className="ui button primary"
          onClick={() => this.props.sortVote({ col: "timestamp" })}
        >
          SortByDate
        </button>
        <div className="ui one column grid">
          {posts.posts && posts.posts.length !== 0
            ? posts.posts.map(post =>
                <div className="column" key={post.id}>
                  <div className="ui card fluid">
                    <div className="content">
                      <div className="right floated ui grey circular label">
                        {post.voteScore}
                      </div>

                      <div className="header">
                        <Link to={'/post/'+ post.id}>
                        {post.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [{post.category}]
                        </Link>
                      </div>
                      <div className="meta">
                        {post.author} - {this.unixToReadable(post.timestamp)}
                      </div>
                      <div className="description">
                        <p>
                          {post.body}
                        </p>
                      </div>
                    </div>
                    <div className="extra content">
                      <span className="left floated like">
                        <i
                          className="thumbs outline up icon"
                          onClick={() =>
                            this.props.thunkVotePost({
                              postId: post.id,
                              option: "upVote"
                            })}
                        />
                      </span>
                      <span className="right floated star">
                        <i
                          className="thumbs down icon"
                          onClick={() =>
                            this.props.thunkVotePost({
                              postId: post.id,
                              option: "downVote"
                            })}
                        />
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
    updatePosts: data => dispatch(updatePosts(data)),
    thunkVotePost: data => dispatch(thunkVotePost(data)),
    sortVote: data => dispatch(sortPost(data)),
    groupPost: data => dispatch(groupPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
