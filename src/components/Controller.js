import React, { useContext, useEffect } from "react"
import controllerStyles from "./Controller.module.scss"
import { SimonContext } from "../context"
import ControllerButton from "./ControllerButton"
import classNames from "classnames/bind"
let cx = classNames.bind(controllerStyles)

function Controller() {
  const { state, dispatch } = useContext(SimonContext)
  const {
    sequence,
    hasStarted,
    isPlayersTurn,
    message,
    isRepeating,
    isOn,
  } = state

  useEffect(() => {
    if (hasStarted && !isPlayersTurn && !isRepeating) {
      console.log("ADD TO SEQUENCE")
      dispatch({
        type: "ADD_TO_SEQUENCE",
        number: Math.ceil(Math.random() * 4),
      })
    }
  }, [hasStarted, isPlayersTurn])

  const counterStyle = cx({
    counter: true,
    counterLit: isPlayersTurn,
  })
  const countNumStyle = cx({
    countNum: true,
    countNumOff: !isOn,
  })

  return (
    <div className={controllerStyles.container}>
      <div className={counterStyle}>
        <h3 className={controllerStyles.countTag}>
          {isOn ? "Count" : "Tic Tac Toe"}
        </h3>
        <span className={countNumStyle}>
          {isOn ? sequence.length : null}
          {}
        </span>
      </div>

      <span className={controllerStyles.message}>{message}</span>

      <div className={controllerStyles.buttons}>
        <ControllerButton type="start" />
        <ControllerButton type="strict" />
        <ControllerButton type="on-off" />
      </div>
    </div>
  )
}

export default Controller
