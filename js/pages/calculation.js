import { getState } from '../state.js'

export function getEffectiveCapacity(capacityAllocation, projectFit) {
	const vacationCoefficient = 1
	let effCapa = capacityAllocation * projectFit * vacationCoefficient
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

export function getEmployeeCapacity(empId) {
	const state = getState()
	const assignments = state.data[state.currentDate].assignments

	return Object.values(assignments)
		.filter(a => a.empId === empId)
		.reduce((sum, a) => sum + Number(a.capacity), 0)
}

export function getEmployeeCapacityCount(empId) {
	const state = getState()
	const assignments = state.data[state.currentDate].assignments

	return Object.values(assignments)
		.filter(a => a.empId === empId).length
}

export function getEmployeeCost(empId) {
	const state = getState()
	
	return state.data[state.currentDate].employees[empId].salary * Math.max(0.5, getEmployeeCapacity(empId))
}

export function getProjectProgress(projId) {
	const state = getState()
	const soo = 100 * getProjectCapacity(projId) / state.data[state.currentDate].projects[projId].capacity
	return +soo.toFixed(1)
}

export function getCapacityForRevenue(projId) {
	const state = getState()
	return Math.max(getProjectCapacity(projId), state.data[state.currentDate].projects[projId].capacity)
}

export function getRevenuePerEffectiveCapacity(projId) {
	const state = getState()
	return state.data[state.currentDate].projects[projId].budget / getCapacityForRevenue(projId)
}

export function getEmployeeRevenue(assId) {
	return getRevenuePerEffectiveCapacity(assId.projId) * getEffectiveCapacity(assId.capacity, assId.fit)
}

export function getProjectEstIncome(projId) {
	const state = getState()
	const assignments = state.data[state.currentDate].assignments

	return Object.values(assignments)
		.filter(a => a.projId === projId)
		.reduce((sum, a) => {
			return sum + getEmployeeRevenue(a)
		}, 0)
}

export function getEmployeeProjectedIncome(empId) {
	const state = getState()
	const assignments = state.data[state.currentDate].assignments

	return Object.values(assignments)
		.filter(a => a.empId === empId)
		.reduce((sum, a) => {
			return sum + getEmployeeRevenue(a)
		}, 0)
}

export function getEmployeeProfit(empId) {
	return getEmployeeProjectedIncome(empId) - getEmployeeCost(empId)
}

export function getProjectProfit(projId) {
	const state = getState()
	const assignments = state.data[state.currentDate].assignments

	return Object.values(assignments)
		.filter(a => a.projId === projId)
		.reduce((sum, a) => {
			const empId = a.empId

			const employeeCost = getEmployeeCost(empId)
			const totalCapacity = getEmployeeCapacity(empId)

			const capacityShare = totalCapacity > 0
				? Number(a.capacity) / totalCapacity
				: 0

			const allocatedCost = employeeCost * capacityShare
			const revenue = getEmployeeRevenue(a)

			return sum + (revenue - allocatedCost)
		}, 0).toFixed(2)
}