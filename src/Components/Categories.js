import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as api from "../Util/api.js"
import { addCategory, setCategoryFilter } from "../Actions/CategoryActions"

class Categories extends Component {
  componentDidMount() {
    api.fetchCategories().then(data => {
      this.props.addCategory(data)
    })
  }
  componentWillReceiveProps(nextProps) {
    nextProps.cat !== undefined
      ? this.props.setCategoryFilter(nextProps.cat)
      : this.props.setCategoryFilter("ALL")
  }
  render() {
    const { categories } = this.props
    return (
      <div className="ui massive menu">
        <Link className="item" to="/">
          <i className="list layout icon" />Reabable
        </Link>

        {categories.length !== 0 &&
          categories.map(c =>
            <Link className="item" to={c} key={c}>
              <i className="comment outline icon" /> {c}
            </Link>
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

export default connect(mapStateToProps, { addCategory, setCategoryFilter })(
  Categories
)
