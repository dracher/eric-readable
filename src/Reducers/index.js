import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { categories } from "./categories"
import { comments } from "./comments"
import { posts } from "./posts"

export default combineReducers({
  categories,
  posts,
  comments,
  routing: routerReducer
})
