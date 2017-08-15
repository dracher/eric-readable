import React, { Component } from "react"
import { connect } from "react-redux"
import * as api from "../Util/api.js"
import { updatePosts, votePost } from "../Actions"

class Posts extends Component {
  componentDidMount() {
    api.fetchAllPosts().then(posts => {
      this.props.updatePosts(posts)
    })
  }
  unixToReadable(param) {
    let d = new Date(param)
    return d.toDateString()
  }
  render() {
    const { posts } = this.props
    return (
      <div className="ui one column grid">
        {posts.posts && posts.posts.length !== 0
          ? posts.posts.map(post =>
            <div className="column" key={post.id}>
              <div className="ui card fluid" >
                <div className="content">
                  <div className="right floated ui grey circular label">{post.voteScore}</div>

                  <div className="header">
                    {post.title}
                  </div>
                  <div className="meta">
                    {post.author} - {this.unixToReadable(post.timestamp)}
                  </div>
                  <div className="description">
                    <p>
                      {post.body}
                    </p>
                  </div>
                </div>
                <div className="extra content">
                  <span className="left floated like">
                    <i className="thumbs outline up icon" onClick={() => this.props.votePost({ postId: post.id, voteType: 'up' })} />
                  </span>
                  <span className="right floated star">
                    <i className="thumbs down icon" onClick={() => this.props.votePost({ postId: post.id, voteType: 'down' })} />
                  </span>
                </div>
              </div>
            </div>
          )
          : <div />}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updatePosts: data => dispatch(updatePosts(data)),
    votePost: data => dispatch(votePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)