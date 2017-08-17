import * as api from "../Util/api"

export const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER"
export const ADD_CATEGORY = "ADD_CATEGORY"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const DEL_POST = "DEL_POST"
export const VOTE_POST = "VOTE_POST"
export const SORT_POST = "SORT_POST"

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

export function votePost(post) {
  return { type: VOTE_POST, post }
}

export function sortPost(by) {
  return { type: SORT_POST, by }
}

export function thunkAddPost(post) {
  return function(dispatch) {
    return api
      .newPost(post)
      .then(post => dispatch(addPost([].push(post))))
      .catch(e => console.error(e))
  }
}
