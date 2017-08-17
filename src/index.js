import React from "react"
import ReactDOM from "react-dom"
import thunk from "redux-thunk"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { createBrowserHistory } from "history"
import { syncHistoryWithStore } from "react-router-redux"
import reducer from "./Reducers"
import App from "./Components/App"
import registerServiceWorker from "./registerServiceWorker"
import "../node_modules/semantic-ui-css/semantic.min.css"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
