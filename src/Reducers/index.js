import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import {
  SET_CATEGORY_FILTER,
  ADD_CATEGORY,
  SORT_COMMENT,
  NEW_COMMENT,
  DEL_COMMENT,
  VOTE_COMMENT
} from "../Actions";
import {
  ADD_POST,
  EDIT_POST,
  DEL_POST,
  VOTE_POST,
  SORT_POST,
  ADD_COMMENT
} from "../Actions";

function categories(state = { categories: [], filter: "ALL" }, action) {
  let { category, filter } = action;
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          ...category.filter(c => !state.categories.includes(c))
        ]
      };
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        filter
      };
    default:
      return state;
  }
}

function posts(state = [], action) {
  let { post, postId, by, option } = action;
  switch (action.type) {
    case ADD_POST:
      return state.concat(post);
    case EDIT_POST:
      return state.map(p => (p.id === post.id ? post : p));
    case DEL_POST:
      return state.map(p => {
        if (p.id === postId) {
          p.deleted = true;
          return p;
        }
        return p;
      });
    case VOTE_POST:
      switch (option) {
        case "upVote":
          return state.map(p => {
            if (p.id === postId) {
              p.voteScore += 1;
              return p;
            }
            return p;
          });
        case "downVote":
          return state.map(p => {
            if (p.id === postId) {
              p.voteScore -= 1;
              return p;
            }
            return p;
          });
        default:
          return state;
      }
    case SORT_POST:
      let sortedAry = state.slice();
      switch (by) {
        case "voteScore":
          return sortedAry.sort((a, b) => {
            return a.voteScore < b.voteScore;
          });
        case "timestamp":
          return sortedAry.sort((a, b) => {
            return a.timestamp < b.timestamp;
          });
        default:
          return state;
      }
    default:
      return state;
  }
}

function comments(state = [], action) {
  let { comment, commentId, by, option } = action;
  switch (action.type) {
    case ADD_COMMENT:
      return [].concat(comment);
    case NEW_COMMENT:
      return state.concat(comment);
    case SORT_COMMENT:
      let sortedAry = state.slice();
      switch (by) {
        case "voteScore":
          return sortedAry.sort((a, b) => {
            return a.voteScore < b.voteScore;
          });
        case "timestamp":
          return sortedAry.sort((a, b) => {
            return a.timestamp < b.timestamp;
          });
        default:
          return state;
      }
    case VOTE_COMMENT:
      switch (option) {
        case "upVote":
          return state.map(p => {
            if (p.id === commentId) {
              p.voteScore += 1;
              return p;
            }
            return p;
          });
        case "downVote":
          return state.map(p => {
            if (p.id === commentId) {
              p.voteScore -= 1;
              return p;
            }
            return p;
          });
        default:
          return state;
      }
    case DEL_COMMENT:
      return state.map(p => {
        if (p.id === commentId) {
          p.deleted = true;
          return p;
        }
        return p;
      });
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  routing: routerReducer
});
