import React from "react"
import appStyles from "./AppStyles.module.scss"
import Board from "./components/Board"

function App() {
  return (
    <div className={appStyles.container}>
      <Board />
    </div>
  )
}

export default App
