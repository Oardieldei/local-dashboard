import { addEmployee, closeEmpSideBlock } from './actions-employees.js'
import { updatePage } from './render.js'
import { updateState } from '../state.js'

const sideEmpWrapper = document.querySelector('.add_employee')
const sideLi = sideEmpWrapper.querySelectorAll('.add_employee__item')
const submitBtn = sideEmpWrapper.querySelector('.add_employee__btn_submit')

function isAdult(dateValue) {
	const birthDate = new Date(dateValue)
	const today = new Date()

	const eighteenYearsAgo = new Date()
	eighteenYearsAgo.setFullYear(today.getFullYear() - 18)

	return birthDate <= eighteenYearsAgo
}

function isCorrectEmail(mailValue) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(mailValue)
}

function checkEmpValues() {
	let isEveryGood = true
	if (sideLi[5].children[1].value < 1) {
		sideLi[5].classList.add('error-input')
		sideLi[5].children[1].focus()
		isEveryGood = false
	}
	if (sideLi[4].children[1].value === 'rickastley') {
		sideLi[4].classList.add('error-input')
		window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
		sideLi[4].children[1].focus()
		isEveryGood = false
	}
	if (!isCorrectEmail(sideLi[3].children[1].value)) {
		sideLi[3].classList.add('error-input')
		sideLi[3].children[1].focus()
		isEveryGood = false
	}
	if (!isAdult(sideLi[2].children[1].value)) {
		sideLi[2].classList.add('error-input')
		sideLi[2].children[1].focus()
		isEveryGood = false
	}
	if (sideLi[1].children[1].value.length < 2) {
		sideLi[1].classList.add('error-input')
		sideLi[1].children[1].focus()
		isEveryGood = false
	}
	if (sideLi[0].children[1].value.length < 2) {
		sideLi[0].classList.add('error-input')
		sideLi[0].children[1].focus()
		isEveryGood = false
	}

	return isEveryGood
}

function changeEmpValues() {
	sideLi[5].children[1].addEventListener('input', (e) => {
		if (e.target.value > 0) sideLi[5].classList.remove('error-input')
	})

	sideLi[4].children[1].addEventListener('change', (e) => {
		sideLi[4].classList.remove('error-input')
	})

	sideLi[3].children[1].addEventListener('input', (e) => {
		if (isCorrectEmail(e.target.value)) sideLi[3].classList.remove('error-input')
	})

	sideLi[2].children[1].addEventListener('input', (e) => {
		if (isAdult(e.target.value)) sideLi[2].classList.remove('error-input')
	})

	sideLi[1].children[1].addEventListener('input', (e) => {
		if (e.target.value.length > 1) sideLi[1].classList.remove('error-input')
	})

	sideLi[0].children[1].addEventListener('input', (e) => {
		if (e.target.value.length > 1) sideLi[0].classList.remove('error-input')
	})
}

function focusOutEmpValues() {
	sideLi[5].children[1].addEventListener('blur', () => {
		if (sideLi[5].children[1].value < 1) {
			sideLi[5].classList.add('error-input')
		}
	})

	sideLi[3].children[1].addEventListener('blur', () => {
		if (!isCorrectEmail(sideLi[3].children[1].value)) {
			sideLi[3].classList.add('error-input')
		}
	})

	sideLi[2].children[1].addEventListener('blur', () => {
		if (!isAdult(sideLi[2].children[1].value)) {
			sideLi[2].classList.add('error-input')
		}
	})

	sideLi[1].children[1].addEventListener('blur', () => {
		if (sideLi[1].children[1].value.length < 2) {
			sideLi[1].classList.add('error-input')
		}
	})

	sideLi[0].children[1].addEventListener('blur', () => {
		if (sideLi[0].children[1].value.length < 2) {
			sideLi[0].classList.add('error-input')
		}
	})
}

export function controlEmpSideBlock() {
	submitBtn.addEventListener('click', () => {
		if (checkEmpValues()) {
			updateState(addEmployee)
			closeEmpSideBlock()
			updatePage()
		}
	})

	changeEmpValues()
	focusOutEmpValues()
}