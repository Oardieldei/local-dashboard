import { addProject, closeSideBlock } from './actions-projects.js'
import { updatePage } from './render.js'
import { updateState } from '../state.js'

const sideProjWrapper = document.querySelector('.add_project')
const sideLi = sideProjWrapper.querySelectorAll('.add_project__item')
const submitBtn = sideProjWrapper.querySelector('.add_project__btn_submit')

function checkProjValues() {
	let isEveryGood = true
	if (sideLi[3].children[1].value < 1) {
		sideLi[3].classList.add('error-input')
		sideLi[3].children[1].focus()
		isEveryGood = false
	}
	if (sideLi[2].children[1].value < 1) {
		sideLi[2].classList.add('error-input')
		sideLi[2].children[1].focus()
		isEveryGood = false
	}
	if (sideLi[1].children[1].value.length < 2) {
		sideLi[1].classList.add('error-input')
		sideLi[1].children[1].focus()
		isEveryGood = false
	}
	if (sideLi[0].children[1].value.length < 3) {
		sideLi[0].classList.add('error-input')
		sideLi[0].children[1].focus()
		isEveryGood = false
	}

	return isEveryGood
}

function changeProjValues() {
	sideLi[3].children[1].addEventListener('input', (e) => {
		if (e.target.value > 0) sideLi[3].classList.remove('error-input')
	})

	sideLi[2].children[1].addEventListener('input', (e) => {
		if (e.target.value > 0) sideLi[2].classList.remove('error-input')
	})

	sideLi[1].children[1].addEventListener('input', (e) => {
		if (e.target.value.length > 1) sideLi[1].classList.remove('error-input')
	})

	sideLi[0].children[1].addEventListener('input', (e) => {
		if (e.target.value.length > 2) sideLi[0].classList.remove('error-input')
	})
}

function focusOutProjValues() {
	sideLi[3].children[1].addEventListener('blur', () => {
		if (sideLi[3].children[1].value < 1) {
			sideLi[3].classList.add('error-input')
		}
	})

	sideLi[2].children[1].addEventListener('blur', () => {
		if (sideLi[2].children[1].value < 1) {
			sideLi[2].classList.add('error-input')
		}
	})

	sideLi[1].children[1].addEventListener('blur', () => {
		if (sideLi[1].children[1].value.length < 2) {
			sideLi[1].classList.add('error-input')
		}
	})

	sideLi[0].children[1].addEventListener('blur', () => {
		if (sideLi[0].children[1].value.length < 3) {
			sideLi[0].classList.add('error-input')
		}
	})
}

export function controlProjSideBlock() {
	submitBtn.addEventListener('click', () => {
		if (checkProjValues()) {
			updateState(addProject)
			closeSideBlock()
			updatePage()
		}
	})

	changeProjValues()
	focusOutProjValues()
}