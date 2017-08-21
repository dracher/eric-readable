import React, { Component } from "react"
import matt from "../Assets/matt.jpg"
import { thunkDelComment } from "../Actions"
import { connect } from "react-redux"
import { unixToReadable } from "../Util/helper"

class Comment extends Component {
  handleRemove(e, commentId) {
    e.preventDefault()
    this.props.thunkDelComment(commentId)
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
              <a className="reply">Edit</a>
              <a className="save" onClick={e => this.handleRemove(e, id)}>
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    thunkDelComment: data => dispatch(thunkDelComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
