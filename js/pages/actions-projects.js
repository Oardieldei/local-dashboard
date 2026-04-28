const addProjectWrapper = document.querySelector('.add_project')
const sideLi = addProjectWrapper.querySelectorAll('.add_project__item')
const submitBtn = addProjectWrapper.querySelector('.add_project__btn_submit')

export function openSideBlock() {
	addProjectWrapper.classList.remove('side_block-hide')
}

export function closeSideBlock() {
	addProjectWrapper.classList.add('side_block-hide')
	addProjectWrapper.querySelectorAll('.side_block__item').forEach(elem => {
		elem.classList.remove('error-input')
		elem.children[1].value = ''
	})
}

export function addCancelBtnListener() {
	addProjectWrapper.querySelector('.add_project__btn_cancel').addEventListener('click', closeSideBlock)
}

export function addProject(state) {
	const newProjId = `proj_${++state.data[state.currentDate].meta.projectCounter}`

	state.data[state.currentDate].projects[newProjId] = {
		id: newProjId,
		name: sideLi[0].children[1].value,
		customer: sideLi[1].children[1].value,
		budget: sideLi[2].children[1].value,
		capacity: sideLi[3].children[1].value,
	}
}