import React, { useContext } from "react"
import controllerStyles from "./Controller.module.scss"
import classNames from "classnames/bind"
import { SimonContext } from "../context"
import { clearTimeouts } from "../helpers"
let cx = classNames.bind(controllerStyles)

function ControllerButton(props) {
  const { state, dispatch } = useContext(SimonContext)
  const { isOn, isStrict, hasStarted, timeouts, playersTimeout } = state
  const { type } = props
  const btnStyle = cx({
    startBtn: type === "start",
    startBtnLit: type === "start" && hasStarted,
    startBtnOff: type === "start" && !isOn,
    strictBtn: type === "strict",
    strictBtnLit: type === "strict" && isStrict,
    strictBtnOff: type === "strict" && !isOn,
    onOffBtn: type === "on-off",
    onOffBtnLit: type === "on-off" && isOn,
  })
  const btnTagStyle = cx({
    btnTag: true,
    startTagLit: hasStarted && type === "start",
    strictTagLit: isStrict && type === "strict",
    onOffTagLit: isOn && type === "on-off",
    startTagOff: !isOn && type === "start",
    strictTagOff: !isOn && type === "strict",
  })

  const handleClick = () => {
    if (type === "start" && isOn) {
      clearTimeouts(timeouts)
      clearTimeout(playersTimeout)
      dispatch({ type: "HANDLE_START" })
    } else if (type === "strict" && isOn) {
      dispatch({ type: "HANDLE_STRICT" })
    } else if (type === "on-off") {
      clearTimeouts(timeouts)
      clearTimeout(playersTimeout)
      dispatch({ type: "HANDLE_POWER" })
    }
  }

  const tagText =
    type === "start" && hasStarted
      ? "stop"
      : type === "start" && !hasStarted
      ? "start"
      : type === "strict"
      ? "strict"
      : type === "on-off"
      ? "on/off"
      : null

  return (
    <div onClick={handleClick} className={controllerStyles.btnSet}>
      <span className={btnTagStyle}>{tagText}</span>
      <div id={type} className={btnStyle}></div>
    </div>
  )
}

export default ControllerButton
