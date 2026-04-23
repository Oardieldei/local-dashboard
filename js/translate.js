const translations = {
	ru: {
		employees: "Сотрудники",
		projects: "Проекты",
		assignments: "Назначения",
		langtext: "Язык:",
		lang: "РУС",
		datetext: "Выбранный период:",
		datechoose: "Обновить"
	},
	en: {
		employees: "Employees",
		projects: "Projects",
		assignments: "Assignments",
		langtext: "Language:",
		lang: "EN",
		datetext: "Selected period:",
		datechoose: "Update"
	}
}

export function translatePage(lang) {
	document.querySelectorAll("[data-i18n]").forEach(el => {
		const key = el.dataset.i18n
		el.textContent = translations[lang][key] || key
	})
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