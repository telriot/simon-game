import React, { useContext } from "react"
import { SimonContext } from "../context"

const Button = React.forwardRef((props, ref) => {
  const { state, dispatch, isPlayersTurn } = useContext(SimonContext)
  const handleMouseDown = (e) => {
    e.persist()
    dispatch({ type: "CHANGE_BUTTON_STATE", button: parseInt(e.target.id) })
    //ref.current.play()
  }
  const handleMouseUp = (e) => {
    e.persist()

    dispatch({ type: "RESET_BUTTONS" })

    dispatch({
      type: "ADD_TO_PLAYERS_SEQUENCE",
      number: parseInt(e.target.id),
    })
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
