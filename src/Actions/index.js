export const UPDATE_POSTS = 'UPDATE_POSTS'
export const NEW_POST = "NEW_POST"
export const DEL_POST = "DEL_POST"
export const EDIT_POST = "EDIT_POST"
export const VOTE_POST = "VOTE_POST"
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

export function votePost({postId, voteType}) {
  return {
    type: VOTE_POST,
    postId,
    voteType
  }
}
