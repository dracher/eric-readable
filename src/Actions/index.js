import * as api from "../Util/api"

export const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER"
export const ADD_CATEGORY = "ADD_CATEGORY"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const DEL_POST = "DEL_POST"
export const VOTE_POST = "VOTE_POST"
export const SORT_POST = "SORT_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const NEW_COMMENT = "NEW_COMMENT"
export const SORT_COMMENT = "SORT_COMMENT"
export const DEL_COMMENT = "DEL_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"

export function setCategoryFilter(filter) {
  return { type: SET_CATEGORY_FILTER, filter }
}

export function addCategory(category) {
  return { type: ADD_CATEGORY, category }
}

export function addPost(post) {
  return { type: ADD_POST, post }
}

export function editPost(post) {
  return { type: EDIT_POST, post }
}

export function delPost(postId) {
  return { type: DEL_POST, postId }
}

export function votePost({ postId, option }) {
  return { type: VOTE_POST, postId, option }
}

export function sortPost(by) {
  return { type: SORT_POST, by }
}

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

// -----------

export function thunkAddPost(post) {
  return function(dispatch) {
    return api
      .newPost(post)
      .then(post => {
        dispatch(addPost(post))
      })
      .catch(e => console.error(e))
  }
}

export function thunkDelPost(postId) {
  return function(dispatch) {
    return api
      .deletePostByID(postId)
      .then(res => res.ok && dispatch(delPost(postId)))
      .catch(e => console.log(e))
  }
}

export function thunkEditPost({ postId, post }) {
  return function(dispatch) {
    return api
      .updatePostByID(postId, post)
      .then(data => dispatch(editPost(data)))
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
