import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import SimonContextProvider from "./context"

ReactDOM.render(
  <React.StrictMode>
    <SimonContextProvider>
      <App />
    </SimonContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
