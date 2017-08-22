import * as api from "../Util/api"

export const ADD_COMMENT = "ADD_COMMENT"
export const NEW_COMMENT = "NEW_COMMENT"
export const SORT_COMMENT = "SORT_COMMENT"
export const DEL_COMMENT = "DEL_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"

export function addComment(comment) {
  return { type: ADD_COMMENT, comment }
}

export function newComment(comment) {
  return { type: NEW_COMMENT, comment }
}

export function sortComment(by) {
  return { type: SORT_COMMENT, by }
}

export function delComment(commentId) {
  return { type: DEL_COMMENT, commentId }
}

export function voteComment({ commentId, option }) {
  return { type: VOTE_COMMENT, commentId, option }
}

export function editComment(comment) {
  return { type: EDIT_COMMENT, comment }
}

// thunk function

export function thunkEditComment({ commentId, comment }) {
  return function(dispatch) {
    return api
      .updateCommentByID(commentId, comment)
      .then(data => dispatch(editComment(data)))
      .catch(e => console.log(e))
  }
}

export function thunkNewComment(comment) {
  return function(dispatch) {
    return api
      .newComment(comment)
      .then(data => dispatch(newComment(data)))
      .catch(e => console.log(e))
  }
}

export function thunkDelComment(commentId) {
  return function(dispatch) {
    return api
      .deleteCommentByID(commentId)
      .then(() => dispatch(delComment(commentId)))
  }
}

export function thunkVoteComment({ commentId, option }) {
  return function(dispatch) {
    return api
      .voteCommentByID(commentId, option)
      .then(() => dispatch(voteComment({ commentId, option })))
      .catch(e => console.log(e))
  }
}
