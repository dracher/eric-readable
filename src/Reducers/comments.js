import {
  ADD_COMMENT,
  SORT_COMMENT,
  NEW_COMMENT,
  DEL_COMMENT,
  VOTE_COMMENT
} from "../Actions/CommentActions"

export function comments(state = [], action) {
  let { comment, commentId, by, option } = action
  switch (action.type) {
    case ADD_COMMENT:
      return [].concat(comment)
    case NEW_COMMENT:
      return state.concat(comment)
    case SORT_COMMENT:
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
    case VOTE_COMMENT:
      switch (option) {
        case "upVote":
          return state.map(p => {
            if (p.id === commentId) {
              p.voteScore += 1
              return p
            }
            return p
          })
        case "downVote":
          return state.map(p => {
            if (p.id === commentId) {
              p.voteScore -= 1
              return p
            }
            return p
          })
        default:
          return state
      }
    case DEL_COMMENT:
      return state.map(p => {
        if (p.id === commentId) {
          p.deleted = true
          return p
        }
        return p
      })
    default:
      return state
  }
}
