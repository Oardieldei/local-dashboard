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