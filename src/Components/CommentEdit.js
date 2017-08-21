import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { thunkEditComment } from "../Actions";

class CommentEdit extends Component {
  state = {
    ...this.props.comments.filter(c => this.props.commentId === c.id)[0]
  };

  handleChange(k, v) {
    this.setState({ [k]: v });
  }
  handleSubmit(e) {
    e.preventDefault();
    let backUrl = `/post/${this.state.parentId}`;
    const { body } = this.state;
    let payload = {
      body
    };
    this.props
      .thunkEditComment({ commentId: this.state.id, comment: payload })
      .then(() => this.props.history.push(backUrl));
  }

  render() {
    const { body } = this.state;
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
        <Link className="ui button red" to={"/post/" + this.state.parentId}>
          Cancel
        </Link>
      </form>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: comments
  };
}
function mapDispatchToProps(dispatch) {
  return {
    thunkEditComment: data => dispatch(thunkEditComment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);