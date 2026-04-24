import { getState } from './state.js'

export function initApp() {
	const state = getState()

	initDateUI(state)
}

function initDateUI(state) {
	const currDate = state.currentDate.split('-')
	const month = +currDate[1]
	const year = +currDate[0]

	const select = document.querySelector('.main__header__date_chooser__month')
	select.value = month
	document.querySelector('.curr_date__month').textContent = select.options[select.selectedIndex].text

	const select2 = document.querySelector('.main__header__date_chooser__year')
	select2.value = year
	document.querySelector('.curr_date__year').textContent = select2.options[select2.selectedIndex].text
}