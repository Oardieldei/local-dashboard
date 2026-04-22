const translations = {
	ru: {
		employees: "Сотрудники",
		projects: "Проекты",
		assignments: "Назначения",
		langtext: "Язык:",
		lang: "РУС",
	},
	en: {
		employees: "Employees",
		projects: "Projects",
		assignments: "Assignments",
		langtext: "Language:",
		lang: "EN",
	}
}

export function translatePage(lang) {
	document.querySelectorAll("[data-i18n]").forEach(el => {
		const key = el.dataset.i18n
		el.textContent = translations[lang][key] || key
	})
}

export function changeLanguage() {
	if (localStorage.getItem("lang") === 'en') {
		localStorage.setItem("lang", 'ru')
	} else {
		localStorage.setItem("lang", 'en')
	}
	
	initLanguage()
}

export function initLanguage() {
	if (!localStorage.getItem("lang")) localStorage.setItem("lang", "en")
	const lang = localStorage.getItem("lang")
	translatePage(lang)
}