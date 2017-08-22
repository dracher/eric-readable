import {
  ADD_POST,
  EDIT_POST,
  DEL_POST,
  VOTE_POST,
  SORT_POST
} from "../Actions/PostActions"

export function posts(state = [], action) {
  let { post, postId, by, option } = action
  switch (action.type) {
    case ADD_POST:
      return state.concat(post)
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
      switch (option) {
        case "upVote":
          return state.map(p => {
            if (p.id === postId) {
              p.voteScore += 1
              return p
            }
            return p
          })
        case "downVote":
          return state.map(p => {
            if (p.id === postId) {
              p.voteScore -= 1
              return p
            }
            return p
          })
        default:
          return state
      }
    case SORT_POST:
      let sortedAry = state.slice()
      switch (by) {
        case "voteScore":
          return sortedAry.sort((a, b) => {
            return a.voteScore < b.voteScore
          })
        case "timestamp":
          return sortedAry.sort((a, b) => {
            return a.timestamp < b.timestamp
          })
        default:
          return state
      }
    default:
      return state
  }
}
