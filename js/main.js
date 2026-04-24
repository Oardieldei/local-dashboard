import { initLanguage, changeLanguage } from "./translate.js"
import { changeSidebarState } from "./sidebar-hide.js"
import { addDateBtnListener } from './date-controller.js'
import { initApp } from './init.js'

initLanguage()
document.querySelector('.lang-changer__wrapper').addEventListener('click', changeLanguage)

const sidebarCloseBtn = document.querySelector('.main__header__sidebar_arrow')
const sidebarItem = document.querySelector('.sidebar')
changeSidebarState(sidebarCloseBtn, sidebarItem)

addDateBtnListener()

initApp()