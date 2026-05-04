import { addAssignment, closeAssSideBlock } from './actions-assignments.js'
import { updatePage } from './render.js'
import { getState, updateState } from '../state.js'
import { getEmployeeCapacity, getProjectCapacity } from './calculation.js'

const sideAssWrapper = document.querySelector('.add_assignment')
const sideLi = sideAssWrapper.querySelectorAll('.add_assignment__item')
const submitBtn = sideAssWrapper.querySelector('.add_assignment__btn_submit')
const statWrapper = sideAssWrapper.querySelector('.add_assignment__stat')

export function addAssOptions() {
	const state = getState()

	const selectItemEmp = sideLi[0].children[1]
	const empIDs = Object.keys(state.data[state.currentDate].employees)

	empIDs.forEach(id => {
		const option = document.createElement("option")
		option.value = id
		option.text = `${state.data[state.currentDate].employees[id].fname} ${state.data[state.currentDate].employees[id].lname}`

		selectItemEmp.append(option)
	})

	const selectItemProj = sideLi[1].children[1]
	const projIDs = Object.keys(state.data[state.currentDate].projects)

	projIDs.forEach(id => {
		const option = document.createElement("option")
		option.value = id
		option.text = `${state.data[state.currentDate].projects[id].name}`

		selectItemProj.append(option)
	})
}

function addAssRangeTextChanger() {
	function addTextChanger(rangeContainer) {
		rangeContainer.children[2].addEventListener('input', () => {
			rangeContainer.children[1].textContent = rangeContainer.children[2].value
		})
	}

	addTextChanger(sideLi[2])
	addTextChanger(sideLi[3])
}

function isAssSideGood() {
	return !statWrapper.classList.contains('red-border') && sideLi[0].children[1].value !== '' && sideLi[1].children[1].value !== ''
}

export function controlAssSideBlock() {
	submitBtn.addEventListener('click', () => {
		if (isAssSideGood()) {
			updateState(addAssignment)
			closeAssSideBlock()
			updatePage()
		}
	})

	addAssRangeTextChanger()
	addChangeValuesListeners()
}

export function addAssStatControl() {
	const state = getState()

	const empId = sideLi[0].children[1].value
	const newCapaValue = (+getEmployeeCapacity(empId) + +sideLi[2].children[2].value).toFixed(2)
	statWrapper.children[0].children[1].textContent = `${newCapaValue}/1.5`
	if (newCapaValue > 1.5) {
		statWrapper.classList.add('red-border')
		statWrapper.children[0].children[1].classList.add('red-text-side')
	} else {
		statWrapper.classList.remove('red-border')
		statWrapper.children[0].children[1].classList.remove('red-text-side')
	}

	const projId = sideLi[1].children[1].value
	const projCapacity = state.data[state.currentDate].projects[projId] ? state.data[state.currentDate].projects[projId].capacity : 'idk'
	statWrapper.children[1].children[1].textContent = `${getProjectCapacity(projId)}/${projCapacity}`

	const newValue = (sideLi[2].children[2].value * sideLi[3].children[2].value).toFixed(2)
	statWrapper.children[2].children[1].textContent = newValue

	const resValue = (+getProjectCapacity(projId) + +newValue).toFixed(2)
	statWrapper.children[3].children[1].textContent = `${resValue}/${projCapacity}`
	if (resValue > projCapacity) {
		statWrapper.classList.add('orange-border')
		statWrapper.children[3].children[1].classList.add('orange-text-side')
	} else {
		statWrapper.classList.remove('orange-border')
		statWrapper.children[3].children[1].classList.remove('orange-text-side')
	}
}

function addChangeValuesListeners() {
	sideLi[2].children[2].addEventListener('input', addAssStatControl)
	sideLi[3].children[2].addEventListener('input', addAssStatControl)
	sideLi[0].children[1].addEventListener('change', addAssStatControl)
	sideLi[1].children[1].addEventListener('change', addAssStatControl)
}