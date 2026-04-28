import { renderProjects } from './render-projects.js'
import { renderEmployees } from './render-employees.js'
import { renderAassignments } from './render-assignments.js'

const pageChooser = {
	projects: renderProjects,
	employees: renderEmployees,
	assignments: renderAassignments,
}

export function renderPageListener() {
	const navItems = document.querySelectorAll('.nav__item')
	navItems.forEach(item => {
		item.addEventListener('click', () => {
			if (item.classList.contains('active')) return
			pageChooser[item.dataset.page]()
			navItems.forEach(item => {item.classList.remove('active')})
			item.classList.add('active')
		})
	})
}

export function initRenderPage() {
	pageChooser.projects()
}

export function updatePage() {
	const activeTab = document.querySelector('.nav__item.active')
		pageChooser[activeTab.dataset.page]()
}