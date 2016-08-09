import React from 'react'
import { connect } from 'react-redux'
import { addClueToBank } from '../actions'

const AddClueToBankComponent = ({dispatch}) => {

  let answerInput, clueInput;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!answerInput.value.trim() || !clueInput.value.trim()) {
          return
        }
        dispatch(addClueToBank(answerInput.value.toUpperCase(), clueInput.value));
        answerInput.value = '';
        clueInput.value = '';
      }}>
        <input placeholder="Answer" className="answerInput" ref={node => {
          answerInput = node
        }} />
        <input placeholder="Clue" ref={node => {
          clueInput = node
        }} />
        <button type="submit" className="addClueButton">
          Add Clue
        </button>
      </form>
    </div>
  )
}

const AddClueToBank = connect()(AddClueToBankComponent)

export default AddClueToBank
