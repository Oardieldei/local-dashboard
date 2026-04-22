import { initLanguage, changeLanguage } from "./translate.js"

initLanguage()

document.querySelector('.lang-changer__wrapper').addEventListener('click', changeLanguage)