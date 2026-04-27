import { getProjectsByCurrentDate } from './data-projects.js'
import { initLanguage } from "../translate.js"
import { addCancelBtnListener, openSideBlock } from "./actions-projects.js"

export function renderProjects() {
	const projects = getProjectsByCurrentDate()

	const container = document.querySelector('.pages__wrapper')
	container.innerHTML = ''

	container.append(createProjectsHeader())
	addCancelBtnListener()

	/* Object.values(projects).forEach(proj => {
		const div = document.createElement('div')
		div.textContent = proj.name
		container.appendChild(div)
	}) */

	initLanguage()
}

function createProjectsHeader() {
	const newElem = document.createElement('div')
	newElem.classList.add('main__topbox')

	const textContent = document.createElement('div')
	textContent.classList.add('main__topbox__texts')
	newElem.append(textContent)

	const textHeader = document.createElement('h2')
	textHeader.classList.add('main__topbox__h2')
	textHeader.dataset.i18n = 'projects'
	textContent.append(textHeader)

	const textDescription = document.createElement('hp')
	textDescription.classList.add('main__topbox__p')
	textDescription.dataset.i18n = 'projectsDesc'
	textContent.append(textDescription)

	const addBtn = document.createElement('button')
	addBtn.classList.add('main__topbox__btn')
	addBtn.classList.add('add_project__open_btn')
	addBtn.dataset.i18n = 'projectsBtn'
	addBtn.addEventListener('click', openSideBlock)
	newElem.append(addBtn)

	return newElem
}