import { closeAllModals } from './side-full.js'
import { renderProjects } from './render-projects.js'
import { updateState, getState } from '../state.js'
import { isSure } from './actions.js'

const addProjectWrapper = document.querySelector('.add_project')
const sideLi = addProjectWrapper.querySelectorAll('.add_project__item')

export function openSideBlock() {
	closeAllModals()
	addProjectWrapper.classList.remove('side_block-hide')
}

export function closeProjSideBlock() {
	addProjectWrapper.classList.add('side_block-hide')
	addProjectWrapper.querySelectorAll('.side_block__item').forEach(elem => {
		elem.classList.remove('error-input')
		elem.children[1].value = ''
	})
}

export function addCancelBtnListener() {
	addProjectWrapper.querySelector('.add_project__btn_cancel').addEventListener('click', closeProjSideBlock)
}

export function addProject(state) {
	const newProjId = `proj_${++state.data[state.currentDate].meta.projectCounter}`

	state.data[state.currentDate].projects[newProjId] = {
		id: newProjId,
		name: sideLi[0].children[1].value,
		customer: sideLi[1].children[1].value,
		budget: sideLi[2].children[1].value,
		capacity: sideLi[3].children[1].value,
	}
}

export function deleteProject(project_id) {
	if (isSure()) {
		updateState(state => {
			delete state.data[state.currentDate].projects[project_id]
		})

		const state = getState()
		const assignments = state.data[state.currentDate].assignments

		const assKeys = Object.keys(assignments)
		const filteredKeys = assKeys.filter(a => assignments[a].projId === project_id)
		filteredKeys.forEach(key => {
			updateState(state => {
				delete state.data[state.currentDate].assignments[key]
			})
		})

		renderProjects()
	}
}