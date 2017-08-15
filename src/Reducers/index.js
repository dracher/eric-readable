import { combineReducers } from 'redux'
import { UPDATE_CATEGORIES, UPDATE_POSTS, VOTE_POST } from '../Actions'

function categories(state = {}, action) {
  const { categories } = action

  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories
      }
    default:
      return state
  }
}

function posts(state = { posts: [] }, action) {
  switch (action.type) {
    case UPDATE_POSTS:
      const { posts } = action
      return {
        ...state,
        posts
      }
    case VOTE_POST:
      const { postId, voteType } = action
      let p = state.posts.map(post => {
        if (post.id === postId) {
          voteType === 'up' ? post.voteScore += 1 : post.voteScore -= 1
          return post
        }
        return post
      })
      return {
        ...state,
        posts: p
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
