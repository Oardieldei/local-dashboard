import { getProjectsByCurrentDate } from './data-projects.js'
import { initLanguage } from "../translate.js"
import { addCancelBtnListener, openSideBlock } from "./actions-projects.js"
import { getProjectCapacity, getProjectProgress, getProjectProfit } from './calculation.js'
import { getEffectiveCapacity, getEmployeeRevenue } from './calculation.js'
import { getState } from '../state.js'

export function renderProjects() {
	const state = getState()
	const projects = getProjectsByCurrentDate()

	const container = document.querySelector('.pages__wrapper')
	container.innerHTML = ''

	container.append(createProjectsHeader())
	addCancelBtnListener()
	const newWrapper = createProjectsWrapper()
	container.append(newWrapper)

	Object.values(projects).forEach(proj => {
		newWrapper.append(createProjectItem(proj))
	})

	container.append(createProjectsSummary(state))

	initLanguage()
}

function createProjectsHeader() {
	const newElem = document.createElement('div')
	newElem.classList.add('main__topbox')

	const textContent = document.createElement('div')
	textContent.classList.add('main__topbox__texts')
	newElem.append(textContent)

	const textHeader = document.createElement('h2')
	textHeader.classList.add('main__topbox__h2')
	textHeader.dataset.i18n = 'projects'
	textContent.append(textHeader)

	const textDescription = document.createElement('hp')
	textDescription.classList.add('main__topbox__p')
	textDescription.dataset.i18n = 'projectsDesc'
	textContent.append(textDescription)

	const addBtn = document.createElement('button')
	addBtn.classList.add('main__topbox__btn')
	addBtn.classList.add('add_project__open_btn')
	addBtn.dataset.i18n = 'projectsBtn'
	addBtn.addEventListener('click', openSideBlock)
	newElem.append(addBtn)

	return newElem
}

function createProjectsWrapper() {
	const newWrapper = document.createElement('div')
	newWrapper.classList.add('projpage__wrapper')
	return newWrapper
}

function createProjectItem(proj) {
	const newProjectWrapper = document.createElement('div')
	newProjectWrapper.classList.add('projpage__project__wrapper')
	newProjectWrapper.classList.add('grey-block')
	newProjectWrapper.classList.add('grey-block__hover-effect')

	newProjectWrapper.append(createProjectHeader(proj))
	newProjectWrapper.append(createProjectMiddle(proj))
	newProjectWrapper.append(createProjectBottom(proj))

	return newProjectWrapper
}

function createProjectHeader(proj) {
	const newProjectHeader = document.createElement('div')
	newProjectHeader.classList.add('projpage__project__header')

	const newProjectTitleWrapper = document.createElement('div')
	newProjectTitleWrapper.classList.add('projpage__project__titles')
	newProjectHeader.append(newProjectTitleWrapper)

	const newProjectName = document.createElement('span')
	newProjectName.classList.add('projpage__project__titles_name')
	newProjectName.textContent = proj.name
	newProjectTitleWrapper.append(newProjectName)

	const newProjectCompany = document.createElement('span')
	newProjectCompany.classList.add('projpage__project__titles_company')
	newProjectCompany.textContent = proj.customer
	newProjectTitleWrapper.append(newProjectCompany)

	const newProjectEditBtns = document.createElement('div')
	newProjectEditBtns.classList.add('projpage__project__header_btns')
	newProjectHeader.append(newProjectEditBtns)

	const newProjectEditBtnView = document.createElement('div')
	newProjectEditBtnView.classList.add('projpage__project__header_view')
	newProjectEditBtnView.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye" data-fg-cyth46="1.37:58.35:/src/app/components/Projects.tsx:164:19:6197:17:e:Eye::::::EJvT" data-fgid-cyth46=":r7l:"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>'
	newProjectEditBtns.append(newProjectEditBtnView)

	const newProjectEditBtnDelete = document.createElement('div')
	newProjectEditBtnDelete.classList.add('projpage__project__header_delete')
	newProjectEditBtnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 lucide-trash-2" data-fg-cyth44="1.37:58.35:/src/app/components/Projects.tsx:161:19:6021:20:e:Trash2::::::c98" data-fgid-cyth44=":r7j:"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>'
	newProjectEditBtns.append(newProjectEditBtnDelete)

	return newProjectHeader
}

function createProjectMiddle(proj) {
	const newProjectInfo = document.createElement('div')
	newProjectInfo.classList.add('projpage__project__info')

	const newProjectInfoList = document.createElement('ul')
	newProjectInfoList.classList.add('projpage__project__info__list')
	newProjectInfo.append(newProjectInfoList)

	const newProjectInfoItemBudget = document.createElement('li')
	newProjectInfoItemBudget.classList.add('projpage__project__info__item')
	newProjectInfoList.append(newProjectInfoItemBudget)

	const newProjectInfoItemBudgetIcon = document.createElement('div')
	newProjectInfoItemBudgetIcon.classList.add('projpage__project__info__item_icon')
	newProjectInfoItemBudgetIcon.classList.add('projpage__project__info__item_icon__budget')
	newProjectInfoItemBudgetIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign text-rose-700 shrink-0" data-fg-cyth59="1.37:58.35:/src/app/components/Projects.tsx:178:17:6849:59:e:DollarSign::::::BrOJ" data-fgid-cyth59=":r7t:"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
	newProjectInfoItemBudget.append(newProjectInfoItemBudgetIcon)

	const newProjectInfoItemBudgetContent = document.createElement('div')
	newProjectInfoItemBudgetContent.classList.add('projpage__project__info__item_content')
	newProjectInfoItemBudget.append(newProjectInfoItemBudgetContent)

	const newProjectInfoItemBudgetTitle = document.createElement('span')
	newProjectInfoItemBudgetTitle.classList.add('projpage__project__info__item_title')
	newProjectInfoItemBudgetTitle.dataset.i18n = 'budget'
	newProjectInfoItemBudgetContent.append(newProjectInfoItemBudgetTitle)

	const newProjectInfoItemBudgetText = document.createElement('span')
	newProjectInfoItemBudgetText.classList.add('projpage__project__info__item_text')
	newProjectInfoItemBudgetText.textContent = '$' + proj.budget
	newProjectInfoItemBudgetContent.append(newProjectInfoItemBudgetText)

	const newProjectInfoItemEstIncome = document.createElement('li')
	newProjectInfoItemEstIncome.classList.add('projpage__project__info__item')
	newProjectInfoList.append(newProjectInfoItemEstIncome)

	const newProjectInfoItemEstIncomeIcon = document.createElement('div')
	newProjectInfoItemEstIncomeIcon.classList.add('projpage__project__info__item_icon')
	newProjectInfoItemEstIncomeIcon.classList.add('projpage__project__info__item_icon__income')
	newProjectInfoItemEstIncomeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign text-rose-700 shrink-0" data-fg-cyth59="1.37:58.35:/src/app/components/Projects.tsx:178:17:6849:59:e:DollarSign::::::BrOJ" data-fgid-cyth59=":r7t:"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
	newProjectInfoItemEstIncome.append(newProjectInfoItemEstIncomeIcon)

	const newProjectInfoItemEstIncomeContent = document.createElement('div')
	newProjectInfoItemEstIncomeContent.classList.add('projpage__project__info__item_content')
	newProjectInfoItemEstIncome.append(newProjectInfoItemEstIncomeContent)

	const newProjectInfoItemEstIncomeTitle = document.createElement('span')
	newProjectInfoItemEstIncomeTitle.classList.add('projpage__project__info__item_title')
	newProjectInfoItemEstIncomeTitle.dataset.i18n = 'estIncome'
	newProjectInfoItemEstIncomeContent.append(newProjectInfoItemEstIncomeTitle)

	const newProjectInfoItemEstIncomeText = document.createElement('span')
	newProjectInfoItemEstIncomeText.classList.add('projpage__project__info__item_text')
	const projProfitVal = getProjectProfit(proj.id)
	newProjectInfoItemEstIncomeText.textContent = '$' + projProfitVal
	if (projProfitVal < 0) {
		newProjectInfoItemEstIncomeText.classList.add('red-text')
	} else if (projProfitVal > 0) {
		newProjectInfoItemEstIncomeText.classList.add('green-text')
	}
	newProjectInfoItemEstIncomeContent.append(newProjectInfoItemEstIncomeText)

	const newProjectInfoItemCapacity = document.createElement('li')
	newProjectInfoItemCapacity.classList.add('projpage__project__info__item')
	newProjectInfoList.append(newProjectInfoItemCapacity)

	const newProjectInfoItemCapacityIcon = document.createElement('div')
	newProjectInfoItemCapacityIcon.classList.add('projpage__project__info__item_icon')
	newProjectInfoItemCapacityIcon.classList.add('projpage__project__info__item_icon__capacity')
	newProjectInfoItemCapacityIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users text-rose-700 shrink-0" data-fg-cyth49="1.37:58.35:/src/app/components/Projects.tsx:171:17:6427:54:e:Users::::::DV8M" data-fgid-cyth49=":r7o:"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
	newProjectInfoItemCapacity.append(newProjectInfoItemCapacityIcon)

	const newProjectInfoItemCapacityContent = document.createElement('div')
	newProjectInfoItemCapacityContent.classList.add('projpage__project__info__item_content')
	newProjectInfoItemCapacity.append(newProjectInfoItemCapacityContent)

	const newProjectInfoItemCapacityTitle = document.createElement('span')
	newProjectInfoItemCapacityTitle.classList.add('projpage__project__info__item_title')
	newProjectInfoItemCapacityTitle.dataset.i18n = 'capacity'
	newProjectInfoItemCapacityContent.append(newProjectInfoItemCapacityTitle)

	const newProjectInfoItemCapacityText = document.createElement('span')
	newProjectInfoItemCapacityText.classList.add('projpage__project__info__item_text')
	newProjectInfoItemCapacityText.textContent = `${getProjectCapacity(proj.id)}/${proj.capacity}`
	newProjectInfoItemCapacityContent.append(newProjectInfoItemCapacityText)

	const newProjectInfoItemProgress = document.createElement('li')
	newProjectInfoItemProgress.classList.add('projpage__project__info__item')
	newProjectInfoList.append(newProjectInfoItemProgress)

	const newProjectInfoItemProgressIcon = document.createElement('div')
	newProjectInfoItemProgressIcon.classList.add('projpage__project__info__item_icon')
	newProjectInfoItemProgressIcon.classList.add('projpage__project__info__item_icon__progress')
	newProjectInfoItemProgressIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock text-rose-700 shrink-0" data-fg-cyth73="1.37:58.35:/src/app/components/Projects.tsx:192:17:7587:54:e:Clock::::::EGEm" data-fgid-cyth73=":r87:"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
	newProjectInfoItemProgress.append(newProjectInfoItemProgressIcon)

	const newProjectInfoItemProgressContent = document.createElement('div')
	newProjectInfoItemProgressContent.classList.add('projpage__project__info__item_content')
	newProjectInfoItemProgress.append(newProjectInfoItemProgressContent)

	const newProjectInfoItemProgressTitle = document.createElement('span')
	newProjectInfoItemProgressTitle.classList.add('projpage__project__info__item_title')
	newProjectInfoItemProgressTitle.dataset.i18n = 'progress'
	newProjectInfoItemProgressContent.append(newProjectInfoItemProgressTitle)

	const newProjectInfoItemProgressText = document.createElement('span')
	newProjectInfoItemProgressText.classList.add('projpage__project__info__item_text')
	newProjectInfoItemProgressText.textContent = `${getProjectProgress(proj.id)}%`
	newProjectInfoItemProgressContent.append(newProjectInfoItemProgressText)

	return newProjectInfo
}

function createProjectBottom(proj) {
	const newProjectProgress = document.createElement('div')
	newProjectProgress.classList.add('projpage__project__progress')

	const newProjectProgressTexts = document.createElement('div')
	newProjectProgressTexts.classList.add('projpage__project__progress__texts')
	newProjectProgress.append(newProjectProgressTexts)

	const newProjectProgressTextsTitle = document.createElement('span')
	newProjectProgressTextsTitle.classList.add('projpage__project__progress__texts_title')
	newProjectProgressTextsTitle.dataset.i18n = 'progress'
	newProjectProgressTexts.append(newProjectProgressTextsTitle)

	const newProjectProgressTextsNumber = document.createElement('span')
	newProjectProgressTextsNumber.classList.add('projpage__project__progress__texts_percent')
	newProjectProgressTextsNumber.textContent = `${getProjectProgress(proj.id)}%`
	newProjectProgressTexts.append(newProjectProgressTextsNumber)

	const newProjectProgressLine = document.createElement('div')
	newProjectProgressLine.classList.add('projpage__project__progress__line')
	newProjectProgress.append(newProjectProgressLine)

	const newProjectProgressLineRed = document.createElement('div')
	newProjectProgressLineRed.classList.add('projpage__project__progress__line_red')
	newProjectProgressLineRed.style.width = `${getProjectProgress(proj.id)}%`
	newProjectProgressLine.append(newProjectProgressLineRed)

	return newProjectProgress
}

function createProjectsSummary(state) {
	const wrapper = document.createElement('div')
	wrapper.classList.add('projpage__summary', 'grey-block')

	const { totalProfit, benchCost } = calculateProjectsSummary(state)

	const text = document.createElement('div')
	text.classList.add('projpage__summary-text')

	const totalIncomeLabel = document.createElement('span')
	totalIncomeLabel.dataset.i18n = 'totalEstimatedIncome'

	const benchLabel = document.createElement('span')
	benchLabel.dataset.i18n = 'benchPayments'

	const value = document.createElement('span')
	value.textContent = ` $${totalProfit.toFixed(2)} `
	if (totalProfit < 0) {
		value.classList.add('red-text')
	} else if (totalProfit > 0) {
		value.classList.add('green-text')
	}

	const benchValue = document.createElement('span')
	benchValue.textContent = `$${benchCost.toFixed(2)}`

	text.append(
		totalIncomeLabel,
		document.createTextNode(':'),
		value,
		document.createTextNode(' ('),
		benchLabel,
		document.createTextNode(': '),
		benchValue,
		document.createTextNode(')')
	)

	wrapper.append(text)

	return wrapper
}

function calculateProjectsSummary(state) {
	const data = state.data[state.currentDate]

	const assignments = data.assignments
	const employees = data.employees

	let totalProfit = 0

	Object.values(assignments).forEach(as => {
		const employee = employees[as.empId]

		const capacity = Number(as.capacity)
		const fit = Number(as.fit)

		const effective = getEffectiveCapacity(capacity, fit)
		const revenue = getEmployeeRevenue(as)
		const cost = employee.salary * capacity

		totalProfit += (revenue - cost)
	})

	const assignedEmployees = new Set(
		Object.values(assignments).map(a => a.empId)
	)

	let benchCost = 0

	Object.values(employees).forEach(emp => {
		if (!assignedEmployees.has(emp.id)) {
			benchCost += emp.salary * 0.5
		}
	})

	return { totalProfit, benchCost }
}