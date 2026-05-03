export function isSure() {
	const currLang = localStorage.getItem('lang')
	const meggaseText = currLang === 'en' ? 'Are you sure?' : 'Вы уверены?'
	return confirm(meggaseText)
}