import React, { useReducer, createContext } from "react"

const initialState = {
  isOn: false,
  interval: 1000,
  sequence: [],
  playersSequence: [],
  isStrict: false,
  hasStarted: false,
  isActive: undefined,
  timeouts: [],
  isPlayersTurn: false,
  playersTimeout: [],
  wincon: 10,
  message: "",
  isRepeating: false,
  playersTimeoutDuration: 2000,
}

export const SimonContext = createContext(initialState)

const SimonContextProvider = (props) => {
  const TYPES = {
    CHANGE_BUTTON_STATE: "CHANGE_BUTTON_STATE",
    RESET_BUTTONS: "RESET_BUTTONS",
    HANDLE_POWER: "HANDLE_POWER",
    HANDLE_START: "HANDLE_START",
    HANDLE_STRICT: "HANDLE_STRICT",
    ADD_TO_SEQUENCE: "ADD_TO_SEQUENCE",
    ADD_TIMEOUTS: "ADD_TIMEOUTS",
    ADD_PLAYERS_TIMEOUT: "ADD_PLAYERS_TIMEOUT",
    CLEAR_TIMEOUTS: "CLEAR_TIMEOUTS",
    CLEAR_PLAYERS_TIMEOUT: " CLEAR_PLAYERS_TIMEOUT",
    SWITCH_TURN: "SWITCH_TURN",
    ADD_TO_PLAYERS_SEQUENCE: "ADD_TO_PLAYERS_SEQUENCE",
    SET_MESSAGE: "SET_MESSAGE",
    CLEAR_MESSAGE: "CLEAR_MESSAGE",
    REPEAT: "REPEAT",
  }
  const logicReducer = (state, action) => {
    switch (action.type) {
      case TYPES.CHANGE_BUTTON_STATE:
        return {
          ...state,
          isActive: action.button,
        }
      case TYPES.RESET_BUTTONS:
        return {
          ...state,
          isActive: undefined,
        }
      case TYPES.HANDLE_POWER:
        return {
          ...initialState,
          isOn: state.isOn ? false : true,
        }
      case TYPES.HANDLE_START:
        return state.hasStarted
          ? {
              ...initialState,
              isStrict: state.isStrict,
              isOn: state.isOn,
              message: action.message,
            }
          : {
              ...initialState,
              isStrict: state.isStrict,
              isOn: state.isOn,
              hasStarted: true,
            }
      case TYPES.HANDLE_STRICT:
        return {
          ...state,
          isStrict: state.isStrict ? false : true,
        }
      case TYPES.ADD_TO_SEQUENCE: {
        return {
          ...state,
          sequence: [...state.sequence, action.number],
        }
      }
      case TYPES.ADD_TIMEOUTS: {
        return {
          ...state,
          timeouts: [...state.timeouts, ...action.timeouts],
        }
      }
      case TYPES.CLEAR_TIMEOUTS: {
        return {
          ...state,
          timeouts: [],
        }
      }
      case TYPES.SWITCH_TURN: {
        return state.isPlayersTurn
          ? {
              ...state,
              isPlayersTurn: false,
              playersSequence: [],
              message: "",
            }
          : {
              ...state,
              isPlayersTurn: true,
              isRepeating: false,
              message: "",
            }
      }
      case TYPES.ADD_TO_PLAYERS_SEQUENCE: {
        return {
          ...state,
          playersSequence: [...state.playersSequence, action.number],
        }
      }
      case TYPES.ADD_PLAYERS_TIMEOUT: {
        return {
          ...state,
          playersTimeout: action.timeout,
        }
      }
      case TYPES.CLEAR_PLAYERS_TIMEOUT: {
        return {
          ...state,
          playersTimeout: null,
        }
      }
      case TYPES.SET_MESSAGE: {
        return {
          ...state,
          message: action.message,
        }
      }
      case TYPES.CLEAR_MESSAGE: {
        return {
          ...state,
          message: "",
        }
      }
      case TYPES.REPEAT: {
        return {
          ...state,
          isRepeating: true,
          isPlayersTurn: false,
          message: "repeating",
          playersSequence: [],
        }
      }

      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(logicReducer, initialState)

  const handleSimonsTurn = () => {
    const { sequence, interval } = state
    let timeouts = []
    const delay = 1500
    //SETUP
    const passToPlayer = setTimeout(() => {
      dispatch({ type: "SWITCH_TURN" })
    }, (sequence.length - 1) * interval + delay + 450)
    const clearStateTimeouts = setTimeout(
      () => dispatch({ type: "CLEAR_TIMEOUTS" }),
      (sequence.length - 1) * interval + delay + 500
    )
    //REPRODUCE THE SEQUENCE
    for (let i = 0; i < sequence.length; i++) {
      const timeoutID = setTimeout(
        () => dispatch({ type: "CHANGE_BUTTON_STATE", button: sequence[i] }),
        i * interval + delay
      )
      const resetID = setTimeout(
        () => dispatch({ type: "RESET_BUTTONS" }),
        i * interval + delay + 300
      )
      //SAVE TIMEOUT IDS IN STATE
      timeouts.push(timeoutID, resetID, passToPlayer)
      dispatch({ type: "ADD_TIMEOUTS", timeouts })
      timeouts = []
    }
  }

  const setPlayersTimeout = () => {
    const {
      playersSequence,
      sequence,
      isStrict,
      hasStarted,
      playersTimeoutDuration,
    } = state
    const playersTimeout = setTimeout(() => {
      if (
        hasStarted &&
        playersSequence[playersSequence.length] !==
          sequence[playersSequence.length]
      ) {
        isStrict
          ? dispatch({ type: "HANDLE_START", message: "YOU LOSE" })
          : dispatch({ type: "REPEAT" })
      }
    }, playersTimeoutDuration)
    dispatch({ type: "ADD_PLAYERS_TIMEOUT", timeout: playersTimeout })
  }

  return (
    <SimonContext.Provider
      value={{ state, dispatch, handleSimonsTurn, setPlayersTimeout }}
    >
      {props.children}
    </SimonContext.Provider>
  )
}

export default SimonContextProvider
