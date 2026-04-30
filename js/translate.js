const translations = {
	ru: {
		employees: "Сотрудники",
		projects: "Проекты",
		assignments: "Назначения",
		langtext: "Язык:",
		lang: "РУС",
		datetext: "Выбранный период:",
		datechoose: "Обновить",
		month0: "Январь",
		month1: "Февраль",
		month2: "Март",
		month3: "Апрель",
		month4: "Май",
		month5: "Июнь",
		month6: "Июль",
		month7: "Август",
		month8: "Сентябрь",
		month9: "Октябрь",
		month10: "Ноябрь",
		month11: "Декабрь",
		projectsDesc: 'Отслеживание и управление проектами',
		projectsBtn: 'Новый проект',
		employeesDesc: 'Управление командой',
		employeesBtn: 'Добавить',
		assignmentsDesc: 'Управление назначениями сотрудников',
		assignmentsBtn: 'Создать',
		addProjectTitle: 'Новый проект',
		addProjNameLabel: 'Название:',
		addProjCompanyLabel: 'Заказчик:',
		addProjBugetLabel: 'Бюджет:',
		addProjCapacityLabel: 'Ресурсный объем:',
		addSubmitBtn: 'Добавить',
		addCancelBtn: 'Отмена',
		errProjName: 'минимум 3 символа',
		errCompName: 'минимум 2 символа',
		errBudget: 'число, не меньше 1',
		errCapacity: 'число, не меньше 1',
		budget: 'Бюджет',
		estIncome: 'Расч. доход',
		capacity: 'Ресурсы',
		progress: 'Прогресс',
		addEmployeeTitle: 'Добавить сотрудника',
		addEmpFNameLabel: 'Имя',
		addEmpLNameLabel: 'Фамилия',
		addEmpSalaryLabel: 'Зарплата',
		addEmpDOBLabel: 'Дата рождения',
		addEmpEmailLabel: 'Email',
		addEmpPositionLabel: 'Уровень',
	},
	en: {
		employees: "Employees",
		projects: "Projects",
		assignments: "Assignments",
		langtext: "Language:",
		lang: "EN",
		datetext: "Selected period:",
		datechoose: "Update",
		month0: "January",
		month1: "February",
		month2: "March",
		month3: "April",
		month4: "May",
		month5: "June",
		month6: "July",
		month7: "August",
		month8: "September",
		month9: "October",
		month10: "November",
		month11: "December",
		projectsDesc: 'Track and manage all projects',
		projectsBtn: 'New Project',
		employeesDesc: 'Manage your team members',
		employeesBtn: 'Add Employee',
		assignmentsDesc: 'Manage employee-project assignments',
		assignmentsBtn: 'Create Assignment',
		addProjectTitle: 'Add New Project',
		addProjNameLabel: 'Project Name:',
		addProjCompanyLabel: 'Company Name:',
		addProjBugetLabel: 'Budget:',
		addProjCapacityLabel: 'Employee Capacity:',
		addSubmitBtn: 'Add',
		addCancelBtn: 'Cancel',
		errProjName: 'at least 3 characters',
		errCompName: 'at least 2 characters',
		errBudget: 'number, at least 1',
		errCapacity: 'number, at least 1',
		budget: 'Budget',
		estIncome: 'Est. Income',
		capacity: 'Capacity',
		progress: 'Progress',
		addEmployeeTitle: 'Add New Employee',
		addEmpFNameLabel: 'First Name',
		addEmpLNameLabel: 'Last Name',
		addEmpSalaryLabel: 'Salary',
		addEmpDOBLabel: 'Date Of Birth',
		addEmpEmailLabel: 'Email',
		addEmpPositionLabel: 'Position',
	}
}

export function translatePage(lang) {
	document.querySelectorAll("[data-i18n]").forEach(el => {
		const key = el.dataset.i18n
		el.textContent = translations[lang][key] || key
	})

	const select = document.querySelector('.main__header__date_chooser__month')
	document.querySelector('.curr_date__month').textContent = select.options[select.selectedIndex].text
}

export function changeLanguage() {	
	const langIndex = Object.keys(translations).indexOf(localStorage.getItem("lang") || 'en')
	let nextLangIndex = langIndex === Object.keys(translations).length - 1 ? 0 : langIndex + 1

	localStorage.setItem("lang", Object.keys(translations)[nextLangIndex])
	initLanguage()
}

export function initLanguage() {
	if (!localStorage.getItem("lang")) localStorage.setItem("lang", "en")
	const lang = localStorage.getItem("lang")
	translatePage(lang)
}