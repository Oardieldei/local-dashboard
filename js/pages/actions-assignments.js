import { closeAllModals } from './side-full.js'
import { addAssOptions, addAssStatControl } from './side-assignments.js'
import { updateState } from '../state.js'
import { renderAassignments } from './render-assignments.js'
import { isSure } from './actions.js'

export function deleteAssignment(id) {
	if (isSure()) {
		updateState(state => {
			delete state.data[state.currentDate].assignments[id]
		})

		renderAassignments()
	}
}

export function changeAssignment(id, newCapacity, newFit) {
	updateState(state => {
		state.data[state.currentDate].assignments[id].capacity = newCapacity
		state.data[state.currentDate].assignments[id].fit = newFit
	})

	renderAassignments()
}

const addAssignmentWrapper = document.querySelector('.add_assignment')
const sideLi = addAssignmentWrapper.querySelectorAll('.add_assignment__item')

export function openSideBlock() {
	closeAllModals()
	addAssOptions()
	addAssStatControl()
	addAssignmentWrapper.classList.remove('side_block-hide')
}

export function closeAssSideBlock() {
	addAssignmentWrapper.classList.add('side_block-hide')
	addAssignmentWrapper.querySelectorAll('.side_block__item').forEach((elem, index) => {
		if (index === 1 || index === 0) {
			elem.children[1].innerHTML = ''
		} else {
			elem.children[2].value = 1
			elem.children[1].textContent = '1'
			elem.children[2].dispatchEvent(new Event('input'))
		}
	})
}

export function addCancelBtnListener() {
	addAssignmentWrapper.querySelector('.add_assignment__btn_cancel').addEventListener('click', closeAssSideBlock)
}

export function addAssignment(state) {
	const newAssId = `as_${++state.data[state.currentDate].meta.assignmentCounter}`

	state.data[state.currentDate].assignments[newAssId] = {
		id: newAssId,
		empId: sideLi[0].children[1].value,
		projId: sideLi[1].children[1].value,
		capacity: sideLi[2].children[2].value,
		fit: sideLi[3].children[2].value,
	}
}