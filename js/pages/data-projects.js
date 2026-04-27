import { getState } from '../state.js'

export function getProjectsByCurrentDate() {
  const state = getState()
  return state.data[state.currentDate].projects
}