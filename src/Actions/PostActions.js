import * as api from "../Util/api"

export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const DEL_POST = "DEL_POST"
export const VOTE_POST = "VOTE_POST"
export const SORT_POST = "SORT_POST"

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

// thunk function

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

export function thunkVotePost({ postId, option }) {
  return function(dispatch) {
    return api
      .votePostByID(postId, option)
      .then(() => dispatch(votePost({ postId, option })))
  }
}
