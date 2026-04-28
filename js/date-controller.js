import { getState, updateState } from './state.js'
import { updatePage } from './pages/render.js'

export function changeDate(year, month) {
	const dateKey = `${year}-${month.padStart(2, '0')}`

	updateState(state => {
		if (!state.data[dateKey]) {
			state.data[dateKey] = {
				employees: {},
				projects: {},
				assignments: {},
				meta: {
					employeeCounter: 0,
					projectCounter: 0,
					assignmentCounter: 0
				}
			}
		}

		state.currentDate = dateKey
	})
}

export function addDateBtnListener() {
	const elem = document.querySelector('.main__header__date_chooser')
	const btn = elem.querySelector('.main__header__date_chooser__btn')
	btn.addEventListener('click', () => {
		const month = elem.querySelector('.main__header__date_chooser__month').value
		const year = elem.querySelector('.main__header__date_chooser__year').value

		changeDate(year, month)

		const select = document.querySelector('.main__header__date_chooser__month')
		document.querySelector('.curr_date__month').textContent = select.options[select.selectedIndex].text

		const select2 = document.querySelector('.main__header__date_chooser__year')
		document.querySelector('.curr_date__year').textContent = select2.options[select2.selectedIndex].text

		updatePage()
	})
}