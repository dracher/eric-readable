import { ADD_CATEGORY, SET_CATEGORY_FILTER } from "../Actions/CategoryActions"

export function categories(state = { categories: [], filter: "ALL" }, action) {
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
