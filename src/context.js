import React, { useReducer, createContext } from "react"

const initialState = {
  isOn: false,
  interval: 1500,
  sequence: [],
  playersSequence: [],
  isStrict: false,
  hasStarted: false,
  isActive: undefined,
  timeouts: [],
  isPlayersTurn: false,
  playersTimeout: [],
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
          ...state,
          isOn: state.isOn ? false : true,
        }
      case TYPES.HANDLE_START:
        return state.hasStarted
          ? initialState
          : {
              ...state,
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
            }
          : {
              ...state,
              isPlayersTurn: true,
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

      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(logicReducer, initialState)
  return (
    <SimonContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SimonContext.Provider>
  )
}

export default SimonContextProvider
