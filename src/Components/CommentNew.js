import React, { Component } from "react"
import { thunkNewComment } from "../Actions/CommentActions"
import { connect } from "react-redux"

class CommentNew extends Component {
  state = {
    author: "",
    body: "",
    parentId: this.props.parentId
  }
  handleChange(k, v) {
    this.setState({ [k]: v })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { author, body, parentId } = this.state
    let payload = {
      body,
      author,
      parentId
    }
    this.props.thunkNewComment(payload).then(() =>
      this.setState({
        author: "",
        body: ""
      })
    )
  }
  render() {
    const { author, body } = this.state
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="field">
            <label>Author</label>
            <input
              type="text"
              placeholder="author name"
              value={author}
              onChange={e => this.handleChange("author", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Comment</label>
            <textarea
              rows="2"
              value={body}
              onChange={e => this.handleChange("body", e.target.value)}
            />
          </div>

          <button
            className="ui button  basic primary"
            onClick={e => this.handleSubmit(e)}
          >
            Add Comment
          </button>
        </form>
      </div>
    )
  }
}

export default connect({}, { thunkNewComment })(CommentNew)
