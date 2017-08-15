import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducer from './Reducers'
import App from "./Components/App"
import registerServiceWorker from "./registerServiceWorker"
import '../node_modules/semantic-ui-css/semantic.min.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()