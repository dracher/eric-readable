import React, { Component } from "react"
import { Link } from "react-router-dom"
import matt from "../Assets/matt.jpg"
import { thunkDelComment, thunkVoteComment } from "../Actions/CommentActions"
import { connect } from "react-redux"
import { unixToReadable } from "../Util/helper"

class Comment extends Component {
  handleRemove(e, commentId) {
    e.preventDefault()
    this.props.thunkDelComment(commentId)
  }

  handleVote(e, commentId, option) {
    e.preventDefault()
    this.props.thunkVoteComment({ commentId, option })
  }

  render() {
    const { author, timestamp, voteScore, body, id } = this.props.comment
    return (
      <div className="ui comments">
        <div className="comment">
          <a className="avatar">
            <img src={matt} alt="avatar" />
          </a>
          <div className="content">
            <a className="author">
              {author}
            </a>
            <div className="metadata">
              <div className="date">
                {unixToReadable(timestamp)}
              </div>
              <div className="rating">
                <i className="star icon" />
                {voteScore} Faves
              </div>
            </div>
            <div className="text">
              {body}
            </div>
            <div className="actions">
              <Link className="reply" to={"/comments/edit/" + id}>
                Edit
              </Link>
              <a className="save" onClick={e => this.handleRemove(e, id)}>
                Delete
              </a>
              <a>
                <i
                  className="thumbs outline up icon"
                  onClick={e => this.handleVote(e, id, "upVote")}
                />
              </a>
              <a>
                <i
                  className="thumbs down icon"
                  onClick={e => this.handleVote(e, id, "downVote")}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: comments
  }
}

export default connect(mapStateToProps, { thunkDelComment, thunkVoteComment })(
  Comment
)
