import { controlProjSideBlock } from './side-projects.js'
import { controlEmpSideBlock } from './side-employees.js'
import { controlAssSideBlock } from './side-assignments.js'
import { closeProjSideBlock } from './actions-projects.js'
import { closeEmpSideBlock } from './actions-employees.js'
import { closeAssSideBlock } from './actions-assignments.js'

export function initSideFull() {
	controlProjSideBlock()
	controlEmpSideBlock()	
	controlAssSideBlock()
}

const allModals = document.querySelectorAll('.side_block')

export function closeAllModals() {
	allModals.forEach(elem => {
		elem.classList.add('side_block-hide')
	})
	closeProjSideBlock()
	closeEmpSideBlock()
	closeAssSideBlock()
}