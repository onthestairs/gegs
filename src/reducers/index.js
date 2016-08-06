import { combineReducers } from 'redux'
import crossword from './crossword'
// import visibilityFilter from './visibilityFilter'

const crosswordApp = combineReducers({
  crossword,
  // visibilityFilter
})

export default crosswordApp
