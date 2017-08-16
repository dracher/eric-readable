import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import * as api from "../Util/api.js"
import { updateCategories, newPost } from "../Actions"

class Categories extends Component {
  componentDidMount() {
    api.fetchCategories().then(data => {
      this.props.updateCategories(data)
    })
  }
  render() {
    const { categories } = this.props
    return (
      <div className="ui massive menu">
        <a className="item"><i className="list layout icon" />Categories</a>
        {Object.keys(categories).length !== 0
          ? categories.categories.map(c =>
              <a className="item" key={c.path} href={c.path}>
                <i className="comment outline icon" /> {c.name}
                <div className="floating ui red label">1</div>
              </a>
            )
          : <div />}
          <Link className="item right active" to="/post/new"><i className="plus icon" />New Post</Link>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateCategories: data => dispatch(updateCategories(data)),
    newPost: data => dispatch(newPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
