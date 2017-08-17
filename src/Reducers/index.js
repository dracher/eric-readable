import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { SET_CATEGORY_FILTER, ADD_CATEGORY } from "../Actions"
import { ADD_POST, EDIT_POST, DEL_POST, VOTE_POST, SORT_POST } from "../Actions"

function categories(state = { categories: [], filter: "ALL" }, action) {
  let { category, filter } = action
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          ...category.filter(c => !state.categories.includes(c))
        ]
      }
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        filter
      }
    default:
      return state
  }
}

function posts(state = [], action) {
  let { post, postId } = action
  switch (action.type) {
    case ADD_POST:
      return [...state, ...post]
    case EDIT_POST:
      return state.map(p => (p.id === post.id ? post : p))
    case DEL_POST:
      return state.map(p => {
        if (p.id === postId) {
          p.deleted = true
          return p
        }
        return p
      })
    case VOTE_POST:
      return state
    case SORT_POST:
      return state
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  routing: routerReducer
})
