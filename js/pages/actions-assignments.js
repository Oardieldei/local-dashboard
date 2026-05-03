import { closeAllModals } from './side-full.js'
import { addAssOptions, addAssStatControl } from './side-assignments.js'
import { updateState, getState } from '../state.js'
import { renderAassignments } from './render-assignments.js'
import { isSure } from './actions.js'
import { updatePage } from './render.js'
import { getEmployeeCapacity, getProjectCapacity } from './calculation.js'

const changeAssingmentModalWrapper = document.querySelector('.change_assignment')
const modalLi = changeAssingmentModalWrapper.querySelectorAll('.change_assignment__item')
const statWrapper = changeAssingmentModalWrapper.querySelector('.change_assignment__stat')
const changeAssModalSubmitBtn = changeAssingmentModalWrapper.querySelector('.change_assignment__btn_submit')
const changeAssModalCancelBtn = changeAssingmentModalWrapper.querySelector('.change_assignment__btn_cancel')

export function deleteAssignment(id) {
	if (isSure()) {
		updateState(state => {
			delete state.data[state.currentDate].assignments[id]
		})

		renderAassignments()
	}
}

export function changeAssignment() {
	const id = changeAssingmentModalWrapper.dataset.asid
	updateState(state => {
		state.data[state.currentDate].assignments[id].capacity = modalLi[2].children[2].value
		state.data[state.currentDate].assignments[id].fit = modalLi[3].children[2].value
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

function changeAssingmentModalValues(asId) {
	const state = getState()

	changeAssingmentModalWrapper.dataset.asid = asId

	const assById = state.data[state.currentDate].assignments[asId]

	modalLi[0].children[1].textContent = `${state.data[state.currentDate].employees[assById.empId].fname} ${state.data[state.currentDate].employees[assById.empId].lname}`
	modalLi[1].children[1].textContent = `${state.data[state.currentDate].projects[assById.projId].name}`
	modalLi[2].children[1].textContent = assById.capacity
	modalLi[2].children[2].value = assById.capacity
	modalLi[3].children[1].textContent = assById.fit
	modalLi[3].children[2].value = assById.fit

	addChangeAssStatControlModal()
}

export function showChangeAssignmentModal(asId) {
	changeAssingmentModalValues(asId)

	changeAssingmentModalWrapper.classList.add('change_assignment__shown')
	document.body.style.overflow = 'hidden'
}

function hideChangeAssignmentModal() {
	changeAssingmentModalWrapper.classList.remove('change_assignment__shown')
	document.body.style.overflow = ''
}

export function addChangeAssStatControlModal() {
	const state = getState()

	const asId = changeAssingmentModalWrapper.dataset.asid
	const empId = state.data[state.currentDate].assignments[asId].empId

	const newCapaValue = (+getEmployeeCapacity(empId) + +modalLi[2].children[2].value - state.data[state.currentDate].assignments[asId].capacity).toFixed(2)
	statWrapper.children[0].children[1].textContent = `${newCapaValue}/1.5`
	if (newCapaValue > 1.5) {
		statWrapper.classList.add('red-border')
		statWrapper.children[0].children[1].classList.add('red-text-side')
	} else {
		statWrapper.classList.remove('red-border')
		statWrapper.children[0].children[1].classList.remove('red-text-side')
	}

	const projId = state.data[state.currentDate].assignments[asId].projId
	const projCapacity = state.data[state.currentDate].projects[projId] ? state.data[state.currentDate].projects[projId].capacity : 'idk'
	const currProjCapacity = getProjectCapacity(projId)
	statWrapper.children[1].children[1].textContent = `${currProjCapacity}/${projCapacity}`

	const newValue = (modalLi[2].children[2].value * modalLi[3].children[2].value).toFixed(2)
	statWrapper.children[2].children[1].textContent = newValue

	const resValue = (+getProjectCapacity(projId) + +newValue - state.data[state.currentDate].assignments[asId].capacity * state.data[state.currentDate].assignments[asId].fit).toFixed(2)
	statWrapper.children[3].children[1].textContent = `${resValue}/${projCapacity}`
	if (resValue > projCapacity) {
		statWrapper.classList.add('orange-border')
		statWrapper.children[3].children[1].classList.add('orange-text-side')
	} else {
		statWrapper.classList.remove('orange-border')
		statWrapper.children[3].children[1].classList.remove('orange-text-side')
	}
}

function addChangeValuesListenersModal() {
	modalLi[2].children[2].addEventListener('input', () => {
		addChangeAssStatControlModal()
		modalLi[2].children[1].textContent = modalLi[2].children[2].value
	})
	modalLi[3].children[2].addEventListener('input', () => {
		addChangeAssStatControlModal()
		modalLi[3].children[1].textContent = modalLi[3].children[2].value
	})
}

export function controlChangeAssModal() {
	changeAssModalSubmitBtn.addEventListener('click', () => {
		if (!statWrapper.classList.contains('red-border')) {
			changeAssignment()
			hideChangeAssignmentModal()
			updatePage()
		}
	})

	changeAssModalCancelBtn.addEventListener('click', () => {
		hideChangeAssignmentModal()
	})

	addChangeValuesListenersModal()
}

export function initChangeAssModalFull() {
	controlChangeAssModal()
}