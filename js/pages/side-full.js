import { controlProjSideBlock } from './side-projects.js'
import { controlEmpSideBlock } from './side-employees.js'
import { closeProjSideBlock } from './actions-projects.js'
import { closeEmpSideBlock } from './actions-employees.js'

export function initSideFull() {
	controlProjSideBlock()
	controlEmpSideBlock()
}

const allModals = document.querySelectorAll('.side_block')

export function closeAllModals() {
	allModals.forEach(elem => {
		elem.classList.add('side_block-hide')
	})
	closeProjSideBlock()
	closeEmpSideBlock()
}