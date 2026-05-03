import { getEmployeesByCurrentDate } from './data-employees.js'
import { initLanguage } from "../translate.js"
import { addCancelBtnListener, openSideBlock } from "./actions-employees.js"
import { getEmployeeCapacityCount, getEmployeeCost, getEmployeeProfit } from './calculation.js'

export function renderEmployees() {
	const employees = getEmployeesByCurrentDate()

	const container = document.querySelector('.pages__wrapper')
	container.innerHTML = ''

	container.append(createEmployeesHeader())
	addCancelBtnListener()

	const newWrapper = createEmployeesWrapper()
	container.append(newWrapper)

	Object.values(employees).forEach(emp => {
		newWrapper.append(createEmployeeItem(emp))
	})

	initLanguage()
}

function createEmployeesHeader() {
	const newElem = document.createElement('div')
	newElem.classList.add('main__topbox')

	const textContent = document.createElement('div')
	textContent.classList.add('main__topbox__texts')
	newElem.append(textContent)

	const textHeader = document.createElement('h2')
	textHeader.classList.add('main__topbox__h2')
	textHeader.dataset.i18n = 'employees'
	textContent.append(textHeader)

	const textDescription = document.createElement('hp')
	textDescription.classList.add('main__topbox__p')
	textDescription.dataset.i18n = 'employeesDesc'
	textContent.append(textDescription)

	const addBtn = document.createElement('button')
	addBtn.classList.add('main__topbox__btn')
	addBtn.dataset.i18n = 'employeesBtn'
	addBtn.addEventListener('click', openSideBlock)
	newElem.append(addBtn)

	return newElem
}

function createEmployeesWrapper() {
	const newWrapper = document.createElement('div')
	newWrapper.classList.add('emppage__wrapper')
	return newWrapper
}

function createEmployeeItem(emp) {
	const newEmployeeWrapper = document.createElement('div')
	newEmployeeWrapper.classList.add('emppage__employee__wrapper')
	newEmployeeWrapper.classList.add('grey-block')
	newEmployeeWrapper.classList.add('grey-block__hover-effect')

	newEmployeeWrapper.append(createEmployeeHeader(emp))
	newEmployeeWrapper.append(createEmployeeMiddleTop(emp))
	newEmployeeWrapper.append(createEmployeeMiddleSeparator())
	newEmployeeWrapper.append(createEmployeeMiddleBottom(emp))
	newEmployeeWrapper.append(createEmployeeMiddleSeparator())
	newEmployeeWrapper.append(createEmployeeFooter(emp))

	return newEmployeeWrapper
}

const positions = {
	junior: 'Junior',
	middle: 'Middle',
	senior: 'Senior',
	lead: 'Lead',
	architect: 'Architect',
	bo: 'BO',
}

function createEmployeeHeader(emp) {
	const newEmployeeHeader = document.createElement('div')
	newEmployeeHeader.classList.add('emppage__employee__header')

	const newEmployeeAvaWrapper = document.createElement('div')
	newEmployeeAvaWrapper.classList.add('emppage__employee__ava__wrapper')
	newEmployeeHeader.append(newEmployeeAvaWrapper)

	const newEmployeeNN = document.createElement('span')
	newEmployeeNN.classList.add('emppage__employee__ava_text')
	newEmployeeNN.textContent = `${emp.fname[0].toUpperCase()}${emp.lname[0].toUpperCase()}`
	newEmployeeAvaWrapper.append(newEmployeeNN)

	const newEmployeeTitles = document.createElement('div')
	newEmployeeTitles.classList.add('emppage__employee__titles')
	newEmployeeHeader.append(newEmployeeTitles)

	const newEmployeeName = document.createElement('div')
	newEmployeeName.classList.add('emppage__employee__name')
	newEmployeeName.textContent = `${emp.fname} ${emp.lname}`
	newEmployeeTitles.append(newEmployeeName)

	const newEmployeePosition = document.createElement('div')
	newEmployeePosition.classList.add('emppage__employee__position')
	newEmployeePosition.textContent = positions[emp.position]
	newEmployeeTitles.append(newEmployeePosition)

	return newEmployeeHeader
}

function calculateAge(dateString) {
	const [day, month, year] = dateString.split('.').map(Number)
	const birthDate = new Date(year, month - 1, day)
	const today = new Date()

	let age = today.getFullYear() - birthDate.getFullYear()
	const monthDiff = today.getMonth() - birthDate.getMonth()

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
		age--
	}

	return age
}

function createEmployeeMiddleTop(emp) {
	const newEmployeeMiddleTop = document.createElement('div')
	newEmployeeMiddleTop.classList.add('emppage__employee__middletop')

	const newEmployeeEmail = document.createElement('div')
	newEmployeeEmail.classList.add('emppage__employee__email')
	newEmployeeEmail.classList.add('emppage__employee__texticon_item')
	newEmployeeMiddleTop.append(newEmployeeEmail)

	const newEmployeeEmailIcon = document.createElement('div')
	newEmployeeEmailIcon.classList.add('emppage__employee__email__icon')
	newEmployeeEmailIcon.classList.add('emppage__employee__icon')
	newEmployeeEmailIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail shrink-0" data-fg-ddts45="1.36:4.3879:/src/app/components/Employees.tsx:128:19:6256:39:e:Mail::::::D4VR" data-fgid-ddts45=":rj9:"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>'
	newEmployeeEmail.append(newEmployeeEmailIcon)

	const newEmployeeEmailText = document.createElement('div')
	newEmployeeEmailText.classList.add('emppage__employee__email__text')
	newEmployeeEmailText.classList.add('emppage__employee__text')
	newEmployeeEmailText.textContent = emp.email
	newEmployeeEmail.append(newEmployeeEmailText)

	const newEmployeeDOP = document.createElement('div')
	newEmployeeDOP.classList.add('emppage__employee__dop')
	newEmployeeDOP.classList.add('emppage__employee__texticon_item')
	newEmployeeMiddleTop.append(newEmployeeDOP)

	const newEmployeeDOPIcon = document.createElement('div')
	newEmployeeDOPIcon.classList.add('emppage__employee__dop__icon')
	newEmployeeDOPIcon.classList.add('emppage__employee__icon')
	newEmployeeDOPIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar shrink-0" data-fg-ddts49="1.36:4.3879:/src/app/components/Employees.tsx:132:19:6478:43:e:Calendar::::::Bbz4" data-fgid-ddts49=":rjc:"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>'
	newEmployeeDOP.append(newEmployeeDOPIcon)

	const newEmployeeDOPText = document.createElement('div')
	newEmployeeDOPText.classList.add('emppage__employee__dob__text')
	newEmployeeDOPText.classList.add('emppage__employee__text')
	newEmployeeDOPText.textContent = `${emp.dob} (${calculateAge(emp.dob)})`
	newEmployeeDOP.append(newEmployeeDOPText)

	return newEmployeeMiddleTop
}

function createEmployeeMiddleSeparator() {
	const separator = document.createElement('div')
	separator.classList.add('emppage__employee_separator')
	return separator
}

function createEmployeeMiddleBottom(emp) {
	const newEmpMiddleBottom = document.createElement('div')
	newEmpMiddleBottom.classList.add('emppage__employee__middlebottom')

	const newEmpSalaryWrapper = document.createElement('div')
	newEmpSalaryWrapper.classList.add('emppage__employee__middlebottom__item')
	newEmpMiddleBottom.append(newEmpSalaryWrapper)

	const newEmpSalaryText = document.createElement('span')
	newEmpSalaryText.classList.add('emppage__employee__middlebottom__item_text')
	newEmpSalaryText.dataset.i18n = 'addEmpSalaryLabel'
	newEmpSalaryWrapper.append(newEmpSalaryText)

	const newEmpSalaryValue = document.createElement('span')
	newEmpSalaryValue.classList.add('emppage__employee__middlebottom__item_num')
	newEmpSalaryValue.textContent = '$' + emp.salary
	newEmpSalaryWrapper.append(newEmpSalaryValue)

	const newEmpAssignmentsWrapper = document.createElement('div')
	newEmpAssignmentsWrapper.classList.add('emppage__employee__middlebottom__item')
	newEmpMiddleBottom.append(newEmpAssignmentsWrapper)

	const newEmpAssignmentsText = document.createElement('span')
	newEmpAssignmentsText.classList.add('emppage__employee__middlebottom__item_text')
	newEmpAssignmentsText.dataset.i18n = 'assignments'
	newEmpAssignmentsWrapper.append(newEmpAssignmentsText)

	const newEmpAssignmentsValue = document.createElement('span')
	newEmpAssignmentsValue.classList.add('emppage__employee__middlebottom__item_num')
	newEmpAssignmentsValue.textContent = getEmployeeCapacityCount(emp.id)
	newEmpAssignmentsWrapper.append(newEmpAssignmentsValue)

	const newEmpEstPaymentWrapper = document.createElement('div')
	newEmpEstPaymentWrapper.classList.add('emppage__employee__middlebottom__item')
	newEmpMiddleBottom.append(newEmpEstPaymentWrapper)

	const newEmpEstPaymentText = document.createElement('span')
	newEmpEstPaymentText.classList.add('emppage__employee__middlebottom__item_text')
	newEmpEstPaymentText.dataset.i18n = 'estPayment'
	newEmpEstPaymentWrapper.append(newEmpEstPaymentText)

	const newEmpEstPaymentValue = document.createElement('span')
	newEmpEstPaymentValue.classList.add('emppage__employee__middlebottom__item_num')
	newEmpEstPaymentValue.textContent = '$' + getEmployeeCost(emp.id)
	newEmpEstPaymentWrapper.append(newEmpEstPaymentValue)

	const newEmpProjEncomeWrapper = document.createElement('div')
	newEmpProjEncomeWrapper.classList.add('emppage__employee__middlebottom__item')
	newEmpMiddleBottom.append(newEmpProjEncomeWrapper)

	const newEmpProjEncomeText = document.createElement('span')
	newEmpProjEncomeText.classList.add('emppage__employee__middlebottom__item_text')
	newEmpProjEncomeText.dataset.i18n = 'projEncome'
	newEmpProjEncomeWrapper.append(newEmpProjEncomeText)

	const newEmpProjEncomeValue = document.createElement('span')
	newEmpProjEncomeValue.classList.add('emppage__employee__middlebottom__item_num')
	const empProfitVal = getEmployeeProfit(emp.id)
	newEmpProjEncomeValue.textContent = '$' + empProfitVal
	if (empProfitVal < 0) {
		newEmpProjEncomeValue.classList.add('red-text')
	} else if (empProfitVal > 0) {
		newEmpProjEncomeValue.classList.add('green-text')
	}
	newEmpProjEncomeWrapper.append(newEmpProjEncomeValue)

	return newEmpMiddleBottom
}

function createEmployeeFooter(emp) {
	const newEmployeeFooter = document.createElement('div')
	newEmployeeFooter.classList.add('emppage__employee__footer')

	const newEmployeeBtnAssignments = document.createElement('div')
	newEmployeeBtnAssignments.classList.add('emppage__employee__footer_assignments')
	newEmployeeBtnAssignments.dataset.i18n = 'assignments'
	newEmployeeFooter.append(newEmployeeBtnAssignments)

	const newEmployeeBtnDelete = document.createElement('div')
	newEmployeeBtnDelete.classList.add('emppage__employee__footer_delete')
	newEmployeeBtnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 lucide-trash-2" data-fg-cyth44="1.37:58.35:/src/app/components/Projects.tsx:161:19:6021:20:e:Trash2::::::c98" data-fgid-cyth44=":r7j:"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>'
	newEmployeeFooter.append(newEmployeeBtnDelete)

	return newEmployeeFooter
}