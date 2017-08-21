import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as api from "../Util/api.js"
import { addCategory, setCategoryFilter } from "../Actions"

class Categories extends Component {
  componentDidMount() {
    api.fetchCategories().then(data => {
      this.props.addCategory(data)
    })
  }
  render() {
    const { categories } = this.props
    return (
      <div className="ui massive menu">
        <Link className="item" to="/">
          <i className="list layout icon" />Categories
        </Link>
        <a className="item" onClick={() => this.props.setCategoryFilter("ALL")}>
          <i className="comment outline icon" /> ALL
        </a>
        {categories.length !== 0 &&
          categories.map(c =>
            <a
              className="item"
              onClick={() => this.props.setCategoryFilter(c)}
              key={c}
            >
              <i className="comment outline icon" /> {c}
            </a>
          )}
        <Link className="item right active" to="/posts/new">
          <i className="plus icon" />New Post
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.categories,
    filter: categories.filter
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addCategory: data => dispatch(addCategory(data)),
    setCategoryFilter: data => dispatch(setCategoryFilter(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
