import { getAssignmentsByCurrentDate } from './data-assignments.js'
import { initLanguage } from "../translate.js"

export function renderAassignments() {
	const assignments = getAssignmentsByCurrentDate()

	const container = document.querySelector('.pages__wrapper')
	container.innerHTML = ''

	container.append(createAssignmentsHeader())

	/* Object.values(assignments).forEach(as => {
		const div = document.createElement('div')
		div.textContent = as.name
		container.appendChild(div)
	}) */

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
	newElem.append(addBtn)

	return newElem
}