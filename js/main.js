import { initLanguage, changeLanguage } from "./translate.js"
import { changeSidebarState } from "./sidebar-hide.js"

initLanguage()
document.querySelector('.lang-changer__wrapper').addEventListener('click', changeLanguage)

const sidebarCloseBtn = document.querySelector('.main__header__sidebar_arrow')
const sidebarItem = document.querySelector('.sidebar')
changeSidebarState(sidebarCloseBtn, sidebarItem)