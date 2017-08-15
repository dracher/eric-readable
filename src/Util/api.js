import { uuidv4 } from "./helper.js"

const headers = { Authorization: "eric-readable" }
const apiURL = "http://0.0.0.0:5001"

export function fetchCategories() {
  return fetch(apiURL + "/categories", { headers })
    .then(res => res.json())
    .then(data => data)
    // .then(({ categories }) => categories.map(({ name }) => name))
}

export function fetchPostsByCategory(category) {
  return fetch(apiURL + `/${category}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts)
}

export function fetchAllPosts() {
  return fetch(apiURL + `/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts)
}

export function newPost(params) {
  return fetch(apiURL + `/posts`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      ...params,
      id: uuidv4(),
      timestamp: Date.now()
    })
  }).then(res => res.json())
}

export function fetchPostByID(post_id) {
  return fetch(apiURL + `/posts/${post_id}`, { headers })
    .then(res => res.json())
    .then(post => post)
}

export function votePostByID(post_id, option) {
  return fetch(apiURL + `/posts/${post_id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ option })
  }).then(res => res.json())
}

export function updatePostByID(post_id, params) {
  return fetch(apiURL + `/posts/${post_id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify({ ...params })
  })
    .then(res => res.json())
}

export function deletePostByID(post_id) {
  return fetch(apiURL + `/posts/${post_id}`, {
    headers,
    method: "DELETE"
  })
    .then(res => res)
}

export function fetchCommentsByPostID(post_id) {
  return fetch(apiURL + `/posts/${post_id}/comments`, { headers })
    .then(res => res.json())
}

// params : { author, body, parentID }
export function newComment(params) {
  let payload = {
    ...params,
    id: uuidv4(),
    timestamp: Date.now()
  }

  return fetch(apiURL + `/comments`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(res => res)
}

export function fetchCommentByID(comment_id) {
  return fetch(apiURL + `/comments/${comment_id}`, { headers })
    .then(res => res.json())
}

export function voteCommentByID(comment_id, option) {
  return fetch(apiURL + `/comments/${comment_id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({ option })
  }).then(res => res)
}

export function updateCommentByID(comment_id, params) {
  return fetch(apiURL + `/comments/${comment_id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify({
      ...params,
      timestamp: Date.now()
    })
  }).then(res => res)
}

export function deleteCommentByID(comment_id) {
  return fetch(apiURL + `/comments/${comment_id}`, {
    headers,
    method: "DELETE"
  })
}
