import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import root from './reducers/groupReducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    root,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}