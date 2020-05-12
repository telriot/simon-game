import React, { useContext } from "react"
import controllerStyles from "./Controller.module.scss"
import classNames from "classnames/bind"
import { SimonContext } from "../context"
let cx = classNames.bind(controllerStyles)

function ControllerButton(props) {
  const { state, dispatch } = useContext(SimonContext)
  const { isOn, isStrict, hasStarted } = state
  const { type } = props
  const btnStyle = cx({
    startBtn: type === "start",
    startBtnLit: type === "start" && hasStarted,
    strictBtn: type === "strict",
    strictBtnLit: type === "strict" && isStrict,
    onOffBtn: type === "on-off",
    onOffBtnLit: type === "on-off" && isOn,
  })
  const handleClick = () => {
    type === "start"
      ? dispatch({ type: "HANDLE_START" })
      : type === "strict"
      ? dispatch({ type: "HANDLE_STRICT" })
      : type === "on-off"
      ? dispatch({ type: "HANDLE_POWER" })
      : console.log("nothing")
  }

  return (
    <div onClick={handleClick} className={controllerStyles.btnSet}>
      <span className={controllerStyles.btnTag}>{props.type}</span>
      <div id={type} className={btnStyle}></div>
    </div>
  )
}

export default ControllerButton
