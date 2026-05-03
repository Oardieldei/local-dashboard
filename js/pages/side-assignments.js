import { addAssignment, closeAssSideBlock } from './actions-assignments.js'
import { updatePage } from './render.js'
import { getState, updateState } from '../state.js'

const sideAssWrapper = document.querySelector('.add_assignment')
const sideLi = sideAssWrapper.querySelectorAll('.add_assignment__item')
const submitBtn = sideAssWrapper.querySelector('.add_assignment__btn_submit')

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

export function controlAssSideBlock() {
	submitBtn.addEventListener('click', () => {
		updateState(addAssignment)
		closeAssSideBlock()
		updatePage()
	})

	addAssRangeTextChanger()
}