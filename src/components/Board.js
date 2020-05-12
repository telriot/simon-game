import React, { useRef, useState, useEffect, useContext } from "react"
import boardStyles from "./Board.module.scss"
import classNames from "classnames/bind"

import Button from "./Button"
import Controller from "./Controller"
import sound1 from "../media/simonSound1.mp3"
import sound2 from "../media/simonSound2.mp3"
import sound3 from "../media/simonSound3.mp3"
import sound4 from "../media/simonSound4.mp3"
import { SimonContext } from "../context"

let cx = classNames.bind(boardStyles)

function Board() {
  const { state, dispatch } = useContext(SimonContext)
  const {
    isActive,
    interval,
    sequence,
    timeouts,
    isPlayersTurn,
    playersSequence,
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
    let timeouts = []
    if (sequence.length) {
      const passToPlayer = setTimeout(
        () => {
          dispatch({ type: "SWITCH_TURN" })
          console.log("timed turn switch")
        },

        (sequence.length - 1) * interval + 1900
      )
      const clearTimeouts = setTimeout(
        () => dispatch({ type: "CLEAR_TIMEOUTS" }),
        (sequence.length - 1) * interval + 2000
      )
      for (let i = 0; i < sequence.length; i++) {
        console.log("fire button timeouts", i)
        const timeoutID = setTimeout(
          () => dispatch({ type: "CHANGE_BUTTON_STATE", button: sequence[i] }),
          i * interval + 1500
        )
        const resetID = setTimeout(
          () => dispatch({ type: "RESET_BUTTONS" }),
          i * interval + 1750
        )
        timeouts.push(timeoutID, resetID, passToPlayer)
        dispatch({ type: "ADD_TIMEOUTS", timeouts })
        timeouts = []
      }
    }
  }, [sequence])

  useEffect(() => {
    if (isPlayersTurn) {
      const playersTimeout = setTimeout(() => {
        if (
          playersSequence[playersSequence.length] !==
          sequence[playersSequence.length]
        ) {
          console.log("too late")
          dispatch({ type: "HANDLE_START" })
        }
      }, interval)
      dispatch({ type: "ADD_PLAYERS_TIMEOUT", timeout: playersTimeout })
    }
  }, [isPlayersTurn])

  useEffect(() => {
    if (playersSequence.length) {
      console.log(
        "p-seq use effect fired",
        playersSequence[playersSequence.length - 1],
        sequence[playersSequence.length - 1],
        playersSequence.length,
        playersSequence
      )
      if (
        playersSequence[playersSequence.length - 1] !==
        sequence[playersSequence.length - 1]
      ) {
        console.log("you lose")
        dispatch({ type: "HANDLE_START" })
      }
      if (
        playersSequence[playersSequence.length - 1] ===
        sequence[playersSequence.length - 1]
      ) {
        console.log("step cleared")
        clearTimeout(state.playersTimeout)
        dispatch({ type: "CLEAR_PLAYERS_TIMEOUT" })
        if (playersSequence.length < sequence.length) {
          console.log("set timeout for next step")
          const playersTimeout = setTimeout(() => {
            if (
              playersSequence[playersSequence.length] !==
                sequence[playersSequence.length] ||
              playersSequence.length !== sequence.length
            ) {
              dispatch({ type: "HANDLE_START" })
              console.log("too late")
            }
          }, interval)
          dispatch({ type: "ADD_PLAYERS_TIMEOUT", timeout: playersTimeout })
        }
        if (playersSequence.length === sequence.length) {
          console.log("switching turn", isPlayersTurn)
          dispatch({ type: "SWITCH_TURN" })
        }
      }
    }
  }, [playersSequence.length])

  const classRed = cx({
    buttonRed: true,
    buttonRedLit: isActive === 1,
  })
  const classBlue = cx({
    buttonBlue: true,
    buttonBlueLit: isActive === 2,
  })
  const classYellow = cx({
    buttonYellow: true,
    buttonYellowLit: isActive === 3,
  })
  const classGreen = cx({
    buttonGreen: true,
    buttonGreenLit: isActive === 4,
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
