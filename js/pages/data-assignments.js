import { getState } from '../state.js'

export function getAssignmentsByCurrentDate() {
  const state = getState()
  return state.data[state.currentDate].assignments
}