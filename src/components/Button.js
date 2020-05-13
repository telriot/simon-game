import React, { useContext } from "react"
import { SimonContext } from "../context"
import { isMobile } from "react-device-detect"
const Button = React.forwardRef((props, ref) => {
  const { state, dispatch } = useContext(SimonContext)
  const { isOn, hasStarted, isPlayersTurn } = state
  const handleMouseDown = (e) => {
    if (isOn && !hasStarted) {
      dispatch({ type: "CHANGE_BUTTON_STATE", button: parseInt(e.target.id) })
    }
    if (isPlayersTurn) {
      dispatch({ type: "CHANGE_BUTTON_STATE", button: parseInt(e.target.id) })
    }
  }
  const handleMouseUp = (e) => {
    if (isMobile) {
      if (isOn && !hasStarted) {
        dispatch({ type: "CHANGE_BUTTON_STATE", button: parseInt(e.target.id) })
        setTimeout(() => dispatch({ type: "RESET_BUTTONS" }), 300)
      }
      if (isPlayersTurn) {
        dispatch({ type: "CHANGE_BUTTON_STATE", button: parseInt(e.target.id) })
        setTimeout(() => dispatch({ type: "RESET_BUTTONS" }), 300)
        dispatch({
          type: "ADD_TO_PLAYERS_SEQUENCE",
          number: parseInt(e.target.id),
        })
      }
    } else {
      if (isOn && !hasStarted) {
        dispatch({ type: "RESET_BUTTONS" })
      }
      if (isPlayersTurn) {
        dispatch({ type: "RESET_BUTTONS" })
        dispatch({
          type: "ADD_TO_PLAYERS_SEQUENCE",
          number: parseInt(e.target.id),
        })
      }
    }
  }
  return (
    <div
      id={props.id}
      className={props.className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <audio
        id={`audio-${props.id}`}
        ref={ref}
        src={props.src}
        type="audio/mp3"
      />
    </div>
  )
})

export default Button
