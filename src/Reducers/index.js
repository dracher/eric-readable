import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { UPDATE_CATEGORIES, UPDATE_POSTS, VOTE_POST, SORT_POST, NEW_POST } from '../Actions'

function categories(state = {categories: []}, action) {
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
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === postId) {
            voteType === 'up' ? post.voteScore += 1 : post.voteScore -= 1
            return post
          }
          return post
        })
      }
    case SORT_POST:
      const { col } = action
      switch (col) {
        case 'voteScore':
          return {
            ...state,
            posts: state.posts.sort((a, b) => {
              return a.voteScore < b.voteScore
            })
          }
        case 'timestamp':
          return {
            ...state,
            posts: state.posts.sort((a, b) => {
              return a.timestamp < b.timestamp
            })
          }
        default:
          return state
      }
    case NEW_POST:
      state.posts.push({ ...action })
      return {
        ...state,
        posts: state.posts
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  routing: routerReducer
})
