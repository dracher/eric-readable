import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { thunkAddPost } from "../Actions"

class PostNew extends Component {
  state = {
    title: "",
    author: "",
    body: "",
    category: ""
  }

  componentDidMount() {}

  handleChange(k, v) {
    this.setState({ [k]: v })
  }
  handleSubmit(e) {
    console.log(123123)
    e.preventDefault()
    const { title, author, body, category } = this.state
    let payload = {
      title,
      body,
      author,
      category
    }
    this.props.thunkAddPost(payload)
  }

  render() {
    const { categories } = this.props

    const { title, author, body, category } = this.state
    return (
      <div>
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
            <label>Author Name:</label>
            <input
              type="text"
              placeholder="author name"
              value={author}
              onChange={e => this.handleChange("author", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Category:</label>
            <select
              className="ui fluid dropdown"
              value={category}
              onChange={e => this.handleChange("category", e.target.value)}
            >
              <option value="" />
              {categories.map(val =>
                <option value={val} key={val}>
                  {val}
                </option>
              )}
            </select>
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
          <Link className="ui button red" to="/">
            Cancel
          </Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.categories
  }
}
function mapDispatchToProps(dispatch) {
  return {
    thunkAddPost: data => dispatch(thunkAddPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostNew)
