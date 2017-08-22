import React, { Component } from "react"
import "./Posts.css"
import { connect } from "react-redux"
import * as api from "../Util/api"
import PostSimple from "./PostSimple"
import { addPost, sortPost } from "../Actions/PostActions"

class Posts extends Component {
  componentDidMount() {
    // get initial data
    this.props.posts.length === 0 &&
      api.fetchAllPosts().then(post => {
        console.log("fetching posts")
        this.props.addPost(post)
        this.props.sortPost("voteScore")
      })
  }

  render() {
    return (
      <div>
        <button
          className="ui button primary compact basic"
          onClick={e => this.props.sortPost("voteScore")}
        >
          SortByVote
        </button>
        <button
          className="ui button primary compact basic"
          onClick={e => this.props.sortPost("timestamp")}
        >
          SortByDate
        </button>

        <div className="ui one column grid">
          {this.props.posts.length !== 0 &&
            this.props.filter === "ALL" &&
            this.props.posts
              .filter(p => !p.deleted)
              .map(p => <PostSimple post={p} key={p.id} />)}

          {this.props.posts.length !== 0 &&
            this.props.posts
              .filter(p => !p.deleted && p.category === this.props.filter)
              .map(p => <PostSimple post={p} key={p.id} />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts: posts,
    filter: categories.filter
  }
}

export default connect(mapStateToProps, { addPost, sortPost })(Posts)
