export const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER"
export const ADD_CATEGORY = "ADD_CATEGORY"

export function setCategoryFilter(filter) {
  return { type: SET_CATEGORY_FILTER, filter }
}

export function addCategory(category) {
  return { type: ADD_CATEGORY, category }
}
