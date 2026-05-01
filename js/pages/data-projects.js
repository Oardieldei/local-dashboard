import { getState } from '../state.js'

export function getProjectsByCurrentDate() {
  const state = getState()

  if (!state.data[state.currentDate]) {
    state.data[state.currentDate] = {
      employees: {},
      projects: {},
      assignments: {},
      meta: {
        employeeCounter: 0,
        projectCounter: 0,
        assignmentCounter: 0
      }
    }
  }

  return state.data[state.currentDate].projects
}