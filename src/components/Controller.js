import React, { useContext, useEffect } from "react"
import controllerStyles from "./Controller.module.scss"
import { SimonContext } from "../context"
import ControllerButton from "./ControllerButton"

function Controller() {
  const { state, dispatch } = useContext(SimonContext)
  const { sequence, hasStarted, isPlayersTurn } = state
  useEffect(() => {
    if (hasStarted && !isPlayersTurn) {
      console.log("ADD TO SEQUENCE")
      dispatch({
        type: "ADD_TO_SEQUENCE",
        number: Math.ceil(Math.random() * 4),
      })
    }
  }, [hasStarted, isPlayersTurn])

  return (
    <div className={controllerStyles.container}>
      <div className={controllerStyles.counter}>
        <h3 className={controllerStyles.countTag}>Count</h3>
        <span className={controllerStyles.countNum}>{sequence.length}</span>
      </div>
      <div className={controllerStyles.buttons}>
        <ControllerButton type="start" />
        <ControllerButton type="strict" />
        <ControllerButton type="on-off" />
      </div>
    </div>
  )
}

export default Controller
