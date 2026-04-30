import { closeAllModals } from './side-full.js'

const addEmployeeWrapper = document.querySelector('.add_employee')
const sideLi = addEmployeeWrapper.querySelectorAll('.add_employee__item')

export function openSideBlock() {
	closeAllModals()
	addEmployeeWrapper.classList.remove('side_block-hide')
}

export function closeSideBlock() {
	addEmployeeWrapper.classList.add('side_block-hide')
	addEmployeeWrapper.querySelectorAll('.side_block__item').forEach(elem => {
		elem.classList.remove('error-input')
		elem.children[1].value = ''
	})
}

export function addCancelBtnListener() {
	addEmployeeWrapper.querySelector('.add_employee__btn_cancel').addEventListener('click', closeSideBlock)
}



export function addEmployee(state) {
	/*
	const newProjId = `proj_${++state.data[state.currentDate].meta.EmployeeCounter}`

	state.data[state.currentDate].Employees[newProjId] = {
		id: newProjId,
		name: sideLi[0].children[1].value,
		customer: sideLi[1].children[1].value,
		budget: sideLi[2].children[1].value,
		capacity: sideLi[3].children[1].value,
	}
		*/
}