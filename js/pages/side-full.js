import { controlProjSideBlock } from './side-projects.js'

export function initSideFull() {
	controlProjSideBlock()
}

const allModals = document.querySelectorAll('.side_block')

export function closeAllModals() {
	allModals.forEach(elem => {
		elem.classList.add('side_block-hide')
	})
}