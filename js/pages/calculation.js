import { getState } from '../state.js'

export function getEffectiveCapacity(capacityAllocation, projectFit) {
	let effCapa = capacityAllocation * projectFit
	return +effCapa.toFixed(3)
}

export function getProjectCapacity(projId) {
	const state = getState()
	const assignments = state.data[state.currentDate].assignments

	return Object.values(assignments)
		.filter(a => a.projId === projId)
		.reduce((sum, a) => {
			const capacity = Number(a.capacity)
			const fit = Number(a.fit)

			return sum + getEffectiveCapacity(capacity, fit)
		}, 0)
}

export function getProjectProgress(projId) {
	const state = getState()
	const soo = 100 * getProjectCapacity(projId) / state.data[state.currentDate].projects[projId].capacity
	return +soo.toFixed(1)
}