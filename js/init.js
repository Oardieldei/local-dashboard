import { getState } from './state.js'
import { initLanguage, changeLanguage } from "./translate.js"
import { changeSidebarState } from "./sidebar-hide.js"
import { addDateBtnListener } from './date-controller.js'
import { renderPageListener, initRenderPage } from './pages/render.js'

export function initApp() {
	const state = getState()
	initDateUI(state)

	addDateBtnListener()
	initSidebarClosing()

	initRenderPage()
	renderPageListener()
	initTranslate()
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

function initTranslate() {
	initLanguage()
	document.querySelector('.lang-changer__wrapper').addEventListener('click', changeLanguage)
}

function initSidebarClosing() {
	const sidebarCloseBtn = document.querySelector('.main__header__sidebar_arrow')
	const sidebarItem = document.querySelector('.sidebar')
	changeSidebarState(sidebarCloseBtn, sidebarItem)
}