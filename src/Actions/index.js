import * as api from '../Util/api'

export const UPDATE_POSTS = 'UPDATE_POSTS'
export const NEW_POST = "NEW_POST"
export const DEL_POST = "DEL_POST"
export const EDIT_POST = "EDIT_POST"
export const VOTE_POST = "VOTE_POST"
export const SORT_POST = "SORT_POST"
export const GROUP_POST = "GROUP_POST"
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES"

export function updateCategories({ categories }) {
  return {
    type: UPDATE_CATEGORIES,
    categories
  }
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts
  }
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post
  }
}

export function sortPost({col}) {
  return {
    type: SORT_POST,
    col
  }
}

export function newPost(post) {
  return {
    type: NEW_POST,
    post
  }
}

export function groupPost(category) {
  return {
    type: GROUP_POST,
    category
  }
}

export function thunkVotePost({postId, option}) {
  return function(dispatch) {
    return api.votePostByID(postId, option)
      .then(post => {
        dispatch(votePost(post))
      })
      .catch(e => console.log(e))
  }
}

export function thunkNewPost({title, body, author, category}) {
  return function(dispatch) {
    return api.newPost({title, body, author, category})
      .then(post => {
        dispatch(newPost(post))
      })
      .catch(e => console.log(e))
  }
}
