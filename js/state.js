import { saveToStorage, loadFromStorage } from './storage.js'

function getReadableDate() {
	const nowDate = new Date()
	let normalMonth = String(nowDate.getMonth()).padStart(2, '0')
	return `${nowDate.getFullYear()}-${normalMonth}`
}


const defaultState = {
  currentDate: getReadableDate(),
  data: {}
}

let state = loadFromStorage() || defaultState

export function getState() {
  return state
}

export function setState(newState) {
  state = newState
  saveToStorage(state)
}

export function updateState(updater) {
  updater(state)
  saveToStorage(state)
}

