import React, { useRef, useEffect, useContext } from "react"
import boardStyles from "./Board.module.scss"
import classNames from "classnames/bind"
import Button from "./Button"
import Controller from "./Controller"
import sound1 from "../media/simonSound1.mp3"
import sound2 from "../media/simonSound2.mp3"
import sound3 from "../media/simonSound3.mp3"
import sound4 from "../media/simonSound4.mp3"
import { SimonContext } from "../context"
import { clearTimeouts } from "../helpers"

let cx = classNames.bind(boardStyles)

function Board() {
  const { state, dispatch, handleSimonsTurn, setPlayersTimeout } = useContext(
    SimonContext
  )
  const {
    isActive,
    sequence,
    timeouts,
    isPlayersTurn,
    playersSequence,
    wincon,
    isStrict,
    isRepeating,
    isOn,
    hasStarted,
  } = state
  const audio1 = useRef()
  const audio2 = useRef()
  const audio3 = useRef()
  const audio4 = useRef()

  useEffect(() => {
    isActive === 1 && audio1.current.play()
    isActive === 2 && audio2.current.play()
    isActive === 3 && audio3.current.play()
    isActive === 4 && audio4.current.play()
  }, [isActive])

  useEffect(() => {
    sequence.length && handleSimonsTurn()
  }, [sequence])

  useEffect(() => {
    isRepeating && handleSimonsTurn()
  }, [isRepeating])

  useEffect(() => {
    clearTimeout(state.playersTimeout)
    clearTimeouts(timeouts)
    if (isPlayersTurn) {
      setPlayersTimeout()
    }
  }, [isPlayersTurn])

  useEffect(() => {
    if (hasStarted && playersSequence.length) {
      let currentIndex = playersSequence.length - 1
      if (playersSequence[currentIndex] !== sequence[currentIndex]) {
        clearTimeout(state.playersTimeout)
        clearTimeouts(timeouts)
        isStrict
          ? dispatch({ type: "HANDLE_START", message: "YOU LOSE" })
          : dispatch({ type: "REPEAT" })
      }
      if (playersSequence[currentIndex] === sequence[currentIndex]) {
        clearTimeout(state.playersTimeout)
        if (playersSequence.length === wincon) {
          clearTimeouts(timeouts)
          dispatch({ type: "HANDLE_START", message: "YOU WIN" })
        } else {
          dispatch({ type: "CLEAR_PLAYERS_TIMEOUT" })
          if (playersSequence.length < sequence.length) {
            setPlayersTimeout()
          }
          if (playersSequence.length === sequence.length) {
            dispatch({ type: "SWITCH_TURN" })
          }
        }
      }
    }
  }, [playersSequence.length])

  const classRed = cx({
    buttonRed: true,
    buttonRedLit: isActive === 1,
    buttonRedOff: !isOn,
  })
  const classBlue = cx({
    buttonBlue: true,
    buttonBlueLit: isActive === 2,
    buttonBlueOff: !isOn,
  })
  const classYellow = cx({
    buttonYellow: true,
    buttonYellowLit: isActive === 3,
    buttonYellowOff: !isOn,
  })
  const classGreen = cx({
    buttonGreen: true,
    buttonGreenLit: isActive === 4,
    buttonGreenOff: !isOn,
  })

  return (
    <div className={boardStyles.grid}>
      <Button id={1} src={sound1} ref={audio1} className={classRed} />
      <Button id={2} src={sound2} ref={audio2} className={classBlue} />
      <Button id={3} src={sound3} ref={audio3} className={classYellow} />
      <Button id={4} src={sound4} ref={audio4} className={classGreen} />
      <Controller />
    </div>
  )
}

export default Board
