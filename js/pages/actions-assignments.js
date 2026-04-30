import { closeAllModals } from './side-full.js'

const addAssignmentWrapper = document.querySelector('.add_assignment')
const sideLi = addAssignmentWrapper.querySelectorAll('.add_assignment__item')

export function openSideBlock() {
	closeAllModals()
	addAssignmentWrapper.classList.remove('side_block-hide')
}

export function closeSideBlock() {
	addAssignmentWrapper.classList.add('side_block-hide')
	addAssignmentWrapper.querySelectorAll('.side_block__item').forEach(elem => {
		elem.classList.remove('error-input')
		elem.children[1].value = ''
	})
}

export function addCancelBtnListener() {
	addAssignmentWrapper.querySelector('.add_assignment__btn_cancel').addEventListener('click', closeSideBlock)
}

/*

export function addAssignment(state) {
	const newProjId = `proj_${++state.data[state.currentDate].meta.assignmentCounter}`

	state.data[state.currentDate].Assignments[newProjId] = {
		id: newProjId,
		name: sideLi[0].children[1].value,
		customer: sideLi[1].children[1].value,
		budget: sideLi[2].children[1].value,
		capacity: sideLi[3].children[1].value,
	}
}

*/