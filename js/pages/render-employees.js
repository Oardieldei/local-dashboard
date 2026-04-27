import { getEmployeesByCurrentDate } from './data-employees.js'
import { initLanguage } from "../translate.js"

export function renderEmployees() {
	const employees = getEmployeesByCurrentDate()

	const container = document.querySelector('.pages__wrapper')
	container.innerHTML = ''

	container.append(createEmployeesHeader())

	/* Object.values(employees).forEach(emp => {
		const div = document.createElement('div')
		div.textContent = emp.name
		container.appendChild(div)
	}) */

	initLanguage()
}

function createEmployeesHeader() {
	const newElem = document.createElement('div')
	newElem.classList.add('main__topbox')

	const textContent = document.createElement('div')
	textContent.classList.add('main__topbox__texts')
	newElem.append(textContent)

	const textHeader = document.createElement('h2')
	textHeader.classList.add('main__topbox__h2')
	textHeader.dataset.i18n = 'employees'
	textContent.append(textHeader)

	const textDescription = document.createElement('hp')
	textDescription.classList.add('main__topbox__p')
	textDescription.dataset.i18n = 'employeesDesc'
	textContent.append(textDescription)

	const addBtn = document.createElement('button')
	addBtn.classList.add('main__topbox__btn')
	addBtn.dataset.i18n = 'employeesBtn'
	newElem.append(addBtn)

	return newElem
}