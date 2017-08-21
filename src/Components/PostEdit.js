import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { thunkEditPost } from "../Actions"

class PostEdit extends Component {
  state = {
    ...this.props.posts.filter(post => this.props.postId === post.id)[0]
  }

  handleChange(k, v) {
    this.setState({ [k]: v })
  }
  handleSubmit(e) {
    let backUrl = `/post/${this.props.postId}`
    e.preventDefault()
    const { title, body } = this.state
    let payload = {
      title,
      body
    }
    this.props
      .thunkEditPost({ postId: this.state.id, post: payload })
      .then(() => this.props.history.push(backUrl))
  }

  render() {
    const { title, body } = this.state
    return (
      <form className="ui form">
        <div className="field">
          <label>Post Title:</label>
          <input
            type="text"
            placeholder="post title"
            value={title}
            onChange={e => this.handleChange("title", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Post Body:</label>
          <textarea
            rows="4"
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
        <Link className="ui button red" to={"/post/" + this.props.postId}>
          Cancel
        </Link>
      </form>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories.categories,
    posts: posts
  }
}
function mapDispatchToProps(dispatch) {
  return {
    thunkEditPost: data => dispatch(thunkEditPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)
