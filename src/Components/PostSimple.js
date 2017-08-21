import React, { Component } from "react"
import { Link } from "react-router-dom"
import { votePost } from "../Actions"
import { connect } from "react-redux"

class PostSimple extends Component {
  handleVote(e, option) {
    e.preventDefault()
    this.props.votePost({
      postId: this.props.post.id,
      option
    })
  }
  render() {
    return (
      <div className="column">
        <div className="ui card fluid">
          <div className="content">
            <div className="right floated ui grey circular label">
              {this.props.post.voteScore}
            </div>
            <div className="header">
              <Link to={"/post/" + this.props.post.id}>
                {this.props.post.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [{this.props.post.category}]
              </Link>
            </div>
          </div>

          <div className="extra content">
            <span className="left floated like">
              <i
                className="thumbs outline up icon"
                onClick={e => this.handleVote(e, "upVote")}
              />
            </span>
            <span className="right floated star">
              <i className="thumbs down icon" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    votePost: data => dispatch(votePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSimple)
