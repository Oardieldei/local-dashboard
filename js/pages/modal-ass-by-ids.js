import { initLanguage } from "../translate.js"
import { getState } from '../state.js'
import { getEffectiveCapacity, getEmployeeRevenue } from './calculation.js'
import { deleteAssignment, showChangeAssignmentModal, openSideBlock, addCancelBtnListener } from './actions-assignments.js'
import { closeAllModals } from './side-full.js'
import { addAssOptionsFiltered } from './side-assignments.js'

const container = document.querySelector('.assignment_byid')
const assByIdWrapper = container.children[0]

export function changeModalBgClosing() {
	const wrapper = document.querySelector('.assignment_byid')
	wrapper.addEventListener('click', (e) => {
		if (e.target === wrapper) hideModalAssById()
	})
}

export function renderAssignmentsById(key, value) {
	const assignments = getAssignmentsById(key, value)
	const state = getState()
	assByIdWrapper.innerHTML = ''
	container.dataset.usedType = key
	container.dataset.usedId = value

	if (Object.keys(assignments).length < 1) {

		const errorMessage = document.createElement('p')
		errorMessage.classList.add('no-assignment-message')
		errorMessage.dataset.i18n = 'noAssignmentMessage'
		assByIdWrapper.append(errorMessage)

	} else {

		const wrapper = createAssignmentsWrapper()
		assByIdWrapper.append(wrapper)

		wrapper.append(createAssignmentsTableHeader())

		Object.values(assignments).forEach(as => {
			wrapper.append(createAssignmentRow(as, state))
		})

	}
	assByIdWrapper.append(createControlBtnsModal())

	initLanguage()

	showModalAssById()
}

function showModalAssById() {
	closeAllModals()
	container.classList.add('assignment_byid__shown')
	document.body.style.overflow = 'hidden'
}

export function hideModalAssById() {
	container.classList.remove('assignment_byid__shown')
	document.body.style.overflow = ''
}

export function getAssignmentsById(key, value) {
	const state = getState()
	const ass = state.data[state.currentDate].assignments
	const filterAssignments = Object.values(ass).filter(item => item[key] === value)
	return filterAssignments
}

function createAssignmentsWrapper() {
	const newWrapper = document.createElement('div')
	newWrapper.classList.add('assignpage__wrapper')
	return newWrapper
}

function createAssignmentsTableHeader() {
	const row = document.createElement('div')
	row.classList.add('assignpage__row', 'assignpage__row--header')

	const headers = [
		'addAssProjLabel',
		'addAssEmpLabel',
		'capacity',
		'fit',
		'effective',
		'revenue',
		'cost',
		'profit',
		null
	]

	headers.forEach(key => {
		const cell = document.createElement('div')
		cell.classList.add('assignpage__cell', 'assignpage__cell--header')

		if (key) {
			cell.dataset.i18n = key
		} else {
			cell.textContent = ''
		}

		row.append(cell)
	})

	return row
}

function createAssignmentRow(as, state) {
	const row = document.createElement('div')
	row.classList.add('assignpage__row', 'grey-block', 'grey-block__hover-effect')

	const project = state.data[state.currentDate].projects[as.projId]
	const employee = state.data[state.currentDate].employees[as.empId]

	const capacity = Number(as.capacity)
	const fit = Number(as.fit)

	const effective = getEffectiveCapacity(capacity, fit)
	const revenue = getEmployeeRevenue(as)
	const cost = employee.salary * capacity
	const profit = revenue - cost

	const values = [
		project.name,
		employee.fname + ' ' + employee.lname,
		capacity,
		fit,
		effective,
		revenue,
		cost,
		profit
	]

	values.forEach((val, index) => {
		const cell = document.createElement('div')
		cell.classList.add('assignpage__cell')

		if (index >= 5 && index <= 7) {
			setMoneyValue(cell, val)

			if (index === 7) {
				setProfitColor(cell, val)
			}
		} else {
			cell.textContent = val
		}

		row.append(cell)
	})

	row.append(createActionsCell(as.id))

	return row
}

function setMoneyValue(cell, value) {
	const num = Number(value)
	cell.textContent = `$${num.toFixed(2)}`
}

function setProfitColor(cell, value) {
	const num = Number(value)

	if (num > 0) {
		cell.classList.add('green-text')
	} else if (num < 0) {
		cell.classList.add('red-text')
	}
}

function createActionsCell(assId) {
	const cell = document.createElement('div')
	cell.classList.add('assignpage__cell', 'assignpage__cell--actions')

	const editBtn = document.createElement('button')
	editBtn.classList.add('assign-btn', 'assign-btn--edit')
	editBtn.innerHTML = getEditIcon()

	editBtn.addEventListener('click', () => {
		showChangeAssignmentModal(assId)
	})

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('assign-btn', 'assign-btn--delete')
	deleteBtn.innerHTML = getDeleteIcon()

	deleteBtn.addEventListener('click', () => {
		deleteAssignment(assId)
	})

	cell.append(editBtn, deleteBtn)

	return cell
}

function getEditIcon() {
	return `
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
		<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25Z" fill="white"/>
		<path d="M20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white"/>
	</svg>
	`
}

function getDeleteIcon() {
	return `
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
		<path d="M6 7H18" stroke-width="2"/>
		<path d="M9 7V5H15V7" stroke-width="2"/>
		<path d="M10 11V17" stroke-width="2"/>
		<path d="M14 11V17" stroke-width="2"/>
		<path d="M5 7L6 21H18L19 7" stroke-width="2"/>
	</svg>
	`
}

function createControlBtnsModal() {
	const btnsWrapper = document.createElement('div')
	btnsWrapper.classList.add('assignment_byid__btns')

	const addBtn = document.createElement('div')
	addBtn.classList.add('assignment_byid__btn_add')
	addBtn.dataset.i18n = 'add'
	btnsWrapper.append(addBtn)
	addBtn.addEventListener('click', () => {
		openSideBlock()
		addAssOptionsFiltered(container.dataset.usedType, container.dataset.usedId)
		addCancelBtnListener()
	})

	const cancelBtn = document.createElement('div')
	cancelBtn.classList.add('assignment_byid__btn_cancel')
	cancelBtn.dataset.i18n = 'cancel'
	btnsWrapper.append(cancelBtn)	
	cancelBtn.addEventListener('click', hideModalAssById)

	return btnsWrapper
}