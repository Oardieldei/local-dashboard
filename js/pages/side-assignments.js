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

function checkAssValues() {
	let isEveryGood = true
	// if (sideLi[3].children[1].value < 1) {
	// 	sideLi[3].classList.add('error-input')
	// 	sideLi[3].children[1].focus()
	// 	isEveryGood = false
	// }
	// if (sideLi[2].children[1].value < 1) {
	// 	sideLi[2].classList.add('error-input')
	// 	sideLi[2].children[1].focus()
	// 	isEveryGood = false
	// }
	// if (sideLi[1].children[1].value.length < 2) {
	// 	sideLi[1].classList.add('error-input')
	// 	sideLi[1].children[1].focus()
	// 	isEveryGood = false
	// }
	// if (sideLi[0].children[1].value.length < 3) {
	// 	sideLi[0].classList.add('error-input')
	// 	sideLi[0].children[1].focus()
	// 	isEveryGood = false
	// }

	return isEveryGood
}

function changeProjValues() {
	// sideLi[3].children[1].addEventListener('input', (e) => {
	// 	if (e.target.value > 0) sideLi[3].classList.remove('error-input')
	// })

	// sideLi[2].children[1].addEventListener('input', (e) => {
	// 	if (e.target.value > 0) sideLi[2].classList.remove('error-input')
	// })

	// sideLi[1].children[1].addEventListener('input', (e) => {
	// 	if (e.target.value.length > 1) sideLi[1].classList.remove('error-input')
	// })

	// sideLi[0].children[1].addEventListener('input', (e) => {
	// 	if (e.target.value.length > 2) sideLi[0].classList.remove('error-input')
	// })
}

function focusOutProjValues() {
	// sideLi[3].children[1].addEventListener('blur', () => {
	// 	if (sideLi[3].children[1].value < 1) {
	// 		sideLi[3].classList.add('error-input')
	// 	}
	// })

	// sideLi[2].children[1].addEventListener('blur', () => {
	// 	if (sideLi[2].children[1].value < 1) {
	// 		sideLi[2].classList.add('error-input')
	// 	}
	// })

	// sideLi[1].children[1].addEventListener('blur', () => {
	// 	if (sideLi[1].children[1].value.length < 2) {
	// 		sideLi[1].classList.add('error-input')
	// 	}
	// })

	// sideLi[0].children[1].addEventListener('blur', () => {
	// 	if (sideLi[0].children[1].value.length < 3) {
	// 		sideLi[0].classList.add('error-input')
	// 	}
	// })
}

export function controlAssSideBlock() {
	submitBtn.addEventListener('click', () => {
		if (checkAssValues()) {
			updateState(addAssignment)
			closeAssSideBlock()
			updatePage()
		}
	})
	
	addAssRangeTextChanger()

	// changeProjValues()
	// focusOutProjValues()
}