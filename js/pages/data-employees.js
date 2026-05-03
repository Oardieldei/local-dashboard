import { getState } from '../state.js'

export function getEmployeesByCurrentDate() {
  const state = getState()
  return state.data[state.currentDate].employees
}