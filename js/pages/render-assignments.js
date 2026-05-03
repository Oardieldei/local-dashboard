import { getAssignmentsByCurrentDate } from './data-assignments.js'
import { initLanguage } from "../translate.js"
import { addCancelBtnListener, openSideBlock, changeAssignment } from "./actions-assignments.js"
import { getState } from '../state.js'
import { getEffectiveCapacity, getEmployeeRevenue } from './calculation.js'
import { deleteAssignment, showChangeAssignmentModal } from './actions-assignments.js'

export function renderAassignments() {
	const assignments = getAssignmentsByCurrentDate()
	const state = getState()

	const container = document.querySelector('.pages__wrapper')
	container.innerHTML = ''

	container.append(createAssignmentsHeader())
	addCancelBtnListener()

	const wrapper = createAssignmentsWrapper()
	container.append(wrapper)

	wrapper.append(createAssignmentsTableHeader())

	Object.values(assignments).forEach(as => {
		wrapper.append(createAssignmentRow(as, state))
	})

	container.append(createAssignmentsSummary(assignments))

	initLanguage()
}

function createAssignmentsHeader() {
	const newElem = document.createElement('div')
	newElem.classList.add('main__topbox')

	const textContent = document.createElement('div')
	textContent.classList.add('main__topbox__texts')
	newElem.append(textContent)

	const textHeader = document.createElement('h2')
	textHeader.classList.add('main__topbox__h2')
	textHeader.dataset.i18n = 'assignments'
	textContent.append(textHeader)

	const textDescription = document.createElement('hp')
	textDescription.classList.add('main__topbox__p')
	textDescription.dataset.i18n = 'assignmentsDesc'
	textContent.append(textDescription)

	const addBtn = document.createElement('button')
	addBtn.classList.add('main__topbox__btn')
	addBtn.dataset.i18n = 'assignmentsBtn'
	addBtn.addEventListener('click', openSideBlock)
	newElem.append(addBtn)

	return newElem
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

function createAssignmentsSummary(assignments) {
	const wrapper = document.createElement('div')
	wrapper.classList.add('assignsummary__wrapper')

	const list = Object.values(assignments)

	const totalAssignments = list.length
	const uniqueEmployees = new Set(list.map(a => a.empId)).size
	const uniqueProjects = new Set(list.map(a => a.projId)).size

	wrapper.append(
		createSummaryBlock('assignmentsTotal', totalAssignments, getAssignmentsIcon),
		createSummaryBlock('employeesAssigned', uniqueEmployees, getEmployeesIcon),
		createSummaryBlock('projectsAssigned', uniqueProjects, getProjectsIcon)
	)

	return wrapper
}

function createSummaryBlock(i18nKey, value, iconFn) {
	const block = document.createElement('div')
	block.classList.add('assignsummary__block')
	block.classList.add('grey-block')
	block.classList.add('grey-block__hover-effect')

	const header = document.createElement('div')
	header.classList.add('assignsummary__header')
	block.append(header)

	const iconWrapper = document.createElement('div')
	iconWrapper.classList.add('assignsummary__icon')
	iconWrapper.innerHTML = iconFn()
	header.append(iconWrapper)

	const text = document.createElement('div')
	text.classList.add('assignsummary__title')
	text.dataset.i18n = i18nKey
	header.append(text)

	const number = document.createElement('div')
	number.classList.add('assignsummary__value')
	number.textContent = value

	block.append(number)

	return block
}

function getAssignmentsIcon() {
	return `
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path
									d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z">
								</path>
								<path d="M8 10v4"></path>
								<path d="M12 10v2"></path>
								<path d="M16 10v6"></path>
							</svg>
	`
}

function getEmployeesIcon() {
	return `
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
								<circle cx="9" cy="7" r="4"></circle>
								<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
								<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
							</svg>
	`
}

function getProjectsIcon() {
	return `
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
								sstroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
								<rect width="20" height="14" x="2" y="6" rx="2"></rect>
							</svg>
	`
}