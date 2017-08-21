import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Comment from "./Comment"
import CommentNew from "./CommentNew"
import { unixToReadable } from "../Util/helper"
import * as api from "../Util/api"
import { addComment, sortComment, thunkDelPost } from "../Actions"

class PostDetail extends Component {
  state = {
    postId:
      this.props.posts.filter(post => post.id === this.props.postId).length ===
        1 &&
      this.props.posts.filter(post => post.id === this.props.postId)[0].id
  }

  componentDidMount() {
    api
      .fetchCommentsByPostID(this.props.postId)
      .then(comments => this.props.addComment(comments))
      .then(() => this.props.sortComment("voteScore"))
  }
  removePost(postId) {
    this.props.thunkDelPost(postId).then(() => this.props.history.push("/"))
  }
  render() {
    return (
      <div className="column">
        {this.props.posts
          .filter(post => post.id === this.props.postId)
          .map(post =>
            <div className="ui card fluid" key={post.id}>
              <div className="content">
                <div className="right floated ui grey circular label">
                  {post.voteScore}
                </div>
                <div className="header">
                  {post.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [{post.category}]
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
                  <Link to={"/posts/edit/" + post.id}>
                    <i className="edit green big icon" />
                  </Link>
                </span>
                <span className="right floated star">
                  <i
                    className="remove red big icon"
                    onClick={e => this.removePost(post.id)}
                  />
                </span>
              </div>
            </div>
          )}

        <CommentNew parentId={this.state.postId} />

        <button
          className="ui button primary compact"
          onClick={e => this.props.sortComment("voteScore")}
        >
          SortCommentsByVote
        </button>
        <button
          className="ui button primary compact"
          onClick={e => this.props.sortComment("timestamp")}
        >
          SortCommentsByDate
        </button>

        {this.props.comments.length !== 0 &&
          this.props.comments
            .filter(c => !c.deleted)
            .map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts: posts,
    comments: comments
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addComment: data => dispatch(addComment(data)),
    sortComment: data => dispatch(sortComment(data)),
    thunkDelPost: data => dispatch(thunkDelPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)