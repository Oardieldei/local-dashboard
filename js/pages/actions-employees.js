import { closeAllModals } from './side-full.js'

const addEmployeeWrapper = document.querySelector('.add_employee')
const sideLi = addEmployeeWrapper.querySelectorAll('.add_employee__item')

export function openSideBlock() {
	closeAllModals()
	addEmployeeWrapper.classList.remove('side_block-hide')
}

export function closeEmpSideBlock() {
	addEmployeeWrapper.classList.add('side_block-hide')
	addEmployeeWrapper.querySelectorAll('.side_block__item').forEach((elem, index) => {
		elem.classList.remove('error-input')
		elem.children[1].value = ''
		if (index === 4) elem.children[1].value = 'junior'
	})
}

export function addCancelBtnListener() {
	addEmployeeWrapper.querySelector('.add_employee__btn_cancel').addEventListener('click', closeEmpSideBlock)
}

function makeReadableDate(dateValue) {
	const dateObj = new Date(dateValue)
	return dateObj.toLocaleDateString('ru-RU')
}

export function addEmployee(state) {
	const newEmpId = `emp_${++state.data[state.currentDate].meta.employeeCounter}`

	state.data[state.currentDate].employees[newEmpId] = {
		id: newEmpId,
		fname: sideLi[0].children[1].value,
		lname: sideLi[1].children[1].value,
		dob: makeReadableDate(sideLi[2].children[1].value),
		email: sideLi[3].children[1].value,
		position: sideLi[4].children[1].value,
		salary: sideLi[5].children[1].value,
	}
}