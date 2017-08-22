import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { thunkEditComment } from "../Actions/CommentActions"

class CommentEdit extends Component {
  state = {
    ...this.props.comments.filter(c => this.props.commentId === c.id)[0]
  }

  getParentPostCategory() {
    return this.props.posts.filter(p => p.id === this.state.parentId)[0]
      .category
  }

  componentDidMount() {
    let cat = this.getParentPostCategory()
    this.setState({ cat })
  }

  handleChange(k, v) {
    this.setState({ [k]: v })
  }
  handleSubmit(e) {
    e.preventDefault()
    let backUrl = `/post/${this.state.cat}/${this.state.parentId}`
    const { body } = this.state
    let payload = {
      body
    }
    this.props
      .thunkEditComment({ commentId: this.state.id, comment: payload })
      .then(() => this.props.history.push(backUrl))
  }

  render() {
    const { body } = this.state
    return (
      <form className="ui form">
        <div className="field">
          <label>Edit Comment:</label>
          <textarea
            rows="2"
            value={body}
            onChange={e => this.handleChange("body", e.target.value)}
          />
        </div>
        <button
          className="ui button primary"
          onClick={e => this.handleSubmit(e)}
        >
          Submit
        </button>
        <Link
          className="ui button red"
          to={"/post/" + this.state.cat + "/" + this.state.parentId}
        >
          Cancel
        </Link>
      </form>
    )
  }
}

function mapStateToProps({ comments, posts }) {
  return {
    comments: comments,
    posts: posts
  }
}

export default connect(mapStateToProps, { thunkEditComment })(CommentEdit)
